import { BUSINESS } from "@/lib/business";

export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    name: BUSINESS.name,
    url: "https://inaslein.com",
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.state,
      addressCountry: BUSINESS.country,
    },
    areaServed: BUSINESS.areaServed.map((city) => ({ "@type": "City", name: city })),
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Commissioned portrait painting",
        description: "Commissioned paintings of individuals, families, and animal companions.",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
