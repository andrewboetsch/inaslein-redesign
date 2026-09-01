import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionPage } from "@/components/CollectionPage";
import { artworksByCategory, CATEGORY_INFO, type ArtworkCategory } from "@/lib/artworks";

const categories = Object.keys(CATEGORY_INFO) as ArtworkCategory[];

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!categories.includes(category as ArtworkCategory)) return {};
  const typedCategory = category as ArtworkCategory;
  const info = CATEGORY_INFO[typedCategory];
  const collection = artworksByCategory(typedCategory);
  const preview = typedCategory === "studio" ? collection.at(-1) : collection[0];
  return {
    title: info.label,
    description: info.description,
    alternates: { canonical: `/work/${category}` },
    openGraph: {
      title: `${info.label} | Ina Slein`,
      description: info.description,
      images: preview ? [{ url: preview.images.display.webp }] : undefined,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!categories.includes(category as ArtworkCategory)) notFound();
  return <CollectionPage category={category as ArtworkCategory} />;
}
