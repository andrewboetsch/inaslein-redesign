import type { Metadata } from "next";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";
import styles from "./entrance.module.css";

export const metadata: Metadata = {
  title: { absolute: "Ina Slein | Painter" },
  alternates: { canonical: "/" },
};

export default function EntrancePage() {
  return (
    <div className={styles.entrance}>
      <div className={styles.artwork}>
        <picture>
          <source
            type="image/webp"
            srcSet={[640, 1280, 2400].map((width) => `${withBasePath(`/artwork/entrance/horse-${width}.webp`)} ${width}w`).join(", ")}
            sizes="(max-width: 600px) calc(100vw - 32px), calc(100vw - 64px)"
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
      <div className={styles.caption}>
        <h1>Ina Slein</h1>
        <Link href="/work/" className={styles.enter}>Enter</Link>
      </div>
    </div>
  );
}
