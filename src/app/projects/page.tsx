import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { ProjectSignature } from "@/components/visuals/Glyph";
import { building } from "@/content/home";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Future OS, AI experiments, investigations and content — the things currently being built and tested at Colin's AI.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Exploring. Building. Shipping."
        title="Projects"
        lede="The work in progress. Each of these is an open line of enquiry rather than a finished product — detail pages will land here as they are ready."
      />

      <div className="shell pb-28 sm:pb-36">
        <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {building.projects.map((project) => (
            <li key={project.slug}>
              <article className="glass group flex h-full flex-col rounded-2xl p-7 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--color-blue)_40%,var(--color-line))]">
                <h2 className="text-h3 font-semibold text-ink">{project.title}</h2>

                <div className="mt-5 overflow-hidden rounded-xl border border-line-soft bg-[radial-gradient(120%_100%_at_50%_0%,rgba(16,26,48,0.8),rgba(7,11,22,0.9))]">
                  <ProjectSignature
                    name={project.glyph}
                    accent={project.accent}
                    className="h-[132px] w-full opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                {project.headline ? (
                  <p className="mt-6 text-[1rem] font-medium leading-[1.55] text-ink">
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
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[0.9375rem] text-dim">
          Want to hear when something ships?{" "}
          <Link href="/contact" className="text-blue-bright underline-offset-4 hover:underline">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </>
  );
}
