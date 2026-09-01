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
            <p className="studio-status">Work in progress</p>
          </div>
          <div className="studio-journal-copy">
            <h2 id="studio-journal-title">A portrait shaped by return</h2>
            <p>
              The equestrian portrait now taking shape in Ina&apos;s studio began with a thoroughbred
              that had escaped neglect in Ontario. After traveling several miles, the horse appeared
              near the land where it had been bred more than two decades earlier. An image shared
              online helped reconnect it with the breeder who had known it at the beginning of its life.
            </p>
            <p>
              Ina began the painting from the story and the first images she received, then traveled
              to meet the horse before resolving the work. At the farm, the horse stayed inside until
              a companion mare came forward. The two had been paired during its recovery, and their
              bond gave Ina a deeper subject: not simply an animal in a landscape, but trust, survival,
              and the possibility of a new beginning.
            </p>
            <p>
              The sequence below records the painting as its scale, color, and relationships developed.
              It is presented as a working process rather than a finished portrait.
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
          <p className="section-label">Next stage</p>
          <div>
            <h2>When the painting is complete</h2>
            <p>
              The approved final photograph will lead this page. These earlier stages will remain as
              a record of how the portrait was built and how the horse&apos;s history entered the work.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
