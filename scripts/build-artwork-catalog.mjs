import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import process from "node:process";
import { parse } from "csv-parse/sync";
import sharp from "sharp";

const projectRoot = process.cwd();
const catalogPath = path.join(projectRoot, "content", "artworks.csv");
const sourceRoot = path.resolve(
  projectRoot,
  process.env.ARTWORK_SOURCE_ROOT ?? "private-intake/masters/artwork",
);
const outputRoot = path.join(projectRoot, "public", "artwork", "generated");
const generatedCatalogPath = path.join(
  projectRoot,
  "content",
  "artworks.generated.json",
);

const publicCategories = new Set([
  "portraits",
  "family-histories",
  "equestrian-animals",
  "studies-drawings",
  "studio",
  "site",
]);
const variants = [
  ["thumb", 640],
  ["display", 1600],
  ["full", 2400],
];

function required(row, field) {
  const value = row[field]?.trim();
  if (!value) throw new Error(`${row.slug || "Unknown row"}: missing ${field}`);
  return value;
}

function optional(row, field) {
  const value = row[field]?.trim();
  return value || undefined;
}

function sourcePathFor(row) {
  const relativeSource = required(row, "source");
  const resolved = path.resolve(sourceRoot, relativeSource);
  if (!resolved.startsWith(`${sourceRoot}${path.sep}`)) {
    throw new Error(`${row.slug}: source path escapes the private source root`);
  }
  return resolved;
}

async function imageDimensions(sourcePath) {
  const metadata = await sharp(sourcePath).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`${sourcePath}: unable to determine image dimensions`);
  }
  const swapsAxes = [5, 6, 7, 8].includes(metadata.orientation ?? 1);
  return {
    width: swapsAxes ? metadata.height : metadata.width,
    height: swapsAxes ? metadata.width : metadata.height,
  };
}

async function writeVariants(sourcePath, slug) {
  const imagePaths = {};
  for (const [label, maxWidth] of variants) {
    const base = sharp(sourcePath)
      .rotate()
      .resize({
        width: maxWidth,
        height: maxWidth,
        fit: "inside",
        withoutEnlargement: true,
      });
    const avifName = `${slug}-${label}.avif`;
    const webpName = `${slug}-${label}.webp`;
    await Promise.all([
      base.clone().avif({ quality: label === "thumb" ? 58 : 68 }).toFile(path.join(outputRoot, avifName)),
      base.clone().webp({ quality: label === "thumb" ? 76 : 84 }).toFile(path.join(outputRoot, webpName)),
    ]);
    imagePaths[label] = {
      avif: `/artwork/generated/${avifName}`,
      webp: `/artwork/generated/${webpName}`,
    };
  }
  return imagePaths;
}

const rawCsv = await fs.readFile(catalogPath, "utf8");
const rows = parse(rawCsv, { columns: true, skip_empty_lines: true, trim: true });
const seenSlugs = new Set();
const seenSources = new Map();
const seenContentHashes = new Map();
const prepared = [];

for (const row of rows) {
  const slug = required(row, "slug");
  if (seenSlugs.has(slug)) throw new Error(`Duplicate artwork slug: ${slug}`);
  seenSlugs.add(slug);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${slug}: slug must be lowercase kebab-case`);
  }
  const category = required(row, "category");
  if (!publicCategories.has(category)) {
    throw new Error(`${slug}: unsupported category ${category}`);
  }
  const sourcePath = sourcePathFor(row);
  await fs.access(sourcePath);
  const sourceKey = path.normalize(sourcePath).toLowerCase();
  if (seenSources.has(sourceKey)) {
    throw new Error(`${slug}: source file is already used by ${seenSources.get(sourceKey)}`);
  }
  seenSources.set(sourceKey, slug);
  const contentHash = createHash("sha256").update(await fs.readFile(sourcePath)).digest("hex");
  if (seenContentHashes.has(contentHash)) {
    throw new Error(`${slug}: source image duplicates ${seenContentHashes.get(contentHash)}`);
  }
  seenContentHashes.set(contentHash, slug);
  if (row.publish !== "yes") continue;
  if (row.approval !== "approved") {
    throw new Error(`${slug}: published records require approval=approved`);
  }
  const alt = required(row, "alt");
  if (/\b(?:todo|tbd|placeholder)\b/i.test(alt)) {
    throw new Error(`${slug}: alt text contains an unresolved placeholder`);
  }
  prepared.push({ row, slug, category, alt, sourcePath });
}

await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(outputRoot, { recursive: true });

const generated = [];
for (const item of prepared) {
  const { row, slug, category, alt, sourcePath } = item;
  const { width, height } = await imageDimensions(sourcePath);
  const images = await writeVariants(sourcePath, slug);
  const record = {
    slug,
    category,
    title: optional(row, "title"),
    alt,
    year: optional(row, "year"),
    medium: optional(row, "medium"),
    dimensions: optional(row, "dimensions"),
    caption: optional(row, "caption"),
    story: optional(row, "story")?.split("||").map((part) => part.trim()).filter(Boolean),
    featured: row.featured === "yes",
    order: Number.parseInt(row.order || "0", 10),
    width,
    height,
    orientation: width > height ? "landscape" : width < height ? "portrait" : "square",
    images,
  };
  generated.push(Object.fromEntries(Object.entries(record).filter(([, value]) => value !== undefined)));
}

generated.sort((a, b) => a.category.localeCompare(b.category) || a.order - b.order);
await fs.writeFile(generatedCatalogPath, `${JSON.stringify(generated, null, 2)}\n`, "utf8");
console.log(`Generated ${generated.length} approved artwork records and ${generated.length * variants.length * 2} image derivatives.`);
