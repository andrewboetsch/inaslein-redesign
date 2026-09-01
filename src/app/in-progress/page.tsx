import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";

export const metadata: Metadata = { title: "Studio", alternates: { canonical: "/work/studio" }, robots: { index: false, follow: true } };

export default function InProgressRedirect() {
  return <LegacyRedirect destination="/work/studio" />;
}
