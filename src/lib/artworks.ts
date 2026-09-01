import generatedCatalog from "../../content/artworks.generated.json";

export type ArtworkCategory =
  | "portraits"
  | "family-histories"
  | "equestrian-animals"
  | "studies-drawings"
  | "studio";

export type CatalogCategory = ArtworkCategory | "site";
export type ArtworkOrientation = "landscape" | "portrait" | "square";
export type ArtworkVariant = "thumb" | "display" | "full";

export type ArtworkRecord = {
  slug: string;
  category: CatalogCategory;
  title?: string;
  alt: string;
  year?: string;
  medium?: string;
  dimensions?: string;
  caption?: string;
  story?: string[];
  featured: boolean;
  order: number;
  width: number;
  height: number;
  orientation: ArtworkOrientation;
  images: Record<ArtworkVariant, { avif: string; webp: string }>;
};

export const CATEGORY_INFO: Record<
  ArtworkCategory,
  { label: string; shortLabel: string; navLabel: string; description: string }
> = {
  portraits: {
    label: "Portraits",
    shortLabel: "Portraits",
    navLabel: "Portraits",
    description: "Individuals and pairs, observed for presence rather than pose.",
  },
  "family-histories": {
    label: "Family Histories",
    shortLabel: "Family histories",
    navLabel: "Family histories",
    description: "Families reconstructed through memory, photographs, conversation, and research.",
  },
  "equestrian-animals": {
    label: "Equestrian & Animal Subjects",
    shortLabel: "Equestrian & animals",
    navLabel: "Animals",
    description: "Horses, dogs, and other companions studied for movement and character.",
  },
  "studies-drawings": {
    label: "Studies & Drawings",
    shortLabel: "Studies & drawings",
    navLabel: "Studies & drawings",
    description: "Works on paper and exploratory studies from the studio archive.",
  },
  studio: {
    label: "Studio",
    shortLabel: "Studio",
    navLabel: "Studio (In Progress)",
    description: "A painting in progress, and the story that set it in motion.",
  },
};

const catalog = generatedCatalog as unknown as ArtworkRecord[];

export const ARTWORKS = catalog
  .filter((artwork) => artwork.category !== "site")
  .sort((a, b) => a.order - b.order);

export function artworksByCategory(category: ArtworkCategory) {
  return catalog
    .filter((artwork) => artwork.category === category)
    .sort((a, b) => a.order - b.order);
}

export function getArtwork(slug: string) {
  return catalog.find((artwork) => artwork.slug === slug);
}

export function getFeaturedArtwork() {
  return ARTWORKS.find((artwork) => artwork.featured) ?? ARTWORKS[0];
}

export function getAvailableCategories() {
  return (Object.keys(CATEGORY_INFO) as ArtworkCategory[])
    .map((category) => ({
      category,
      ...CATEGORY_INFO[category],
      count: artworksByCategory(category).length,
      href: `/work/${category}`,
    }))
    .filter((item) => item.count > 0);
}
