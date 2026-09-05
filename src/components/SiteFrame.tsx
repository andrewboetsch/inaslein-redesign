"use client";

import { usePathname } from "next/navigation";
import { SiteNavigation } from "@/components/SiteNavigation";

export function SiteFrame({ children, categories }: {
  children: React.ReactNode;
  categories: { href: string; label: string; count: number }[];
}) {
  const pathname = usePathname();
  if (pathname === "/") {
    return <main id="main-content">{children}</main>;
  }
  return (
    <div className="site-frame">
      <SiteNavigation categories={categories} />
      <main id="main-content" className="site-main">{children}</main>
    </div>
  );
}
