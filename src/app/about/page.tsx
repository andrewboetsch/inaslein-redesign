import type { Metadata } from "next";
import { ArtworkImage } from "@/components/ArtworkImage";
import { getArtwork } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "About",
  description: "Ina Slein's path to painting and her research-led approach to portraits and family histories.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Ina Slein",
    description: "A painter attentive to people, relationships, memory, and the histories held in an image.",
    images: [{ url: "/artwork/generated/ina-in-studio-display.webp" }],
  },
};

export default function AboutPage() {
  const studioPortrait = getArtwork("ina-in-studio");
  const mindFloat = getArtwork("mind-float");

  return (
    <article className="text-page about-page">
      <header className="about-introduction">
        <div>
          <p className="utility-label">About</p>
          <h1>Ina Slein</h1>
          <p className="lead-copy">
            Ina is a painter interested in the person beyond appearance: the histories, gestures,
            private details, and relationships that make a likeness feel inhabited.
          </p>
        </div>
        {studioPortrait && (
          <figure className="about-portrait">
            <ArtworkImage artwork={studioPortrait} variant="display" priority />
            <figcaption>Ina Slein in the studio</figcaption>
          </figure>
        )}
      </header>

      <section className="prose-section">
        <p className="section-label">Learning to look</p>
        <div className="prose-copy">
          <h2>An early habit of attention</h2>
          <p>
            Art entered Ina&apos;s life early. Formal instruction began when she was young, while visits
            to museums with her mother made looking at paintings part of ordinary life. Those first
            experiences established a lasting interest in how a figure can carry emotion without
            explaining it outright.
          </p>
          <p>
            From 1975 to 1979, she studied painting at Bard College, New York University, the New York
            Studio School of Drawing, Painting and Sculpture, and Parsons School of Design. At the
            Studio School, she worked with Mercedes Matter, Nicolas Carone, Paul Georges, and Sidney Geist.
          </p>
        </div>
      </section>

      <section className="prose-section">
        <p className="section-label">A practice resumed</p>
        <div className="prose-copy">
          <h2>Family history brought painting forward again</h2>
          <p>
            After her years of study, painting continued in intervals rather than along a conventional
            institutional career. Portraits of her own family and their bakery gradually became a way
            to gather separate memories, photographs, and generations into a single image.
          </p>
          <p>
            That work led to commissions. The same method still shapes her larger group portraits:
            conversation first, then sustained research into the people, the period, the setting, and
            the subtle alignments between one figure and another.
          </p>
        </div>
      </section>

      {mindFloat && (
        <section className="about-artwork-section">
          <ArtworkImage artwork={mindFloat} variant="display" />
          <div>
            <p className="section-label">The wider practice</p>
            <h2>Memory can be a subject, too</h2>
            <p>
              Portraiture is central, but the studio also holds works drawn from place, sensation, and
              remembered experience. Across them, observation is a beginning rather than an end.
            </p>
          </div>
        </section>
      )}

      <section className="prose-section final-prose-section">
        <p className="section-label">Working method</p>
        <div className="prose-copy">
          <h2>Conversation, research, and scale</h2>
          <p>
            Ina works from life, photographs, interviews, and archival material. A painting may begin
            with a face, an animal, or a family occasion, but its structure develops through what she
            learns about the subject. Large canvases allow those relationships to remain visible at the
            scale of the room in which the work will live.
          </p>
        </div>
      </section>
    </article>
  );
}
