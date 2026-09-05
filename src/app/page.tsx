import type { Metadata } from "next";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";
import styles from "./entrance.module.css";

export const metadata: Metadata = {
  title: { absolute: "Ina Slein | Painter" },
  alternates: { canonical: "/" },
};

const HOME_LINKS = [
  { href: "/", label: "Home" },
  { href: "/work/", label: "Work" },
  { href: "/about/", label: "About" },
  { href: "/cv/", label: "CV" },
  { href: "/contact/", label: "Contact" },
];

function HomepageLinks() {
  return HOME_LINKS.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={item.href === "/" ? "page" : undefined}
    >
      {item.label}
    </Link>
  ));
}

export default function Homepage() {
  return (
    <div className={styles.homepage}>
      <header className={styles.header}>
        <Link href="/" className={styles.artistName} aria-current="page">
          Ina Slein
        </Link>
        <p className={styles.domain}>inaslein.com</p>
      </header>

      <div className={styles.navigationBar}>
        <nav className={styles.desktopNavigation} aria-label="Primary navigation">
          <HomepageLinks />
        </nav>
        <details className={styles.mobileNavigation}>
          <summary>
            <span className={styles.menuIcon} aria-hidden="true">☰</span>
            <span className="visually-hidden">Menu</span>
          </summary>
          <nav aria-label="Primary navigation">
            <HomepageLinks />
          </nav>
        </details>
        <p className={styles.mobileDomain}>inaslein.com</p>
      </div>

      <div className={styles.artwork}>
        <picture>
          <source
            type="image/webp"
            srcSet={[640, 1280, 2400].map((width) => `${withBasePath(`/artwork/entrance/horse-${width}.webp`)} ${width}w`).join(", ")}
            sizes="100vw"
          />
          <img
            src={withBasePath("/artwork/entrance/horse-2400.webp")}
            alt="Painting by Ina Slein of a dark horse and three people among trees in a colorful landscape."
            width={4897}
            height={3259}
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </div>
    </div>
  );
}
