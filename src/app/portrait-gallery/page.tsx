import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";

export const metadata: Metadata = { title: "Portraits", alternates: { canonical: "/work/portraits" }, robots: { index: false, follow: true } };

export default function PortraitGalleryRedirect() {
  return <LegacyRedirect destination="/work/portraits" />;
}
