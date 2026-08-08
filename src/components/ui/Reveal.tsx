"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in seconds, for sequencing siblings. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

/**
 * Section entrance transition.
 *
 * Deliberately "visible-first": the server renders the content with no hiding
 * styles at all, so it is present for search engines, for readers with
 * JavaScript disabled, and for anyone whose IntersectionObserver never fires.
 * Only after mount — and only for elements that are still below the fold, and
 * only when motion is welcome — does it hide the element in order to animate
 * it back in. Nothing can get stuck at opacity 0.
 *
 * Implemented with CSS transitions rather than an animation library: the
 * amplitude here is 18px and one opacity step, which does not justify the
 * runtime cost of a dependency.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Already on screen at load: leave it alone rather than flashing it out.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setPhase("hidden");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn(
        className,
        phase !== "static" &&
          "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        phase === "hidden" && "translate-y-[18px] opacity-0",
      )}
      style={phase === "shown" && delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
