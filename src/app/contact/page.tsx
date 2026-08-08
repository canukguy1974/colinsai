import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { finalCta } from "@/content/home";
import { site, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Colin's AI — questions, ideas worth investigating, or things you think deserve a better way.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Say hello"
        title={finalCta.heading}
        lede={finalCta.copy}
      />

      <div className="shell pb-28 sm:pb-36">
        <div className="glass rounded-2xl p-8 sm:p-12">
          <h2 className="text-h3 font-semibold text-ink">Get in touch</h2>
          <p className="mt-3 max-w-[46rem] text-[0.9875rem] leading-[1.8] text-muted">
            The fastest way to reach me is email. Questions, ideas worth investigating, things you
            think deserve a better way — all welcome.
          </p>

          <div className="mt-8">
            <Button href={`mailto:${site.email}`}>{site.email}</Button>
          </div>

          <div className="mt-12 border-t border-line-soft pt-8">
            <h3 className="text-label font-medium uppercase text-faint">Elsewhere</h3>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {socials
                .filter((s) => s.icon !== "email")
                .map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="text-[0.9375rem] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <p className="mt-10 text-[0.875rem] text-faint">{finalCta.supportingLine}</p>
        </div>
      </div>
    </>
  );
}
