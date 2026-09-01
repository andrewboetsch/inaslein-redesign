import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description: "Verified education, training, practice, and selected projects by painter Ina Slein.",
  alternates: { canonical: "/cv" },
};

export default function CvPage() {
  return (
    <article className="cv-page">
      <header className="page-heading cv-heading">
        <p className="utility-label">Curriculum vitae / Studio archive</p>
        <h1>Curriculum Vitae</h1>
        <p>
          Ina Slein is a painter whose portraits are built through observation, conversation, and
          research. She works from Palm Beach County, Florida.
        </p>
      </header>

      <section className="cv-section">
        <h2>Education and training</h2>
        <div className="cv-entry">
          <p className="cv-date">1975–1979</p>
          <div>
            <h3>Studies in painting</h3>
            <ul className="plain-list">
              <li>Bard College</li>
              <li>New York University</li>
              <li>New York Studio School of Drawing, Painting and Sculpture</li>
              <li>Parsons School of Design</li>
            </ul>
            <p className="cv-note">
              At the New York Studio School, Ina studied with Mercedes Matter, Nicolas Carone,
              Paul Georges, and Sidney Geist.
            </p>
          </div>
        </div>
      </section>

      <section className="cv-section">
        <h2>Practice</h2>
        <div className="cv-entry">
          <p className="cv-date">Portraiture</p>
          <div>
            <h3>People, relationships, and lived histories</h3>
            <p>
              Portraits developed through sustained observation, conversation, and research, including
              family histories, equestrian and animal subjects, work from life and archival photographs,
              and commissioned group portraits.
            </p>
          </div>
        </div>
      </section>

      <section className="cv-section">
        <h2>Selected commissions and projects</h2>
        <div className="cv-entry">
          <p className="cv-date">Schachtel&apos;s Bakery</p>
          <div>
            <h3>Family history painting</h3>
            <p>A multigenerational family enterprise reconstructed from personal history and archival reference.</p>
          </div>
        </div>
        <div className="cv-entry">
          <p className="cv-date">Schachtel Family Dinner</p>
          <div>
            <h3>Commissioned group portrait</h3>
            <p>
              Developed through family interviews and period research, with attention to relationships,
              clothing, hairstyles, and setting.
            </p>
          </div>
        </div>
      </section>

      <footer className="cv-contact">
        <p>For commissions and studio inquiries</p>
        <a href="mailto:info@inaslein.com">info@inaslein.com</a>
      </footer>
    </article>
  );
}
