"use client";

import { useEffect, useRef } from "react";
import { useIsDesktop, usePrefersReducedMotion } from "@/lib/useMediaQuery";

type Star = {
  x: number;
  y: number;
  r: number;
  /** Base opacity; twinkle modulates around it. */
  a: number;
  /** Twinkle phase and speed — most stars are nearly static. */
  phase: number;
  speed: number;
  hue: "white" | "blue" | "violet";
};

const TINTS: Record<Star["hue"], string> = {
  white: "255,255,255",
  blue: "150,185,255",
  violet: "185,160,255",
};

/**
 * Restrained starfield.
 *
 * Design intent: cosmic *depth*, not confetti. Stars are small, mostly dim,
 * and only a handful twinkle perceptibly at any moment.
 *
 * Performance contract:
 *  - phones render nothing (a CSS gradient sky stands in) — canvas never mounts
 *  - the loop pauses when the canvas scrolls out of view or the tab is hidden
 *  - reduced-motion paints exactly one static frame, then stops
 *  - capped at device pixel ratio 2
 */
export function Starfield({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!isDesktop) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let running = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(((width * height) / 14000) * density);
      stars = Array.from({ length: count }, () => {
        const roll = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() < 0.9 ? Math.random() * 0.7 + 0.3 : Math.random() * 0.9 + 1,
          a: Math.random() * 0.5 + 0.12,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() < 0.25 ? Math.random() * 0.5 + 0.25 : 0,
          hue: roll > 0.9 ? "violet" : roll > 0.72 ? "blue" : "white",
        } satisfies Star;
      });
    };

    const paint = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const twinkle = s.speed === 0 ? 1 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed + s.phase);
        ctx.globalAlpha = Math.min(1, s.a * twinkle);
        ctx.fillStyle = `rgb(${TINTS[s.hue]})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const frame = (t: number) => {
      paint(t);
      if (visible && running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    seed();
    paint(0);
    if (!reduced) start();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let resizeTimer: number | undefined;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        seed();
        paint(performance.now());
      }, 150);
    });
    ro.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isDesktop, reduced, density]);

  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
