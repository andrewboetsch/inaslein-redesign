# Ina Slein — Static Artist Site

A static, repository-managed artist site for Ina Slein. The design follows the approved white, artwork-first direction: persistent left navigation on desktop, an accessible drawer on mobile, route-backed collections, and an in-page artwork viewer.

No CMS, database, runtime API, prices, or contact form are used. The production domain remains `inaslein.com`; the current GoDaddy site should stay live until Ina approves the content and a separate DNS cutover is authorized.

## Public routes

| Route | Purpose |
|---|---|
| `/` | Featured landscape painting and an uncropped visual index |
| `/work/portraits` | Portraits |
| `/work/family-histories` | Family history paintings |
| `/work/equestrian-animals` | Equestrian and animal subjects |
| `/work/studio` | Curated studio/process selection |
| `/about` | Interview-led, paraphrased artist story |
| `/cv` | Confirmed training, practice, and selected projects |
| `/contact` | Public phone, email, and Lake Worth, Florida location |

Categories with no approved artwork are omitted from navigation and the sitemap. Legacy GoDaddy routes are represented as client-side fallback pages for GitHub Pages and as permanent redirects in `public/_redirects` for Cloudflare Pages.

## Artwork catalog and private masters

The editorial source is `content/artworks.csv`; the application reads the generated, validated `content/artworks.generated.json`. Only rows with `publish=yes`, `approval=approved`, and non-empty alt text are emitted.

Original master photographs belong in the ignored `private-intake/masters/artwork/` directory or an equivalent private location supplied with `ARTWORK_SOURCE_ROOT`. They must never be committed. The importer creates metadata-free AVIF and WebP derivatives at thumbnail, display, and full-view sizes under `public/artwork/generated/`.

```bash
npm run content:build
npm run content:check
```

The catalog build refuses duplicate or unsafe slugs, unsupported categories, missing source files, unapproved publication rows, and missing alt text. The content check verifies every generated asset, dimensions, approval state, unresolved placeholders, and EXIF/XMP/IPTC/GPS removal.

Raw interview transcripts are not stored in this repository. `content/source-register.md` records only non-sensitive editorial provenance and approval status. All interview-led prose is paraphrased; no direct quotations, private-client names, unverified exhibitions, teaching promotion, prices, or home address are published.

## Local development and verification

Node 22 is the supported runtime. Fonts are stored as package assets rather than fetched during the build.

```bash
npm ci
npm run dev
npm run verify
```

`npm run verify` checks the catalog, linting, types, static production export, internal asset links, canonical metadata, redirect declarations, sitemap, robots file, and exported headers.

## Review and deployment

Pushes to `main` currently create the stakeholder preview on GitHub Pages using `.github/workflows/deploy-pages.yml`. The workflow sets the preview-only `/inaslein-redesign` base path and deploys `out/`.

For the approved production candidate, connect this repository to Cloudflare Pages with:

- Framework preset: Next.js (Static HTML Export)
- Build command: `npm run build`
- Build output directory: `out`
- Node version: 22

`wrangler.jsonc`, `public/_headers`, and `public/_redirects` capture the static output location, security/cache policy, and legacy route mappings. Validate the Cloudflare preview, TLS, redirects, caching, social previews, and phone-sized layouts before any DNS change.

Production remains gated on Ina approving the curated artwork list, paraphrased About and story copy, CV facts, titles/dates, and any private-work permissions. A repository implementation or preview build is not production approval.

## Recovering the superseded dark concept

Before this direction replaced the dark gallery-wall concept, recoverable copies were saved outside the repository:

- `/private/tmp/inaslein-dark-concept-2026-08-31.patch`
- `/private/tmp/inaslein-dark-concept-2026-08-31.tgz`

These are local machine backups, not deployment inputs.
