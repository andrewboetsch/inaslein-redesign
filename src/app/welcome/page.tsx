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
            Educated in New York City, Ina&apos;s close proximity to these great schools exposed her
            to a variety of influential teaching styles that when combined gave her the gift of
            drawing and painting with unyielding freedom of expression.
          </p>
          <p>
            Elizabeth Murray, her very first instructor at Bard, assigned the class to go into the
            woods and collect debris from the forest floor. They then constructed small sculptures.
            That was her introduction to understanding shapes in space.
          </p>
          <p>
            Murray Reich, in their first drawing class and based on her first drawing, suggested she
            become familiar with the work of Alberto Giacometti. That she did and felt excited by
            the energy in the drawings.
          </p>
          <p>
            The New York Studio School for Painting, Drawing and Sculpture infused that same energy
            into their expression as learners. Paul Georges, Sidney Geist, Mercedes Matter and
            Nicholas Carone reviewed their work on a weekly basis as they worked endlessly, figure
            painting and drawing from patient models. This style of teaching definitely influenced
            her artistic focus on people and portraits. This wonderful education has been her
            companion throughout her artistic expression over the years.
          </p>
        </div>
      </section>
    </article>
  );
}
