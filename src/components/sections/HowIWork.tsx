import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { howIWork } from "@/content/home";

/**
 * The Question → Test → Build loop.
 *
 * Deliberately not a boxes-and-arrows process diagram: the three steps sit on
 * a single continuous orbital path that curves back beneath them, so the loop
 * is implied by the geometry rather than announced by chevrons.
 */
export function HowIWork() {
  return (
    <Section id={howIWork.id} labelledBy="how-i-work-heading">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading id="how-i-work-heading">{howIWork.heading}</SectionHeading>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="flex items-center gap-3 text-[0.9375rem] text-dim md:pb-2"
              aria-label={howIWork.concept.join(", then ")}
            >
              {howIWork.concept.map((word, i) => (
                <span key={word} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span aria-hidden className="text-faint">
                      →
                    </span>
                  ) : null}
                  <span className="text-muted">{word}</span>
                </span>
              ))}
              <span aria-hidden className="text-faint">
                ↺
              </span>
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 sm:mt-20">
          <LoopPath />

          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
            {howIWork.steps.map((step, i) => (
              <Reveal as="li" key={step.number} delay={0.08 * i}>
                <div className="relative">
                  {/* Node marker sitting on the path */}
                  <span
                    aria-hidden
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-abyss shadow-[0_0_0_6px_rgba(5,7,14,0.9)]"
                  >
                    <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(109,151,255,0.28),transparent_65%)]" />
                    <span className="relative font-mono text-[0.8125rem] tracking-widest text-blue-bright">
                      {step.number}
                    </span>
                  </span>

                  <h3 className="mt-6 text-h3 font-semibold text-ink">{step.title}</h3>

                  <div className="mt-3.5 space-y-1.5">
                    {step.copy.map((line) => (
                      <p key={line} className="text-[0.9375rem] leading-[1.7] text-muted">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/** Continuous arc through the three step nodes, closing back on itself. */
function LoopPath() {
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox="0 0 1200 300"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -top-6 left-0 hidden h-[320px] w-full md:block"
    >
      <defs>
        <linearGradient id="loopStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4c7dff" stopOpacity="0" />
          <stop offset="18%" stopColor="#4c7dff" stopOpacity="0.5" />
          <stop offset="52%" stopColor="#6d97ff" stopOpacity="0.45" />
          <stop offset="86%" stopColor="#9b6bff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#9b6bff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Forward arc, cresting between the nodes */}
      <path
        d="M40 44 C 300 -22, 380 96, 600 44 C 820 -8, 900 96, 1160 44"
        fill="none"
        stroke="url(#loopStroke)"
        strokeWidth="1.1"
      />

      {/* Return path — the "then repeat" */}
      <path
        d="M1160 44 C 1196 150, 1120 262, 880 268 L 320 268 C 90 268, 24 160, 40 44"
        fill="none"
        stroke="url(#loopStroke)"
        strokeWidth="1"
        strokeDasharray="3 12"
        strokeOpacity="0.7"
        style={{ animation: "trace-dash 40s linear infinite" }}
      />
    </svg>
  );
}
