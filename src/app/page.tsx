import type { Metadata } from "next";
import { ArtworkGallery } from "@/components/ArtworkGallery";
import { ARTWORKS, getFeaturedArtwork } from "@/lib/artworks";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected paintings by Ina Slein: portraits, family histories, animal subjects, and work from the studio.",
  alternates: { canonical: "/" },
};

export default function WorkPage() {
  const featured = getFeaturedArtwork();

  return (
    <div className="work-page">
      <header className="work-heading">
        <div>
          <p className="utility-label">Selected work</p>
          <h1>Paintings</h1>
        </div>
        <p>
          Portraits, family histories, animal subjects, and a small view into the studio.
        </p>
      </header>
      <ArtworkGallery artworks={ARTWORKS} featuredSlug={featured?.slug} />
    </div>
  );
}
