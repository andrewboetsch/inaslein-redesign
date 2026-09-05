import { ArtworkGallery } from "@/components/ArtworkGallery";
import { artworksByCategory, CATEGORY_INFO, type ArtworkCategory } from "@/lib/artworks";

export function CollectionPage({ category }: { category: ArtworkCategory }) {
  const info = CATEGORY_INFO[category];
  const artworks = artworksByCategory(category);
  const isStudio = category === "studio";
  const latestStudioWork = isStudio ? artworks.at(-1) : undefined;

  return (
    <div className={isStudio ? "collection-page studio-page" : "collection-page"}>
      <header className="page-heading collection-heading">
        <p className="utility-label">Work / {info.shortLabel}</p>
        <h1>{info.label}</h1>
        <p>{info.description}</p>
      </header>
      {isStudio && (
        <section className="studio-journal" aria-labelledby="studio-journal-title">
          <div className="studio-journal-labels">
            <p className="section-label">Studio journal</p>
            <p className="studio-status">Completed 2026</p>
          </div>
          <div className="studio-journal-copy">
            <h2 id="studio-journal-title">Mambo&apos;s Journey—Lost and Found</h2>
            <p>
              In March 2025, Ina received two videos and a photograph from family in Ontario. A wet,
              exhausted horse was running frantically across a field, slipping on an icy hill, and
              falling. The people watching from the house could not yet tell where the horse had come
              from or how to help her. Ina was in Florida, but the images would not leave her. She
              ordered six-foot stretcher bars, canvas, and paint and began working immediately.
            </p>
            <p>
              Neighbors experienced with horses brought the animal into their barn, where she could
              be cleaned, warmed, and cared for. Ina kept painting while she searched for the missing
              parts of the story. The horse was eventually identified as Mambo, a Thoroughbred about
              twenty-four years old. She had traveled several miles and arrived close to the farm where
              she had been bred more than two decades earlier. The search connected Mambo with her
              original breeder, who gave her a permanent home.
            </p>
            <p>
              Ina could not finish the painting without meeting Mambo. She flew to Ontario in October
              2025 and found a very different horse from the one in the videos: tall, calm, and free of
              the worry Ina had seen in her eyes. Mambo came out of the barn by following the black mare
              who had become her trusted companion during recovery. That relationship helped Ina
              understand the painting as a story of safety, reliance, and return.
            </p>
            <p>
              The completed 4 × 6-foot canvas holds the moment when distress begins to give way to
              relief. Although the figures are still, the landscape, pointed ears, and moving lines
              retain the urgency of what has just happened. Ina was painting more than the likeness of
              a horse. She was trying to give form to mystery, courage, endurance, and the instinct to
              keep moving until safety can be found.
            </p>
          </div>
        </section>
      )}
      {artworks.length ? (
        <ArtworkGallery artworks={artworks} featuredSlug={latestStudioWork?.slug} />
      ) : (
        <p className="empty-collection">This section is being assembled from the studio archive.</p>
      )}
      {isStudio && artworks.length > 0 && (
        <section className="studio-next-step">
          <p className="section-label">The making</p>
          <div>
            <h2>Nearly a year on canvas</h2>
            <p>
              Ina painted and contemplated Mambo&apos;s journey for almost a year. The stages above record
              how she organized the story across the long rectangular canvas, building its geography,
              time, color, and relationships as she learned more about the horse. The finished work is
              both Mambo&apos;s portrait and a record of the people who helped carry her from danger into care.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
