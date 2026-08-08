import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { invitation } from "@/content/home";

/**
 * A quiet, centred moment between the density of the project grid and the
 * final call to action. Nearly all negative space by design.
 */
export function Invitation() {
  return (
    <Section id={invitation.id} labelledBy="invitation-heading" className="overflow-hidden">
      {/* Single soft light source behind the text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[520px] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(46% 50% at 50% 50%, rgba(76,125,255,0.13) 0%, rgba(155,107,255,0.07) 42%, rgba(5,7,14,0) 72%)",
        }}
      />

      <div className="shell">
        <div className="mx-auto max-w-[46rem] text-center">
          <Reveal>
            <h2 id="invitation-heading" className="text-h2 font-semibold text-ink">
              {invitation.heading}
            </h2>
            <p className="mt-3 text-h2 font-semibold text-gradient-ai">{invitation.subheading}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-9 max-w-[40rem] text-[1rem] leading-[1.8] text-muted">
              {invitation.copy}
            </p>

            <p className="mt-8 text-h3 font-medium italic text-ink">
              “{invitation.emphasis}”
            </p>

            <div className="mt-8 space-y-1 text-lead text-muted">
              {invitation.closing.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
