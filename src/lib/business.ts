// Canonical public entity details reconciled to Ina's Google Business Profile.
// The profile intentionally hides its street address, so the repository and
// generated site must not publish or infer one.
export const BUSINESS = {
  id: "https://inaslein.com/#business",
  name: "Ina Slein Fine Artist",
  website: "https://inaslein.com",
  telephone: "+15616328055",
  telephoneDisplay: "(561) 632-8055",
  email: "info@inaslein.com",
  city: "Wellington",
  state: "FL",
  country: "US",
  cityDisplay: "Wellington, Florida",
  areaServed: ["Wellington", "West Palm Beach", "Palm Beach County"],
  googleBusinessProfile: "https://www.google.com/maps?cid=4017439670596771296",
  instagram: "https://www.instagram.com/inaslein/",
  facebook: "https://www.facebook.com/ina.sleinrubino/",
} as const;
