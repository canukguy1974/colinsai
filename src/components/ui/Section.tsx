import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Draws the shared hairline that separates major bands of the page. */
  divided?: boolean;
  labelledBy?: string;
};

export function Section({ id, children, className, divided = true, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative scroll-mt-24",
        divided && "border-t border-line-soft",
        "py-20 sm:py-28 lg:py-36",
        className,
      )}
    >
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  level?: 2 | 3;
};

export function SectionHeading({ id, children, className, level = 2 }: SectionHeadingProps) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag
      id={id}
      className={cn("rule-accent text-h2 font-semibold text-ink", className)}
    >
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-label font-medium uppercase text-dim",
        className,
      )}
    >
      {children}
    </p>
  );
}
