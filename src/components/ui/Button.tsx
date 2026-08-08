import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  className?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full " +
  "px-6 py-3.5 text-[0.9375rem] font-medium tracking-[-0.01em] " +
  "transition-[transform,box-shadow,background-color,border-color] duration-300 " +
  "ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform " +
  "hover:-translate-y-0.5 active:translate-y-0";

const variants = {
  primary: cn(
    "text-white",
    "bg-[linear-gradient(105deg,var(--color-blue)_0%,#6366f1_48%,var(--color-violet)_100%)]",
    "shadow-[0_10px_30px_-10px_rgba(76,125,255,0.7),inset_0_1px_0_rgba(255,255,255,0.22)]",
    "hover:shadow-[0_18px_44px_-12px_rgba(122,110,255,0.85),inset_0_1px_0_rgba(255,255,255,0.28)]",
  ),
  secondary: cn(
    "text-ink border border-line bg-white/[0.02]",
    "hover:border-[color-mix(in_oklab,var(--color-blue)_55%,transparent)]",
    "hover:bg-white/[0.05]",
    "hover:shadow-[0_0_0_1px_rgba(76,125,255,0.12),0_16px_40px_-24px_rgba(76,125,255,0.7)]",
  ),
} as const;

/** Anchor-styled CTA. Internal and hash links both route through next/link. */
export function Button({ href, children, variant = "primary", icon, className }: ButtonProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {icon ? (
        <span aria-hidden className="shrink-0 opacity-90">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </Link>
  );
}
