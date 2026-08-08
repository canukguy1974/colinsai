import type { ReactNode } from "react";
import { Starfield } from "@/components/visuals/Starfield";

/**
 * Shared masthead for the secondary routes. Keeps the cosmic register of the
 * homepage without re-running the full hero system on every page.
 */
export function PageIntro({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-70">
        <Starfield density={0.5} />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 70% at 70% -10%, rgba(76,125,255,0.18) 0%, rgba(155,107,255,0.08) 42%, rgba(5,7,14,0) 72%)",
        }}
      />

      <div className="shell">
        <p className="text-label font-medium uppercase text-dim">{eyebrow}</p>
        <h1 className="mt-5 max-w-[20ch] text-display font-semibold text-ink">{title}</h1>
        <p className="mt-6 max-w-[44rem] text-lead text-muted">{lede}</p>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}

/**
 * Honest placeholder for routes whose content is still being written. States
 * plainly that nothing is published yet rather than inventing entries.
 */
export function ComingSoon({ note }: { note: string }) {
  return (
    <div className="shell pb-28 sm:pb-36">
      <div className="glass flex flex-col items-start gap-4 rounded-2xl p-8 sm:p-10">
        <span
          aria-hidden
          className="inline-flex h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_2px_rgba(69,224,210,0.6)]"
        />
        <p className="max-w-[46rem] text-[0.9875rem] leading-[1.8] text-muted">{note}</p>
      </div>
    </div>
  );
}
