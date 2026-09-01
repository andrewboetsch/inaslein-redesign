import type { Metadata } from "next";
import { LegacyRedirect } from "@/components/LegacyRedirect";

export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" }, robots: { index: false, follow: true } };

export default function WelcomeRedirect() {
  return <LegacyRedirect destination="/about" />;
}
