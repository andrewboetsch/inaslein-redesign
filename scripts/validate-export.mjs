import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outRoot = path.join(root, "out");
const errors = [];
const configuredBasePath = process.env.GITHUB_PAGES === "true" ? "/inaslein-redesign" : "";

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

const files = await walk(outRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const fileSet = new Set(files.map((file) => path.relative(outRoot, file)));

function resolvesPublicUrl(url) {
  let clean = url.split(/[?#]/)[0];
  if (configuredBasePath && clean.startsWith(`${configuredBasePath}/`)) {
    clean = clean.slice(configuredBasePath.length);
  }
  clean = clean.replace(/^\//, "").replace(/\/$/, "");
  if (!clean) return true;
  if (fileSet.has(clean)) return true;
  if (fileSet.has(`${clean}/index.html`)) return true;
  if (fileSet.has(`${clean}.html`)) return true;
  return false;
}

for (const file of htmlFiles) {
  const html = await fs.readFile(file, "utf8");
  const relativeFile = path.relative(outRoot, file);
  if (/\b(?:TODO|TBD|PLACEHOLDER)\b/.test(html)) {
    errors.push(`${relativeFile} contains an unresolved placeholder`);
  }
  if (relativeFile !== "404.html") {
    if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${relativeFile} is missing a title`);
    if (!/<link rel="canonical" href="https:\/\/inaslein\.com\//.test(html)) {
      errors.push(`${relativeFile} is missing a production canonical URL`);
    }
  }
  const urls = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const url of urls) {
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(url)) continue;
    if (url.startsWith("/_next/") && resolvesPublicUrl(url)) continue;
    if (!resolvesPublicUrl(url)) {
      errors.push(`${relativeFile} references missing ${url}`);
    }
  }
}

for (const required of ["_headers", "_redirects", "robots.txt", "sitemap.xml"]) {
  if (!fileSet.has(required)) errors.push(`Export is missing ${required}`);
}

const redirectFile = await fs.readFile(path.join(outRoot, "_redirects"), "utf8");
const requiredRedirects = new Map([
  ["/portrait-gallery", "/work/portraits"],
  ["/family-portraits", "/work/family-histories"],
  ["/animals-we-love", "/work/equestrian-animals"],
  ["/portraits-of-love", "/work/equestrian-animals"],
  ["/in-progress", "/work/studio"],
]);
for (const [source, destination] of requiredRedirects) {
  if (!redirectFile.includes(`${source} ${destination} 301`)) {
    errors.push(`Export is missing redirect ${source} -> ${destination}`);
  }
}

const homepageHtml = await fs.readFile(path.join(outRoot, "index.html"), "utf8");
const homepageH1 = homepageHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
  .replace(/<[^>]+>/g, "")
  .replace(/\s+/g, " ")
  .trim();
if (homepageH1 !== "Ina Slein Fine Artist") {
  errors.push(`Homepage H1 must be "Ina Slein Fine Artist"; found ${JSON.stringify(homepageH1)}`);
}

const jsonLdPayloads = [...homepageHtml.matchAll(
  /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
)].map((match) => {
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    errors.push(`Homepage contains invalid JSON-LD: ${error.message}`);
    return null;
  }
}).filter(Boolean);

const entityGraph = jsonLdPayloads.find((payload) => Array.isArray(payload["@graph"]));
if (!entityGraph) {
  errors.push("Homepage is missing the canonical business entity graph");
} else {
  const graph = entityGraph["@graph"];
  const nodeById = new Map(graph.filter((node) => node["@id"]).map((node) => [node["@id"], node]));
  const businessId = "https://inaslein.com/#business";
  const personId = "https://inaslein.com/#ina-slein";
  const websiteId = "https://inaslein.com/#website";
  const placeId = "https://inaslein.com/#wellington-fl";
  const business = nodeById.get(businessId);
  const person = nodeById.get(personId);
  const website = nodeById.get(websiteId);
  const place = nodeById.get(placeId);
  const expectedSameAs = [
    "https://www.google.com/maps?cid=4017439670596771296",
    "https://www.instagram.com/inaslein/",
    "https://www.facebook.com/ina.sleinrubino/",
  ];

  if (business?.["@type"] !== "ProfessionalService") {
    errors.push("Canonical business node must use ProfessionalService");
  }
  if (business?.name !== "Ina Slein Fine Artist") {
    errors.push("Canonical business node has the wrong name");
  }
  if (business?.url !== "https://inaslein.com" || business?.telephone !== "+15616328055") {
    errors.push("Canonical business node does not match the GBP website and telephone");
  }
  if (business?.location?.["@id"] !== placeId || place?.name !== "Wellington") {
    errors.push("Canonical business node must resolve to Wellington, Florida");
  }
  if (JSON.stringify(business?.sameAs) !== JSON.stringify(expectedSameAs)) {
    errors.push("Canonical business sameAs links do not match GBP, Instagram, and Facebook");
  }
  if (person?.worksFor?.["@id"] !== businessId || business?.employee?.["@id"] !== personId) {
    errors.push("Person and business nodes are not linked through their stable @id values");
  }
  if (website?.publisher?.["@id"] !== businessId) {
    errors.push("WebSite publisher does not resolve to the canonical business @id");
  }

  const serviceNodes = graph.filter((node) => node["@type"] === "Service");
  if (serviceNodes.length !== 3 || serviceNodes.some((service) => service.provider?.["@id"] !== businessId)) {
    errors.push("Service nodes must resolve to the canonical business @id");
  }

  const pageNodes = graph.filter((node) => [
    "WebPage", "AboutPage", "ProfilePage", "CollectionPage", "ContactPage",
  ].includes(node["@type"]));
  if (pageNodes.length !== 5 || pageNodes.some((page) => page.isPartOf?.["@id"] !== websiteId)) {
    errors.push("Relevant page nodes must resolve to the canonical WebSite @id");
  }

  const schemaKeys = new Set();
  JSON.stringify(entityGraph, (key, value) => {
    if (key) schemaKeys.add(key);
    return value;
  });
  for (const forbiddenKey of ["address", "streetAddress", "postalCode", "geo"]) {
    if (schemaKeys.has(forbiddenKey)) {
      errors.push(`Canonical entity graph must not publish or infer ${forbiddenKey}`);
    }
  }

  for (const id of nodeById.keys()) {
    if (!id.startsWith("https://inaslein.com/")) {
      errors.push(`Schema node uses a non-canonical @id: ${id}`);
    }
  }
}

if (errors.length) {
  console.error(errors.slice(0, 100).map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} exported HTML files and their local asset references.`);
