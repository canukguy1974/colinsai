"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook. Returns `false` on the server and during the
 * first client render, then settles after mount — so nothing that depends on
 * it may affect the initial HTML.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** True when the visitor has asked the OS to reduce motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * True on desktop-class viewports. Used to keep expensive canvas work off
 * phones entirely rather than merely scaling it down.
 */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 768px)");
}
