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
  ["/welcome", "/about"],
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

if (errors.length) {
  console.error(errors.slice(0, 100).map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} exported HTML files and their local asset references.`);
