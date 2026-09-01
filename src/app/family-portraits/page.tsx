import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";

export const metadata: Metadata = { title: "Family Histories", alternates: { canonical: "/work/family-histories" }, robots: { index: false, follow: true } };

export default function FamilyPortraitsRedirect() {
  return <LegacyRedirect destination="/work/family-histories" />;
}
