import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ina Slein to discuss a portrait, family, or animal commission.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="contact-page">
      <header className="page-heading contact-heading">
        <p className="utility-label">Contact</p>
        <h1>Begin with a conversation.</h1>
        <p>
          To discuss a portrait or another commissioned painting, contact Ina directly. The first
          conversation can cover the subject, the reason for the work, available source material,
          approximate scale, and where the painting will live.
        </p>
      </header>

      <dl className="contact-details">
        <div>
          <dt>Email</dt>
          <dd><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></dd>
        </div>
        <div>
          <dt>Telephone</dt>
          <dd><a href={`tel:${BUSINESS.telephone}`}>{BUSINESS.telephoneDisplay}</a></dd>
        </div>
        <div>
          <dt>Studio</dt>
          <dd>Palm Beach County, Florida</dd>
        </div>
      </dl>

      <section className="contact-note">
        <p className="section-label">Helpful at the beginning</p>
        <p>
          A photograph, a family account, the dimensions of the intended room, or simply the reason
          the painting matters can be enough to begin.
        </p>
      </section>
    </article>
  );
}
