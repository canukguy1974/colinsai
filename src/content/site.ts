/**
 * Global site configuration: brand, navigation, social links, SEO defaults.
 * Every component reads from here — never hard-code brand strings in JSX.
 */

export const site = {
  name: "Colin's AI",
  domain: "colinsai.com",
  url: "https://colinsai.com",
  tagline: "Built by experience. Expanded by AI.",
  description:
    "Colin's AI explores artificial intelligence through real-world experience, evidence-first investigations, experiments, intelligent systems and practical products.",
  seoTitle: "Colin's AI — Built by Experience. Expanded by AI.",
  email: "hello@colinsai.com",
  foundedYear: 2026,
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const nav: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Investigations", href: "/investigations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "youtube" | "email";
};

/**
 * Placeholder destinations for V1. Replace `href` values with real profiles
 * as they come online — no other file needs to change.
 */
export const socials: readonly SocialLink[] = [
  { label: "GitHub", href: "#", icon: "github" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "Email", href: `mailto:${site.email}`, icon: "email" },
];
