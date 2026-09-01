# Local SEO Analysis — inaslein.com

**Date:** 2026-07-27
**Prepared for:** Ina Slein (portrait artist), Palm Beach County, FL
**Purpose:** GBP-readiness audit ahead of creating a Google Business Profile listing

## Local SEO Score: 21/100

| Dimension | Weight | Score | Status |
|---|---|---|---|
| GBP Signals | 25% | 5/25 | No listing detected yet |
| Reviews & Reputation | 20% | 4/20 | No Google reviews; some Nextdoor testimonials |
| Local On-Page SEO | 20% | 6/20 | No city/service in titles; partial NAP |
| NAP Consistency & Citations | 15% | 3/15 | **Real conflict found — see below** |
| Local Schema Markup | 10% | 0/10 | None on live site or in-progress redesign |
| Local Link & Authority | 10% | 3/10 | One Nextdoor citation only |

This is a low score, which is normal and expected for a business that hasn't set up local SEO infrastructure yet — nothing here is a penalty, it's a checklist of what's missing.

## Business Type & Vertical

- **Type: Service Area Business (SAB) with hidden address.** The practice is home-based and portrait commissions do not require publishing a storefront location.
- **Vertical: Artist / commissioned portrait painting.** Treat the practice as a local creative service business centered on commissioned portrait work.

## Critical Finding: NAP Conflict

The live site (inaslein.com) and an existing public citation disagree on two of the three NAP fields:

| Field | inaslein.com (live site) | Nextdoor citation (found via search) |
|---|---|---|
| Name | Ina Slein | Ina Slein Artist |
| Address | *(none shown — just "West Palm Beach")* | **Private home address withheld** |
| Phone | *(none shown anywhere on the site)* | **(561) 632-8055** |

Source: [Ina Slein Artist – Lake Worth, FL – Nextdoor](https://nextdoor.com/pages/ina-slein-artist-lake-worth-fl/)

**Why this matters right now:** Google cross-references exactly this kind of citation data when you create and verify a new Business Profile. Walking into GBP setup with the site claiming "West Palm Beach" and no phone, while a live citation says Lake Worth + a real phone number, is the single most common cause of stuck/rejected verifications and inconsistent map-pack placement. This needs to be resolved — pick the one correct, current NAP — **before** the GBP listing is created, not after.

**Current launch decision:** keep the home address private and publish only Palm Beach County as the service area. The public phone number should be reconfirmed before final production approval.

## GBP Optimization Checklist

| Item | Status |
|---|---|
| Business exists in Google Maps already | Not found in search — looks clear to create new |
| Primary category chosen correctly | N/A yet — select the closest current artist or portrait-painting category available in the GBP picker. |
| NAP finalized | **Blocked on the conflict above** |
| Service area vs. address visibility decided | Recommend hidden address + service area (Palm Beach County) given home-based, largely virtual/off-site delivery |
| Business hours | None published anywhere — decide what to show (even "by appointment" is better than nothing) |
| Photos | Plenty available now — the redesign has 30+ real photos of paintings plus a great candid studio photo of Ina at the easel, all good GBP photo material |
| GBP posts / Q&A plan | Not started — low priority until listing exists |

## Review Health Snapshot

- **Google reviews:** none (no listing yet).
- **Third-party signal:** Nextdoor page has qualitative neighbor testimonials ("a kind and patient, talented artist") but no numeric rating/count surfaced.
- No review-gating risk currently, since there is no review flow yet. Ask satisfied commission clients for reviews only after a verified profile is established.

## NAP Consistency & Citations

- **Tier 1 citations found:** Nextdoor (`nextdoor.com/pages/ina-slein-artist-lake-worth-fl/`) — has full NAP, no website link back to inaslein.com.
- **Not found in search:** Google Business Profile, Yelp, Facebook Business Page, BBB, Apple Maps/Business, Bing Places. (A personal-looking Facebook profile under a similar name turned up — I didn't treat it as a business citation since there's no way to confirm from search alone whether it's meant to represent the business, and it reads as a personal account rather than a Page.)
- **Recommended fix order:**
  1. Confirm real, current NAP with Ina directly (don't trust either source blindly).
  2. Update inaslein.com (and the in-progress redesign) to show the confirmed phone number and, if she's comfortable, the city-level service area language matching what will go on GBP.
  3. Create the GBP listing with that confirmed NAP.
  4. Update the Nextdoor listing to match exactly (same business name format, same phone).
  5. Only then pursue new citations (Bing Places, Apple Business Connect, Yelp) — all with identical NAP.

## Local Schema Markup

- **Live site (inaslein.com):** no `application/ld+json` anywhere — confirmed empty on every page checked (home, welcome, portrait-gallery, family-portraits, animals-we-love, in-progress).
- **In-progress redesign (~/inaslein-redesign):** also has no LocalBusiness schema yet. Recommend adding before launch:
  - A `LocalBusiness` block (or `Person` for Ina + `LocalBusiness` for the practice) in `src/app/layout.tsx`, populated with the **confirmed** name/phone/address-or-areaServed once that's settled — do not fill in placeholder data.
  - `areaServed` listing Palm Beach County / relevant cities if going the hidden-address SAB route.
  - A `Service` entry for portrait commissions.
  - `sameAs` linking to whatever profiles get created (GBP, Nextdoor, any social).
  - Don't add `aggregateRating` until there are real Google reviews to reflect — a placeholder rating here would be a fake-signal problem, not a shortcut.

## Local On-Page SEO

- **Title tags today:** "Ina Slein", "Welcome", "Portrait Gallery", "Family Portraits", "Animals We Love", "In Progress" — none carry city or service keywords. The redesign already does better here (e.g. `"Portrait Gallery | Ina Slein"`), but still doesn't include the city — worth adding once NAP/service-area is confirmed, e.g. `"Portrait Artist in West Palm Beach, FL | Ina Slein"`.
- **Meta descriptions:** empty on every page of the live site. The redesign has real per-page descriptions already (a genuine improvement), but none currently name a city — same fix as above.
- **NAP visibility:** live site shows name + city only, no phone, no address/service-area statement. The redesign's footer (`src/components/SiteFooter.tsx`) currently matches that same gap — same city-only text, no phone.
- **Dedicated offering content:** the Contact page now explains how a portrait conversation begins without creating thin promotional service pages.
- **Click-to-call:** impossible right now since there's no phone number anywhere. Add a `tel:` link once the number is confirmed.

## Local Link & Authority Signals

- One community-trust citation (Nextdoor neighbor testimonials) — genuinely valuable, keep it and get it consistent.
- No Chamber of Commerce, BBB, or local press signals found.
- No "best of" list placements found (this is Whitespark's #1 AI-visibility citation factor — worth pursuing once the listing basics are settled, e.g. local "best portrait artists" or "best art classes" roundups).

## Top 10 Prioritized Actions

1. **Critical** — Resolve the NAP conflict directly with Ina: confirm current phone, current address, and whether the address should be public or hidden for GBP.
2. **Critical** — Add the confirmed phone number (and city/service-area language) to both the live site and the in-progress redesign footer/contact page.
3. **Critical** — Search Google Maps directly for "Ina Slein" before creating a GBP listing, to rule out an existing unclaimed profile.
4. **High** — Create the GBP listing with the confirmed NAP, correct primary category (pick the one offering to lead with), and service area or address per Ina's preference.
5. **High** — Add `LocalBusiness`/`Person`/`Service` schema to the redesign (`src/app/layout.tsx`) once NAP is confirmed — currently absent entirely.
6. **High** — Update the Nextdoor listing to match the new confirmed NAP exactly.
7. **Medium** — Add city + service keywords to page titles and meta descriptions across the redesign (e.g. "Portrait Artist in [City], FL").
8. **Withheld** — Do not promote private instruction unless Ina explicitly reconfirms that offering.
9. **Medium** — Start a steady review-request habit as soon as the GBP listing is live (aim for a trickle over time, not a one-time push).
10. **Low** — After GBP is stable, claim Bing Places (feeds ChatGPT/Copilot/Alexa) and Apple Business Connect, and pursue one or two "best local art instructor/portrait artist" roundup placements.

## What This Analysis Could Not Assess

- Live local-pack ranking position or geo-grid visibility (requires paid rank-tracking tools).
- Domain Authority / comprehensive backlink profile.
- GBP Insights data (impressions, calls, direction requests) — none exists yet since there's no listing.
- Real-time review velocity or sentiment beyond what surfaced in this search pass.
- Whether the Nextdoor address/phone are still current — **this must be confirmed directly with Ina, not assumed from a scraped listing.**

---
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel — Join the AI Marketing Hub community
🆓 Free  → https://www.skool.com/ai-marketing-hub
⚡ Pro   → https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
