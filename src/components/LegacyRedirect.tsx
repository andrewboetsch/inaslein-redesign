"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LegacyRedirect({ destination }: { destination: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(destination);
  }, [destination, router]);

  return (
    <section className="text-page compact-page">
      <p className="utility-label">Page moved</p>
      <h1>This page has a new address.</h1>
      <p>You should be taken there automatically.</p>
      <Link className="text-link" href={destination}>Continue to the collection</Link>
    </section>
  );
}
