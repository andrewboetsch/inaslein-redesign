// Rendered touch-target gate for the mobile navigation drawer.
//
// Serves the static export, opens the drawer at 390px with a coarse pointer,
// and measures every interactive element inside it. Two rules are enforced:
//
//   1. WCAG 2.2 AA (2.5.8 Target Size, Minimum): each target is at least
//      24x24 CSS px, OR its centre is at least 24px from every other target's
//      centre. The spacing clause is why the 18px-tall primary nav links are
//      conformant while the old 14px contact links, set 7px apart, were not.
//   2. Project rule: the drawer contact links are at least 44px high. These
//      regressed to 14px once and are the reason this gate exists.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const MIN_TARGET = 24;
const PREFERRED_TARGET = 44;
const outRoot = path.join(process.cwd(), "out");
const errors = [];

const CONTENT_TYPES = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".txt": "text/plain", ".xml": "application/xml", ".json": "application/json",
  ".webp": "image/webp", ".avif": "image/avif", ".ico": "image/x-icon",
  ".woff2": "font/woff2", ".woff": "font/woff",
};

if (!fs.existsSync(outRoot)) {
  console.error("- No out/ directory. Run `npm run build` before this check.");
  process.exit(1);
}

const server = http.createServer((request, response) => {
  const requested = decodeURIComponent(request.url.split("?")[0]);
  let file = path.join(outRoot, requested);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  else if (!fs.existsSync(file) && fs.existsSync(`${file}.html`)) file = `${file}.html`;
  if (!fs.existsSync(file)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": CONTENT_TYPES[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(0, resolve));
const { port } = server.address();

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  await page.goto(`http://localhost:${port}/welcome/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Menu" }).click();
  await page.waitForSelector("#mobile-navigation");

  const targets = await page.$$eval(
    "#mobile-navigation a[href], #mobile-navigation button",
    (elements) => elements.map((element) => {
      const box = element.getBoundingClientRect();
      return {
        label: (element.textContent ?? "").trim().slice(0, 40) || element.tagName.toLowerCase(),
        isContact: Boolean(element.closest(".drawer-contact")),
        width: box.width,
        height: box.height,
        centreX: box.x + box.width / 2,
        centreY: box.y + box.height / 2,
      };
    }),
  );

  if (!targets.length) errors.push("Drawer opened but exposed no interactive targets to measure");

  for (const [index, target] of targets.entries()) {
    const undersized = target.width < MIN_TARGET || target.height < MIN_TARGET;
    if (undersized) {
      const crowded = targets.some((other, otherIndex) => otherIndex !== index
        && Math.hypot(other.centreX - target.centreX, other.centreY - target.centreY) < MIN_TARGET);
      if (crowded) {
        errors.push(
          `"${target.label}" is ${target.width.toFixed(1)}x${target.height.toFixed(1)}px and sits `
          + `closer than ${MIN_TARGET}px to an adjacent target (WCAG 2.5.8)`,
        );
      }
    }
    if (target.isContact && target.height < PREFERRED_TARGET) {
      errors.push(
        `Drawer contact link "${target.label}" is ${target.height.toFixed(1)}px high; `
        + `at least ${PREFERRED_TARGET}px is required`,
      );
    }
  }

  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`Validated ${targets.length} mobile drawer touch targets at 390px.`);
  }
} finally {
  await browser.close();
  server.close();
}
