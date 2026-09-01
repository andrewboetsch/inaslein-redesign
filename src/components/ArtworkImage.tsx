import { withBasePath } from "@/lib/basePath";
import type { ArtworkRecord, ArtworkVariant } from "@/lib/artworks";

export function ArtworkImage({
  artwork,
  variant,
  className = "",
  priority = false,
}: {
  artwork: ArtworkRecord;
  variant: ArtworkVariant;
  className?: string;
  priority?: boolean;
}) {
  const image = artwork.images[variant];

  return (
    <picture className={className}>
      <source srcSet={withBasePath(image.avif)} type="image/avif" />
      <source srcSet={withBasePath(image.webp)} type="image/webp" />
      <img
        src={withBasePath(image.webp)}
        alt={artwork.alt}
        width={artwork.width}
        height={artwork.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
