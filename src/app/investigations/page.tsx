import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { howIWork } from "@/content/home";

export const metadata: Metadata = {
  title: "Investigations",
  description:
    "Evidence-first investigations: start with the question, find the strongest evidence available, separate what we know from what we suspect, and change the conclusion when the evidence changes.",
  alternates: { canonical: "/investigations" },
};

export default function InvestigationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Evidence first"
        title="Investigations"
        lede="Some things deserve more than a headline, a Reddit comment or somebody else's conclusion. We collect the evidence, challenge assumptions and see where it actually leads."
      />

      <div className="shell pb-16">
        <ol className="grid gap-6 border-t border-line-soft pt-12 sm:grid-cols-3">
          {howIWork.steps.map((step) => (
            <li key={step.number}>
              <p className="font-mono text-[0.8125rem] tracking-widest text-blue-bright">
                {step.number}
              </p>
              <h2 className="mt-3 text-h3 font-semibold text-ink">{step.title}</h2>
              <div className="mt-3 space-y-1.5">
                {step.copy.map((line) => (
                  <p key={line} className="text-[0.9375rem] leading-[1.7] text-muted">
                    {line}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <section className="border-t border-line-soft bg-abyss/60 py-20 sm:py-24">
        <div className="shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-label uppercase text-cyan">Published experiments</p>
              <h2 className="mt-3 text-h2 font-semibold text-ink">Open the evidence.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-dim">
              These are built to be explored, not merely read. Interact with the mechanism and decide what the evidence actually supports.
            </p>
          </div>

          <Link
            href="/investigations/black-box"
            className="group relative block overflow-hidden rounded-[1.5rem] border border-line bg-panel/70 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue/60 sm:p-9"
          >
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-blue/20 transition duration-500 group-hover:scale-110" />
            <div className="pointer-events-none absolute -right-3 -top-10 h-48 w-48 rounded-full border border-violet/20" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-label uppercase text-blue-bright">Investigation 001</span>
                  <span className="rounded-full border border-cyan/30 bg-cyan/5 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-cyan">
                    Interactive
                  </span>
                </div>
                <h3 className="mt-5 max-w-3xl text-h2 font-semibold text-ink">
                  The Black Box: <span className="text-gradient-ai">How AI actually works.</span>
                </h3>
                <p className="mt-5 max-w-2xl text-lead text-muted">
                  Start with an AI that sounds afraid. Then open the response, break it into tokens, and compete with the machine at predicting what comes next.
                </p>
              </div>

              <span className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.12em] text-cyan">
                Enter the machine
                <span aria-hidden="true" className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
