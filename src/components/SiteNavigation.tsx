"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BUSINESS } from "@/lib/business";

type CategoryLink = { href: string; label: string; count: number };

const PRIMARY = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/cv", label: "CV" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/work/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavList({
  pathname,
  categories,
  onNavigate,
}: {
  pathname: string;
  categories: CategoryLink[];
  onNavigate?: () => void;
}) {
  return (
    <>
      <nav className="primary-nav" aria-label="Primary navigation">
        {PRIMARY.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={active ? "nav-link is-active" : "nav-link"}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="browse-nav">
        <p className="utility-label">Browse work</p>
        <nav aria-label="Artwork collections">
          {categories.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={active ? "browse-link is-active" : "browse-link"}
                onClick={onNavigate}
              >
                <span>{item.label}</span>
                <span aria-label={`${item.count} works`}>{item.count}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export function SiteNavigation({ categories }: { categories: CategoryLink[] }) {
  const pathname = usePathname();
  const [openedOnPath, setOpenedOnPath] = useState<string | null>(null);
  const open = openedOnPath === pathname;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenedOnPath(null);
        menuButtonRef.current?.focus();
        return;
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
  }, [open]);

  const closeDrawer = () => setOpenedOnPath(null);

  return (
    <>
      <aside className="site-sidebar" aria-label="Site navigation">
        <Link href="/" className="site-name" aria-label="Ina Slein, work">Ina Slein</Link>
        <p className="site-discipline">Paintings</p>
        <NavList pathname={pathname} categories={categories} />
        <div className="sidebar-location">
          <p>{BUSINESS.cityDisplay}</p>
          <p>Studio archive</p>
        </div>
      </aside>

      <header className="mobile-header">
        <Link href="/" className="mobile-name" aria-label="Ina Slein, work">Ina Slein</Link>
        <button
          ref={menuButtonRef}
          type="button"
          className="mobile-menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpenedOnPath(pathname)}
        >
          Menu
        </button>
      </header>

      {open && (
        <div className="mobile-drawer-layer">
          <button
            type="button"
            className="drawer-scrim"
            aria-label="Close navigation"
            onClick={() => {
              closeDrawer();
              menuButtonRef.current?.focus();
            }}
          />
          <div
            ref={drawerRef}
            id="mobile-navigation"
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="drawer-header">
              <div>
                <Link href="/" className="mobile-name" onClick={closeDrawer}>Ina Slein</Link>
                <p className="site-discipline">Paintings</p>
              </div>
              <button
                type="button"
                className="mobile-menu-button"
                onClick={() => {
                  closeDrawer();
                  menuButtonRef.current?.focus();
                }}
              >
                Close
              </button>
            </div>
            <NavList pathname={pathname} categories={categories} onNavigate={closeDrawer} />
            <div className="drawer-contact">
              <a href={`tel:${BUSINESS.telephone}`}>{BUSINESS.telephoneDisplay}</a>
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
