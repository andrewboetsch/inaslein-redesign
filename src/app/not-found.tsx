import Link from "next/link";

export default function NotFound() {
  return (
    <section className="text-page compact-page">
      <p className="utility-label">Not found</p>
      <h1>This page is not in the collection.</h1>
      <p>The work may have moved, or the address may be incomplete.</p>
      <Link className="text-link" href="/">Return to the work</Link>
    </section>
  );
}
