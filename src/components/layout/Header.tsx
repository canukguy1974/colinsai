"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { nav, site } from "@/content/site";

/**
 * Site header.
 *
 * At the top of the page it is effectively part of the hero — transparent,
 * no border. Past the fold it settles into a stable, slightly opaque bar with
 * a hairline. The transition is the only thing about it that moves.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Trap scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-line-soft bg-void/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <Link
          href="/"
          className="group -my-1 flex items-center gap-3 rounded-md py-1.5"
          aria-label={`${site.name} — home`}
        >
          <Mark />
          <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3.5 py-3 text-[0.9375rem] transition-colors duration-200",
                      active ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-px origin-left rounded-full",
                        "bg-[linear-gradient(90deg,var(--color-blue),var(--color-violet))]",
                        "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="-mr-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:text-ink md:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
            {menuOpen ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="border-t border-line-soft bg-void/95 backdrop-blur-xl md:hidden"
      >
        <nav aria-label="Primary mobile" className="shell py-4">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-1 py-3.5 text-lg transition-colors",
                    isActive(item.href) ? "text-ink" : "text-muted",
                  )}
                >
                  {item.label}
                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-faint" aria-hidden="true">
                    <path
                      d="M6 3l5 5-5 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

/** Brand mark: an orbital body on an inclined path. */
function Mark() {
  return (
    <span className="relative inline-flex h-8 w-8 items-center justify-center">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <defs>
          <linearGradient id="markStroke" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#45e0d2" />
            <stop offset="55%" stopColor="#4c7dff" />
            <stop offset="100%" stopColor="#9b6bff" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="9.5" fill="none" stroke="url(#markStroke)" strokeWidth="1.4" />
        <ellipse
          cx="16"
          cy="16"
          rx="14"
          ry="6"
          fill="none"
          stroke="url(#markStroke)"
          strokeWidth="1"
          strokeOpacity="0.55"
          transform="rotate(-34 16 16)"
        />
        <circle cx="25.2" cy="9.6" r="2.1" fill="#c8d8ff" />
      </svg>
    </span>
  );
}
