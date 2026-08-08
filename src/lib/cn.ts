/** Minimal class-name joiner — avoids pulling in clsx for a two-line utility. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
