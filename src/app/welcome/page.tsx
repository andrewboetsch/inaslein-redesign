import type { Metadata } from "next";
import { ArtworkImage } from "@/components/ArtworkImage";
import { getArtwork } from "@/lib/artworks";
import styles from "./welcome.module.css";

export const metadata: Metadata = {
  title: "Welcome",
  description:
    "Ina Slein reflects on her education in New York City and the teachers who shaped her freedom of expression.",
  alternates: { canonical: "/welcome" },
  openGraph: {
    title: "Welcome | Ina Slein",
    description:
      "Ina Slein reflects on her education in New York City and the teachers who shaped her freedom of expression.",
    images: [{ url: "/artwork/generated/ina-welcome-studio-display.webp" }],
  },
};

export default function WelcomePage() {
  const studioPortrait = getArtwork("ina-welcome-studio");

  return (
    <article className={styles.welcomePage}>
      <header className={styles.introduction}>
        <div className={styles.introductionCopy}>
          <h1>Welcome</h1>
          <div className={styles.educationIndex}>
            <p>1975–1979</p>
            <ul>
              <li>Bard College — New York, NY</li>
              <li>New York University — New York, NY</li>
              <li>New York Studio School — New York, NY</li>
              <li>Parsons School of Design — New York, NY</li>
            </ul>
          </div>
        </div>

        {studioPortrait && (
          <figure className={styles.studioPortrait}>
            <ArtworkImage artwork={studioPortrait} variant="display" priority />
            <figcaption>Ina Slein in her studio</figcaption>
          </figure>
        )}
      </header>

      <section className={styles.educationStory} aria-labelledby="education-story-title">
        <h2 id="education-story-title" className="visually-hidden">
          Ina Slein on her education
        </h2>
        <div className={styles.storyCopy}>
          <p>
            Educated in New York City, Ina had the rare opportunity to move among these nearby
            schools and experience a variety of influential teaching styles. Together, those
            different approaches gave her the gift of drawing and painting with unyielding freedom
            of expression.
          </p>
          <p>
            Her education began at Bard College with Elizabeth Murray, her very first instructor.
            Murray sent the class into the woods to collect debris from the forest floor, then asked
            the students to construct small sculptures from what they found. Through that
            assignment, Ina began to understand shapes in space.
          </p>
          <p>
            Later, in Ina&apos;s first drawing class, Murray Reich looked at her first drawing and
            suggested that she become familiar with the work of Alberto Giacometti. She followed
            his suggestion and felt immediately excited by the energy in Giacometti&apos;s drawings.
          </p>
          <p>
            That same energy carried into the New York Studio School for Painting, Drawing and
            Sculpture and became part of how Ina and her classmates learned to express themselves.
            They worked endlessly, painting and drawing the figure from patient models, while Paul
            Georges, Sidney Geist, Mercedes Matter and Nicolas Carone reviewed their work every
            week. Their teaching shaped Ina&apos;s artistic focus on people and portraits, and this
            wonderful education has remained her companion throughout all the years of her artistic
            expression.
          </p>
        </div>
      </section>
    </article>
  );
}
