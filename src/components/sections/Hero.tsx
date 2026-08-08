import { HeroVisual } from "@/components/visuals/HeroVisual";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20 sm:pt-28 lg:min-h-[92vh] lg:pt-24">
      <HeroVisual />

      {/* Legibility scrims. Below lg the copy sits on top of the artwork, so
          the wash runs vertically and is heavier; from lg the artwork moves to
          its own half and a horizontal falloff is enough to keep the headline
          crisp without flattening the composition. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[1] lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,7,14,0.92) 0%, rgba(5,7,14,0.88) 45%, rgba(5,7,14,0.80) 75%, rgba(5,7,14,0.72) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-[1] hidden lg:block"
        style={{
          background:
            "linear-gradient(100deg, rgba(5,7,14,0.94) 0%, rgba(5,7,14,0.86) 34%, rgba(5,7,14,0.35) 58%, rgba(5,7,14,0) 78%)",
        }}
      />

      <div className="shell relative w-full">
        {/* Measure widens with the display size so "Expanded by AI." always
            holds a single line — the accent losing its own line breaks the
            whole composition. */}
        <div className="max-w-[38rem] lg:max-w-[44rem] xl:max-w-[49rem]">
          <p className="text-label font-medium uppercase text-dim">{hero.eyebrow}</p>

          <h1 className="mt-6 text-display font-semibold text-ink">
            <span className="block [text-wrap:balance]">{hero.headline.lead}</span>
            <span className="text-gradient-ai mt-1 block">{hero.headline.accent}</span>
          </h1>

          <p className="mt-7 max-w-[34rem] text-lead text-muted">{hero.subheadline}</p>

          <p className="mt-5 max-w-[33rem] text-[0.9875rem] leading-[1.75] text-dim">
            {hero.paragraph}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href={hero.primaryCta.href} icon={<ArrowGlyph />}>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary" icon={<SignalGlyph />}>
              {hero.secondaryCta.label}
            </Button>
          </div>

          <p className="mt-10 max-w-[31rem] border-l border-line pl-4 text-[0.875rem] leading-[1.7] text-faint">
            {hero.supportingLine}
          </p>
        </div>
      </div>

      <ScrollHint />
    </section>
  );
}

function ArrowGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <path
        d="M2.5 8.5 13 3 8.4 13.5 7 9.9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SignalGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <path
        d="M3.6 3.6a6.2 6.2 0 0 0 0 8.8M12.4 3.6a6.2 6.2 0 0 1 0 8.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

/** Small, quiet affordance that there is more page below. */
function ScrollHint() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-7 hidden justify-center sm:flex"
    >
      <svg viewBox="0 0 24 14" className="h-3.5 w-6 text-faint" role="presentation">
        <path
          d="M2 2l10 10L22 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
