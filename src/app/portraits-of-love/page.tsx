import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";

export const metadata: Metadata = { title: "Equestrian and Animal Subjects", alternates: { canonical: "/work/equestrian-animals" }, robots: { index: false, follow: true } };

export default function PortraitsOfLoveRedirect() {
  return <LegacyRedirect destination="/work/equestrian-animals" />;
}
