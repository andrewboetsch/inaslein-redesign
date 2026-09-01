import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { parse } from "csv-parse/sync";
import sharp from "sharp";

const root = process.cwd();
const csvPath = path.join(root, "content", "artworks.csv");
const generatedPath = path.join(root, "content", "artworks.generated.json");
const rawRows = parse(await fs.readFile(csvPath, "utf8"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});
const generated = JSON.parse(await fs.readFile(generatedPath, "utf8"));
const publishedRows = rawRows.filter((row) => row.publish === "yes");
const errors = [];

function duplicates(values) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

const duplicateRows = duplicates(rawRows.map((row) => row.slug));
if (duplicateRows.length) errors.push(`Duplicate CSV slugs: ${duplicateRows.join(", ")}`);
const duplicateGenerated = duplicates(generated.map((row) => row.slug));
if (duplicateGenerated.length) errors.push(`Duplicate generated slugs: ${duplicateGenerated.join(", ")}`);
if (publishedRows.length !== generated.length) {
  errors.push(`Published CSV count (${publishedRows.length}) does not match generated count (${generated.length})`);
}

const generatedSlugs = new Set(generated.map((row) => row.slug));
for (const row of publishedRows) {
  if (row.approval !== "approved") errors.push(`${row.slug}: published without approval`);
  if (!row.alt?.trim()) errors.push(`${row.slug}: missing alt text`);
  if (!generatedSlugs.has(row.slug)) errors.push(`${row.slug}: missing from generated catalog`);
}

for (const record of generated) {
  if (!record.width || !record.height || record.width <= 0 || record.height <= 0) {
    errors.push(`${record.slug}: invalid dimensions`);
  }
  if (/\b(?:todo|tbd|placeholder|needs confirmation)\b/i.test(JSON.stringify(record))) {
    errors.push(`${record.slug}: unresolved public placeholder`);
  }
  for (const variant of ["thumb", "display", "full"]) {
    for (const format of ["avif", "webp"]) {
      const publicPath = record.images?.[variant]?.[format];
      if (!publicPath) {
        errors.push(`${record.slug}: missing ${variant}.${format} path`);
        continue;
      }
      const filePath = path.join(root, "public", publicPath.replace(/^\//, ""));
      try {
        const metadata = await sharp(filePath).metadata();
        if (metadata.exif || metadata.xmp || metadata.iptc || metadata.gps) {
          errors.push(`${record.slug}: ${variant}.${format} retains private metadata`);
        }
      } catch (error) {
        errors.push(`${record.slug}: unreadable ${variant}.${format} (${error.message})`);
      }
    }
  }
}

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

const publicArtworkRoot = path.join(root, "public", "artwork");
for (const filePath of await walk(publicArtworkRoot)) {
  if (/\.(?:jpe?g|png)$/i.test(filePath)) {
    errors.push(`Public original image remains: ${path.relative(root, filePath)}`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${generated.length} published records, ${generated.length * 6} derivatives, approval state, and metadata privacy.`);
