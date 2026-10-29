import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));
const min = [0, 35, 5];

function patched(version) {
  const parsed = /^(\d+)\.(\d+)\.(\d+)/.exec(version ?? "");
  if (!parsed) return false;
  const parts = parsed.slice(1).map(Number);
  for (let i = 0; i < 3; i++) {
    if (parts[i] > min[i]) return true;
    if (parts[i] < min[i]) return false;
  }
  return true;
}

const sharpPackages = Object.entries(lock.packages ?? {}).filter(([path]) =>
  /(?:^|\/)sharp$/.test(path) ||
  /(?:^|\/)@img\/sharp-(?!libvips-)[^/]+$/.test(path)
);
const outdated = sharpPackages.filter(([, pkg]) => !patched(pkg.version));

if (!sharpPackages.some(([path]) => path === "node_modules/sharp") || outdated.length) {
  console.error("Unpatched or missing Sharp lockfile entries:", outdated.map(([path, pkg]) => `${path}@${pkg.version}`));
  process.exit(1);
}

const installed = require("sharp").versions.sharp;
if (!patched(installed)) {
  console.error(`Installed sharp ${installed} is older than 0.35.5`);
  process.exit(1);
}

console.log(`Verified ${sharpPackages.length} locked Sharp packages and installed sharp ${installed} are patched`);
