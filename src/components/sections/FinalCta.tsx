import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Starfield } from "@/components/visuals/Starfield";
import { finalCta } from "@/content/home";

export function FinalCta() {
  return (
    <Section id={finalCta.id} labelledBy="final-cta-heading" className="pb-24 sm:pb-28">
      <div className="shell">
        <div className="glass relative isolate overflow-hidden rounded-3xl px-7 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          {/* A last look at the sky, dimmer than the hero */}
          <div aria-hidden className="absolute inset-0 -z-10 opacity-60">
            <Starfield density={0.55} />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(85% 130% at 88% 8%, rgba(155,107,255,0.20) 0%, rgba(76,125,255,0.10) 38%, rgba(5,7,14,0) 70%)",
            }}
          />

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <Reveal className="lg:col-span-7">
              <h2 id="final-cta-heading" className="text-h2 font-semibold text-ink">
                {finalCta.heading}
              </h2>
              <p className="mt-4 max-w-[34rem] text-lead text-muted">{finalCta.copy}</p>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button href={finalCta.primaryCta.href}>{finalCta.primaryCta.label}</Button>
                <Button href={finalCta.secondaryCta.href} variant="secondary">
                  {finalCta.secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <p className="mt-12 border-t border-line-soft pt-6 text-[0.875rem] text-faint">
              {finalCta.supportingLine}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
