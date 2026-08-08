import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { story } from "@/content/home";
import { storyBlurDataURL } from "@/content/story-blur";

/**
 * The bridge section: machined metal and sparks on one side, network
 * structure on the other. The artwork is a single optimised WebP, lazy
 * loaded, with the seam between the two worlds falling near the centre.
 */
export function Story() {
  return (
    <Section id={story.id} labelledBy="story-heading">
      <div className="shell">
        <div className="glass overflow-hidden rounded-3xl">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[260px] sm:min-h-[340px] lg:min-h-full">
              <Image
                src="/img/story-bridge-1600.webp"
                alt="Abstract composition: a precision-machined steel component throwing sparks that scatter and reassemble into a lattice of glowing nodes in deep space."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder="blur"
                blurDataURL={storyBlurDataURL}
                className="object-cover"
              />
              {/* Blend the artwork into the panel rather than letting it sit
                  in a hard rectangle. */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(5,7,14,0.35) 0%, rgba(5,7,14,0) 40%, rgba(10,16,32,0.55) 92%, rgba(10,16,32,0.95) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-panel lg:hidden"
              />
            </div>

            <div className="p-7 sm:p-10 lg:p-14">
              <Reveal>
                <h2
                  id="story-heading"
                  className="text-h2 max-w-[18ch] font-semibold text-ink"
                >
                  {story.heading}
                </h2>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-7 max-w-[46ch] space-y-4">
                  {story.copy.map((paragraph) => (
                    <p key={paragraph} className="text-[0.9875rem] leading-[1.8] text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
