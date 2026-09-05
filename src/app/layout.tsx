import type { Metadata } from "next";
import "@fontsource-variable/bodoni-moda";
import "@fontsource-variable/manrope";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { SiteFrame } from "@/components/SiteFrame";
import { getAvailableCategories } from "@/lib/artworks";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://inaslein.com"),
  title: {
    default: "Ina Slein | Painter",
    template: "%s | Ina Slein",
  },
  description: "Paintings by Ina Slein, including commissioned portraits, family histories, and animal subjects.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ina Slein | Painter",
    description: "Portraits, family histories, and paintings from the studio archive.",
    type: "website",
    url: "/",
    images: [{ url: "/artwork/generated/schachtel-bakery-display.webp", width: 1600, height: 1193 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const categories = getAvailableCategories().map((item) => ({
    href: item.href,
    label: item.navLabel,
    count: item.count,
  }));

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <LocalBusinessSchema />
        <SiteFrame categories={categories}>{children}</SiteFrame>
      </body>
    </html>
  );
}
