"use client";

import { useEffect, useRef, useState } from "react";
import type { ArtworkRecord } from "@/lib/artworks";
import { ArtworkImage } from "./ArtworkImage";

function ArtworkDetails({ artwork }: { artwork: ArtworkRecord }) {
  const details = [artwork.medium, artwork.dimensions, artwork.year].filter(Boolean).join(" · ");

  return (
    <div className="artwork-details">
      {artwork.title && <h2>{artwork.title}</h2>}
      {details && <p className="artwork-facts">{details}</p>}
      {artwork.caption && <p className="artwork-caption">{artwork.caption}</p>}
      {artwork.story?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
  );
}

export function ArtworkGallery({
  artworks,
  featuredSlug,
}: {
  artworks: ArtworkRecord[];
  featuredSlug?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const featured = featuredSlug ? artworks.find((artwork) => artwork.slug === featuredSlug) : undefined;
  const gridArtworks = featured ? artworks.filter((artwork) => artwork.slug !== featured.slug) : artworks;

  useEffect(() => {
    if (selectedIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    function close() {
      setSelectedIndex(null);
      window.setTimeout(() => triggerRef.current?.focus(), 0);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") {
        setSelectedIndex((index) =>
          index === null ? null : (index - 1 + artworks.length) % artworks.length,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((index) =>
          index === null ? null : (index + 1) % artworks.length,
        );
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [artworks.length, selectedIndex]);

  function closeViewer() {
    setSelectedIndex(null);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  function openArtwork(artwork: ArtworkRecord, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelectedIndex(artworks.findIndex((item) => item.slug === artwork.slug));
  }

  const selected = selectedIndex === null ? null : artworks[selectedIndex];
  const currentIndex = selectedIndex ?? 0;
  const selectedLabel = selected?.title ?? "Artwork by Ina Slein";
  const hasStory = Boolean(selected?.story?.length);

  return (
    <>
      {featured && (
        <button
          type="button"
          className="featured-artwork artwork-trigger"
          aria-label={`Open ${featured.title ?? "featured artwork"}`}
          onClick={(event) => openArtwork(featured, event.currentTarget)}
        >
          <ArtworkImage artwork={featured} variant="display" priority />
          <span className="featured-label">
            <span>{featured.title}</span>
            <span>View work</span>
          </span>
        </button>
      )}

      <div className="art-index" aria-label="Artwork index">
        {gridArtworks.map((artwork) => (
          <button
            type="button"
            className="artwork-card artwork-trigger"
            key={artwork.slug}
            aria-label={`Open ${artwork.title ?? "artwork by Ina Slein"}`}
            onClick={(event) => openArtwork(artwork, event.currentTarget)}
          >
            <ArtworkImage artwork={artwork} variant="thumb" />
            {(artwork.title || artwork.caption) && (
              <span className="artwork-card-label">{artwork.title ?? artwork.caption}</span>
            )}
          </button>
        ))}
      </div>

      {selected && (
        <div className="viewer-layer" role="presentation">
          <button type="button" className="viewer-scrim" aria-label="Close artwork viewer" onClick={closeViewer} />
          <div
            ref={dialogRef}
            className={hasStory ? "artwork-viewer has-story" : "artwork-viewer art-only"}
            role="dialog"
            aria-modal="true"
            aria-label={selectedLabel}
          >
            <div className="viewer-stage">
              <ArtworkImage artwork={selected} variant="full" priority />
            </div>
            {hasStory ? (
              <aside className="viewer-information">
                <div className="viewer-toolbar">
                  <p className="utility-label">{currentIndex + 1} / {artworks.length}</p>
                  <button type="button" className="text-button" onClick={closeViewer}>Close</button>
                </div>
                <ArtworkDetails artwork={selected} />
                <div className="viewer-navigation" aria-label="Artwork viewer controls">
                  <button type="button" className="text-button" onClick={() => setSelectedIndex((currentIndex - 1 + artworks.length) % artworks.length)}>Previous</button>
                  <button type="button" className="text-button" onClick={() => setSelectedIndex((currentIndex + 1) % artworks.length)}>Next</button>
                </div>
              </aside>
            ) : (
              <div className="viewer-minimal-ui">
                <div className="viewer-minimal-header">
                  <p className="utility-label">{currentIndex + 1} / {artworks.length}</p>
                  <button type="button" className="text-button" onClick={closeViewer}>Close</button>
                </div>
                <div className="viewer-minimal-footer">
                  <p>{selected.title ?? selected.caption ?? "Artwork by Ina Slein"}</p>
                  <div className="viewer-minimal-navigation" aria-label="Artwork viewer controls">
                    <button type="button" className="text-button" onClick={() => setSelectedIndex((currentIndex - 1 + artworks.length) % artworks.length)}>Previous</button>
                    <button type="button" className="text-button" onClick={() => setSelectedIndex((currentIndex + 1) % artworks.length)}>Next</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
