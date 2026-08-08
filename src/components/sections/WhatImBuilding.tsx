import Link from "next/link";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectSignature } from "@/components/visuals/Glyph";
import { building } from "@/content/home";

/** Per-accent hover treatment, kept as whole class strings for Tailwind's scanner. */
const ACCENT_RING: Record<string, string> = {
  blue: "group-hover:border-[color-mix(in_oklab,#4c7dff_45%,var(--color-line))] group-hover:shadow-[0_30px_80px_-46px_rgba(76,125,255,0.9)]",
  cyan: "group-hover:border-[color-mix(in_oklab,#45e0d2_38%,var(--color-line))] group-hover:shadow-[0_30px_80px_-46px_rgba(69,224,210,0.7)]",
  violet:
    "group-hover:border-[color-mix(in_oklab,#9b6bff_45%,var(--color-line))] group-hover:shadow-[0_30px_80px_-46px_rgba(155,107,255,0.85)]",
  aurora:
    "group-hover:border-[color-mix(in_oklab,#7ee0c0_38%,var(--color-line))] group-hover:shadow-[0_30px_80px_-46px_rgba(126,224,192,0.6)]",
};

const ACCENT_TEXT: Record<string, string> = {
  blue: "text-blue-bright",
  cyan: "text-cyan",
  violet: "text-violet",
  aurora: "text-[#7ee0c0]",
};

export function WhatImBuilding() {
  return (
    <Section id={building.id} labelledBy="building-heading">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading id="building-heading">{building.heading}</SectionHeading>
          </Reveal>
          <Reveal delay={0.08} className="md:pb-2 md:text-right">
            <Eyebrow>{building.eyebrow}</Eyebrow>
            <div className="mt-3 text-[0.9375rem] leading-[1.7] text-muted">
              {building.supporting.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {building.projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={0.05 * i} className="h-full">
              <article className="group relative h-full">
                <Link
                  href={project.cta.href}
                  className={[
                    "glass flex h-full flex-col rounded-2xl p-6 sm:p-7",
                    "transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    "group-hover:-translate-y-1.5",
                    ACCENT_RING[project.accent],
                  ].join(" ")}
                >
                  <h3 className="text-h3 font-semibold text-ink">{project.title}</h3>

                  {/* Signature artwork — unique structure per project, shared language */}
                  <div className="relative mt-5 overflow-hidden rounded-xl border border-line-soft bg-[radial-gradient(120%_100%_at_50%_0%,rgba(16,26,48,0.8),rgba(7,11,22,0.9))]">
                    <ProjectSignature
                      name={project.glyph}
                      accent={project.accent}
                      className="h-[124px] w-full opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>

                  {project.headline ? (
                    <p className="mt-6 text-[1rem] font-medium leading-[1.55] tracking-[-0.015em] text-ink">
                      {project.headline}
                    </p>
                  ) : null}

                  <div className="mt-4 flex-1 space-y-3">
                    {project.copy.map((line) => (
                      <p key={line} className="text-[0.9375rem] leading-[1.7] text-muted">
                        {line}
                      </p>
                    ))}
                    {project.emphasis ? (
                      <p className="text-[0.9375rem] italic leading-[1.7] text-dim">
                        {project.emphasis}
                      </p>
                    ) : null}
                  </div>

                  <span
                    className={`mt-7 inline-flex items-center gap-1.5 text-[0.875rem] font-medium ${ACCENT_TEXT[project.accent]}`}
                  >
                    {project.cta.label}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
