import type { CardGlyph } from "@/content/home";

/**
 * Line-drawn icons for the "What This Is" cards. Single consistent stroke
 * weight and cap style across the set so they read as one family rather than
 * three borrowed icons.
 */
export function Glyph({ name, className }: { name: CardGlyph; className?: string }) {
  const common = {
    fill: "none",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" role="presentation">
      {name === "flask" && (
        <g stroke="currentColor" {...common}>
          <path d="M16 5v10.4L8.6 29.2A3.4 3.4 0 0 0 11.6 34h16.8a3.4 3.4 0 0 0 3-4.8L24 15.4V5" />
          <path d="M13.5 5h13" />
          <path d="M11.8 24.5h16.4" />
          <circle cx="17.5" cy="28.5" r="1.4" fill="currentColor" stroke="none" opacity="0.9" />
          <circle cx="23" cy="30.5" r="1" fill="currentColor" stroke="none" opacity="0.6" />
        </g>
      )}

      {name === "lens" && (
        <g stroke="currentColor" {...common}>
          <circle cx="17.5" cy="17.5" r="10.5" />
          <path d="M25.2 25.2 34 34" />
          <path d="M12.5 17.5h10M17.5 12.5v10" opacity="0.55" />
        </g>
      )}

      {name === "cube" && (
        <g stroke="currentColor" {...common}>
          <path d="M20 4.5 33.5 12v16L20 35.5 6.5 28V12z" />
          <path d="M6.5 12 20 19.5 33.5 12" />
          <path d="M20 19.5v16" />
        </g>
      )}
    </svg>
  );
}

const ACCENT = {
  blue: { line: "#6d97ff", node: "#8fb0ff", glow: "rgba(76,125,255,0.5)" },
  cyan: { line: "#45e0d2", node: "#7defdf", glow: "rgba(69,224,210,0.45)" },
  violet: { line: "#9b6bff", node: "#c0a0ff", glow: "rgba(155,107,255,0.5)" },
  aurora: { line: "#7ee0c0", node: "#a9c8ff", glow: "rgba(126,224,192,0.4)" },
} as const;

export type Accent = keyof typeof ACCENT;

/**
 * Large signature artwork for the project cards.
 *
 * Each card gets a distinct structure — rings, lattice, spiral, spectrum —
 * but they share stroke weight, node treatment and gradient logic, so the row
 * reads as a set. Drawn from fixed coordinates (no randomness) to keep server
 * and client markup identical.
 */
export function ProjectSignature({
  name,
  accent,
  className,
}: {
  name: CardGlyph;
  accent: Accent;
  className?: string;
}) {
  const c = ACCENT[accent];
  const uid = `${name}-${accent}`;

  return (
    <svg
      viewBox="0 0 260 150"
      className={className}
      aria-hidden="true"
      role="presentation"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={`core-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="45%" stopColor={c.node} stopOpacity="0.5" />
          <stop offset="100%" stopColor={c.line} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`sweep-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.line} stopOpacity="0.05" />
          <stop offset="50%" stopColor={c.line} stopOpacity="0.85" />
          <stop offset="100%" stopColor={c.line} stopOpacity="0.05" />
        </linearGradient>
        <filter id={`blur-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {name === "orbit" && (
        <g>
          <circle cx="130" cy="75" r="34" fill={`url(#core-${uid})`} opacity="0.85" />
          <g fill="none" stroke={c.line} strokeOpacity="0.42" strokeWidth="0.9">
            <circle cx="130" cy="75" r="24" />
            <circle cx="130" cy="75" r="40" strokeOpacity="0.3" />
            <circle cx="130" cy="75" r="56" strokeOpacity="0.2" />
            <ellipse cx="130" cy="75" rx="68" ry="26" transform="rotate(-18 130 75)" strokeOpacity="0.28" />
          </g>
          <circle cx="130" cy="75" r="4" fill="#ffffff" opacity="0.95" />
          <circle cx="186" cy="61" r="2.4" fill={c.node} />
          <circle cx="90" cy="99" r="1.8" fill={c.node} opacity="0.8" />
          <circle cx="130" cy="19" r="1.6" fill={c.node} opacity="0.6" />
        </g>
      )}

      {name === "lattice" && (
        <g>
          <path
            d="M14 96 C 60 96, 74 44, 122 52 C 170 60, 190 106, 246 74"
            fill="none"
            stroke={`url(#sweep-${uid})`}
            strokeWidth="1.6"
          />
          <g stroke={c.line} strokeOpacity="0.3" strokeWidth="0.8" fill="none">
            <path d="M40 88 L78 60 L122 52 L166 66 L212 92" />
            <path d="M78 60 L96 104 L146 96 L166 66" />
            <path d="M40 88 L96 104" />
            <path d="M146 96 L212 92" />
          </g>
          {[
            [14, 96],
            [40, 88],
            [78, 60],
            [96, 104],
            [122, 52],
            [146, 96],
            [166, 66],
            [212, 92],
            [246, 74],
          ].map(([x, y], i) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={i % 3 === 0 ? 3 : 2} fill={c.node} opacity={0.9} />
          ))}
        </g>
      )}

      {name === "spiral" && (
        <g>
          <ellipse cx="130" cy="75" rx="52" ry="42" fill={`url(#core-${uid})`} opacity="0.5" filter={`url(#blur-${uid})`} />
          <g fill="none" stroke={c.line} strokeLinecap="round">
            <path d="M130 75 C 148 58, 178 62, 190 84 C 200 104, 178 124, 152 120" strokeOpacity="0.55" strokeWidth="1.2" />
            <path d="M130 75 C 112 92, 82 88, 70 66 C 60 46, 82 26, 108 30" strokeOpacity="0.55" strokeWidth="1.2" />
            <path d="M130 75 C 152 70, 168 82, 166 96" strokeOpacity="0.3" strokeWidth="0.9" />
            <path d="M130 75 C 108 80, 92 68, 94 54" strokeOpacity="0.3" strokeWidth="0.9" />
          </g>
          <circle cx="130" cy="75" r="5" fill="#ffffff" opacity="0.9" />
          <circle cx="190" cy="84" r="1.8" fill={c.node} />
          <circle cx="70" cy="66" r="1.8" fill={c.node} />
        </g>
      )}

      {name === "waveform" && (
        <g>
          {[
            10, 22, 14, 38, 26, 54, 34, 68, 46, 84, 58, 72, 90, 60, 104, 48, 76, 40, 62, 30, 44, 20, 32, 14, 24,
          ].map((h, i) => {
            const x = 18 + i * 9.2;
            return (
              <line
                key={x}
                x1={x}
                y1={75 - h / 2}
                x2={x}
                y2={75 + h / 2}
                stroke={c.line}
                strokeOpacity={0.28 + (h / 104) * 0.62}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            );
          })}
          <line x1="14" y1="75" x2="246" y2="75" stroke={c.node} strokeOpacity="0.16" strokeWidth="0.8" />
        </g>
      )}
    </svg>
  );
}
