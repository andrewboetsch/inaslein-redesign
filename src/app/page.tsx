import type { Metadata } from "next";
import { ArtworkGallery } from "@/components/ArtworkGallery";
import { ARTWORKS, getFeaturedArtwork } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected finished paintings by Ina Slein: portraits, family histories, and animal subjects.",
  alternates: { canonical: "/" },
};

export default function WorkPage() {
  const featured = getFeaturedArtwork();
  const finishedArtworks = ARTWORKS.filter((artwork) => artwork.category !== "studio");

  return (
    <div className="work-page">
      <header className="work-heading">
        <div>
          <p className="utility-label">Selected work</p>
          <h1>Paintings</h1>
        </div>
        <p>
          Portraits, family histories, and animal subjects.
        </p>
      </header>
      <ArtworkGallery artworks={finishedArtworks} featuredSlug={featured?.slug} />
    </div>
  );
}
