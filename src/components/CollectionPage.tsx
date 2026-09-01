import { ArtworkGallery } from "@/components/ArtworkGallery";
import { artworksByCategory, CATEGORY_INFO, type ArtworkCategory } from "@/lib/artworks";

export function CollectionPage({ category }: { category: ArtworkCategory }) {
  const info = CATEGORY_INFO[category];
  const artworks = artworksByCategory(category);

  return (
    <div className="collection-page">
      <header className="page-heading collection-heading">
        <p className="utility-label">Work / {info.shortLabel}</p>
        <h1>{info.label}</h1>
        <p>{info.description}</p>
      </header>
      {artworks.length ? (
        <ArtworkGallery artworks={artworks} />
      ) : (
        <p className="empty-collection">This section is being assembled from the studio archive.</p>
      )}
    </div>
  );
}
