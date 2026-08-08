import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/visuals/Glyph";
import { whatThisIs } from "@/content/home";

const ICON_TINT = ["text-blue", "text-cyan", "text-violet"] as const;

export function WhatThisIs() {
  return (
    <Section id={whatThisIs.id} labelledBy="what-this-is-heading">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading id="what-this-is-heading">{whatThisIs.heading}</SectionHeading>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <p className="text-h3 font-medium text-ink">{whatThisIs.intro}</p>
            <p className="mt-4 max-w-[38rem] text-[1rem] leading-[1.75] text-muted">
              {whatThisIs.supporting}
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-3 md:gap-6">
          {whatThisIs.cards.map((card, i) => (
            <Reveal as="li" key={card.title} delay={0.06 * i} className="h-full">
              <article
                className={[
                  "glass group relative flex h-full flex-col rounded-2xl p-7 sm:p-8",
                  "transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--color-blue)_42%,var(--color-line))]",
                  "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_30px_70px_-40px_rgba(76,125,255,0.75)]",
                ].join(" ")}
              >
                {/* Corner light that warms on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(80% 60% at 12% 0%, rgba(109,151,255,0.12) 0%, transparent 62%)",
                  }}
                />

                <span
                  className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-white/[0.03] ${ICON_TINT[i]}`}
                >
                  <Glyph name={card.glyph} className="h-7 w-7" />
                </span>

                <h3 className="relative mt-6 text-h3 font-semibold text-ink">{card.title}</h3>
                <p className="relative mt-3.5 text-[0.9375rem] leading-[1.75] text-muted">
                  {card.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
