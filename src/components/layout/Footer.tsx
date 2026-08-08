import Link from "next/link";
import { nav, site, socials, type SocialLink } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-abyss">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">
              {site.name}
            </p>
            <p className="mt-2 text-[0.9375rem] text-dim">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <h2 className="text-label font-medium uppercase text-faint">Navigate</h2>
            {/* Column-major so each column reads in nav order top to bottom. */}
            <ul className="mt-2 grid grid-flow-col grid-rows-3 gap-x-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    // py keeps the touch target at ~44px without visually
                    // loosening the list.
                    className="inline-block py-2.5 text-[0.9375rem] text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="text-label font-medium uppercase text-faint">Elsewhere</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-dim transition-[color,border-color,background-color] duration-300 hover:border-[color-mix(in_oklab,var(--color-blue)_50%,transparent)] hover:bg-white/[0.04] hover:text-ink"
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-line-soft pt-6 text-[0.8125rem] text-faint">
          © {site.foundedYear} {site.name}.
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  const props = {
    viewBox: "0 0 20 20",
    className: "h-[18px] w-[18px]",
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "github":
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            d="M10 1.6a8.4 8.4 0 0 0-2.66 16.37c.42.08.57-.18.57-.4v-1.5c-2.34.5-2.83-1.01-2.83-1.01-.38-.98-.94-1.24-.94-1.24-.76-.53.06-.52.06-.52.85.06 1.29.87 1.29.87.75 1.29 1.98.92 2.46.7.08-.55.3-.92.53-1.13-1.87-.21-3.83-.94-3.83-4.17 0-.92.33-1.67.87-2.26-.09-.21-.38-1.07.08-2.23 0 0 .71-.23 2.31.86a7.97 7.97 0 0 1 4.21 0c1.6-1.09 2.3-.86 2.3-.86.47 1.16.18 2.02.09 2.23.54.59.86 1.34.86 2.26 0 3.24-1.96 3.95-3.84 4.16.3.26.57.78.57 1.57v2.33c0 .23.15.49.58.4A8.4 8.4 0 0 0 10 1.6Z"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            d="M4.6 2.9a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM3.1 7.6h3v9.5h-3zM8.4 7.6h2.87v1.3h.04c.4-.72 1.38-1.48 2.83-1.48 3.03 0 3.59 1.9 3.59 4.38v5.3h-3v-4.7c0-1.12-.02-2.56-1.6-2.56-1.6 0-1.84 1.22-1.84 2.48v4.78h-2.9z"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg {...props}>
          <path
            fill="currentColor"
            d="M18.3 6.2a2.15 2.15 0 0 0-1.5-1.53C15.47 4.3 10 4.3 10 4.3s-5.47 0-6.8.37A2.15 2.15 0 0 0 1.7 6.2C1.34 7.55 1.34 10 1.34 10s0 2.45.36 3.8c.2.74.78 1.32 1.5 1.53 1.33.37 6.8.37 6.8.37s5.47 0 6.8-.37a2.15 2.15 0 0 0 1.5-1.53c.36-1.35.36-3.8.36-3.8s0-2.45-.36-3.8ZM8.25 12.6V7.4L12.75 10z"
          />
        </svg>
      );
    case "email":
      return (
        <svg {...props}>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
            d="M2.6 5.2h14.8v9.6H2.6z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.9 5.6 7.1 5 7.1-5"
          />
        </svg>
      );
  }
}
