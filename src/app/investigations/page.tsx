import type { Metadata } from "next";
import { ComingSoon, PageIntro } from "@/components/layout/PageIntro";
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

      <ComingSoon note="No investigations have been published yet. The first write-ups are in progress — each one will show the question, the sources consulted, what the evidence supports, what it does not, and what would change the conclusion." />
    </>
  );
}
