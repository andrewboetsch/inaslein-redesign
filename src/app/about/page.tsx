import type { Metadata } from "next";
import { ArtworkImage } from "@/components/ArtworkImage";
import { getArtwork } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "About",
  description: "Ina Slein's early formation, New York training, and research-led approach to portraits and family histories.",
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
            Ina began drawing at four and has spent a lifetime looking past appearance. Her portraits
            are built around the histories, gestures, private details, and relationships that make a
            likeness feel inhabited.
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
            Ina remembers drawing from the age of four. At about nine, her mother arranged formal
            instruction with a local art teacher who asked her to sketch children as they moved around
            a playground. She had to look quickly and keep the line alive. That early exercise still echoes
            in the energy she brings to a figure, even when the sitter is still.
          </p>
          <p>
            Looking at art was part of ordinary life, too. Throughout grammar school and beyond, Ina
            and her mother made frequent visits to the Metropolitan Museum of Art and the Museum of
            Modern Art. In high school in West Orange, New Jersey, she developed a substantial art
            portfolio and prepared for further study.
          </p>
          <p>
            From 1975 to 1979, she studied painting at Bard College, New York University, the New York
            Studio School of Drawing, Painting and Sculpture, and Parsons School of Design. The Studio
            School was especially formative: drawing from models in motion strengthened the searching,
            active line she had begun developing as a child. She worked there with{" "}
            <a className="artist-reference-link" href="https://gagosian.com/quarterly/2020/10/20/essay-game-changer-mercedes-matter/">
              Mercedes Matter
            </a>
            ,{" "}
            <a className="artist-reference-link" href="https://nicolascaroneestate.org/">
              Nicolas Carone
            </a>
            ,{" "}
            <a className="artist-reference-link" href="https://paulgeorges.com/">
              Paul Georges
            </a>
            , and{" "}
            <a className="artist-reference-link" href="https://www.ericfirestonegallery.com/artists/sidney-geist">
              Sidney Geist
            </a>
            .
          </p>
          <p>
            Ina found an affinity with the psychologically alert figurative work of Alberto Giacometti,
            Alice Neel, and Lucian Freud. Their work helped confirm that a portrait could remain
            restless, direct, and emotionally present without becoming a literal transcription.
          </p>
        </div>
      </section>

      <section className="prose-section">
        <p className="section-label">A practice resumed</p>
        <div className="prose-copy">
          <h2>Family history brought painting forward again</h2>
          <p>
            After her years of study, painting continued in intervals rather than along a conventional
            institutional career. A six-foot painting based on an old photograph of her family&apos;s bakery
            in Newark brought the work forward again. After the painting was discovered online by a
            member of the extended family, one commission led to another.
          </p>
          <p>
            The later bakery paintings arrived during a concentrated period of personal loss. Spending
            months learning about each relative gave grief a structure and allowed family history to
            become something she could enter, examine, and remake through paint.
          </p>
          <p>
            The same method now shapes her larger group portraits: conversation first, then sustained
            research into the people, the period, the setting, and the subtle alignments between one
            figure and another. Clothing, hairstyles, light, scale, and color are chosen for what they
            reveal about the life of the group rather than for decoration alone.
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
            with a face, an animal, or a family occasion, but observation is only the beginning. Its
            structure develops through what she learns about the subject: how people relate, what a
            place has held, or what an animal has survived. Large canvases allow those relationships to
            remain visible at the scale of the room in which the work will live.
          </p>
        </div>
      </section>
    </article>
  );
}
