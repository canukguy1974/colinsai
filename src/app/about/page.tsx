import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/layout/PageIntro";
import { story, invitation } from "@/content/home";
import { storyBlurDataURL } from "@/content/story-blur";

export const metadata: Metadata = {
  title: "About",
  description:
    "Decades of solving problems in the physical world, now amplified by AI. Colin's AI is the bridge between hands-on experience and machine intelligence.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Built by experience"
        title={story.heading}
        lede="A personal laboratory for ideas worth testing — run by someone who spent a career finding out whether things actually work."
      />

      <div className="shell pb-24 sm:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="max-w-[52ch] space-y-4">
              {story.copy.map((paragraph) => (
                <p key={paragraph} className="text-[1rem] leading-[1.8] text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 border-l border-line pl-6">
              <p className="text-h3 font-medium text-ink">{invitation.heading}</p>
              <p className="text-gradient-ai mt-1 text-h3 font-medium">{invitation.subheading}</p>
              <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-[1.8] text-muted">
                {invitation.copy}
              </p>
              <p className="mt-4 text-[1rem] italic text-ink">“{invitation.emphasis}”</p>
              <div className="mt-4 space-y-1 text-[0.9375rem] text-muted">
                {invitation.closing.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/img/story-bridge-1200.webp"
                  alt="Abstract composition: a precision-machined steel component throwing sparks that scatter and reassemble into a lattice of glowing nodes in deep space."
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  placeholder="blur"
                  blurDataURL={storyBlurDataURL}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
