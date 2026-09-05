import type { MetadataRoute } from "next";
import { getAvailableCategories } from "@/lib/artworks";

const SITE_URL = "https://inaslein.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work/", "/about", "/cv", "/contact"];
  const categoryRoutes = getAvailableCategories().map((category) => category.href);

  return [...staticRoutes, ...categoryRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.startsWith("/work/") ? 0.8 : 0.6,
  }));
}
