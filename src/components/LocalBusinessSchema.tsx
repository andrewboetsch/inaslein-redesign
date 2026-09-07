import { BUSINESS } from "@/lib/business";

const WEBSITE_ID = `${BUSINESS.website}/#website`;
const PERSON_ID = `${BUSINESS.website}/#ina-slein`;
const WELLINGTON_ID = `${BUSINESS.website}/#wellington-fl`;

const SERVICE_IDS = {
  portraits: `${BUSINESS.website}/#portrait-commission-service`,
  families: `${BUSINESS.website}/#family-history-commission-service`,
  animals: `${BUSINESS.website}/#animal-portrait-commission-service`,
} as const;

const PAGE_IDS = {
  home: `${BUSINESS.website}/#webpage`,
  welcome: `${BUSINESS.website}/welcome/#webpage`,
  cv: `${BUSINESS.website}/cv/#webpage`,
  work: `${BUSINESS.website}/work/#webpage`,
  contact: `${BUSINESS.website}/contact/#webpage`,
} as const;

export function LocalBusinessSchema() {
  const socialProfiles = [
    BUSINESS.googleBusinessProfile,
    BUSINESS.instagram,
    BUSINESS.facebook,
  ];

  const services = [
    {
      "@type": "Service",
      "@id": SERVICE_IDS.portraits,
      name: "Commissioned portrait painting",
      description: "Commissioned paintings of individuals.",
      provider: { "@id": BUSINESS.id },
      areaServed: { "@id": WELLINGTON_ID },
    },
    {
      "@type": "Service",
      "@id": SERVICE_IDS.families,
      name: "Commissioned family history painting",
      description: "Commissioned paintings centered on families, relationships, and shared histories.",
      provider: { "@id": BUSINESS.id },
      areaServed: { "@id": WELLINGTON_ID },
    },
    {
      "@type": "Service",
      "@id": SERVICE_IDS.animals,
      name: "Commissioned animal portrait painting",
      description: "Commissioned paintings of horses and other animal companions.",
      provider: { "@id": BUSINESS.id },
      areaServed: { "@id": WELLINGTON_ID },
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS.id,
        name: BUSINESS.name,
        url: BUSINESS.website,
        telephone: BUSINESS.telephone,
        email: BUSINESS.email,
        image: `${BUSINESS.website}/artwork/entrance/horse-2400.webp`,
        location: { "@id": WELLINGTON_ID },
        areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "Place", name })),
        hasMap: BUSINESS.googleBusinessProfile,
        sameAs: socialProfiles,
        employee: { "@id": PERSON_ID },
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@id": service["@id"] },
        })),
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Ina Slein",
        url: `${BUSINESS.website}/welcome/`,
        jobTitle: "Fine artist",
        worksFor: { "@id": BUSINESS.id },
        sameAs: [BUSINESS.instagram, BUSINESS.facebook],
      },
      {
        "@type": "City",
        "@id": WELLINGTON_ID,
        name: "Wellington",
        containedInPlace: {
          "@type": "State",
          name: "Florida",
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: BUSINESS.website,
        name: BUSINESS.name,
        publisher: { "@id": BUSINESS.id },
        inLanguage: "en-US",
        hasPart: Object.values(PAGE_IDS).map((id) => ({ "@id": id })),
      },
      ...services,
      {
        "@type": "WebPage",
        "@id": PAGE_IDS.home,
        url: `${BUSINESS.website}/`,
        name: BUSINESS.name,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS.id },
      },
      {
        "@type": "AboutPage",
        "@id": PAGE_IDS.welcome,
        url: `${BUSINESS.website}/welcome/`,
        name: "Welcome",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": PAGE_IDS.cv,
        url: `${BUSINESS.website}/cv/`,
        name: "CV",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "CollectionPage",
        "@id": PAGE_IDS.work,
        url: `${BUSINESS.website}/work/`,
        name: "Work",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS.id },
      },
      {
        "@type": "ContactPage",
        "@id": PAGE_IDS.contact,
        url: `${BUSINESS.website}/contact/`,
        name: "Contact",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": BUSINESS.id },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
