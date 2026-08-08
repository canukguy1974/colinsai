import { Starfield } from "./Starfield";

/**
 * The hero's cosmic intelligence system.
 *
 * Built entirely from SVG + CSS so it costs no image bytes, scales perfectly,
 * and can be re-coloured from tokens. Composition, back to front:
 *
 *   1. nebula wash (CSS radial gradients)
 *   2. starfield (canvas, desktop only)
 *   3. planetary limb — a curved horizon with a warm terminator highlight
 *   4. orbital geometry — three ellipses on slow, near-imperceptible rotation
 *   5. signal lattice — nodes and vector traces suggesting structure, not data
 *   6. decorative instrumentation — labels only, never fabricated readouts
 *
 * Everything here is aria-hidden: it is atmosphere, and carries no meaning a
 * screen reader needs.
 */
export function HeroVisual() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* 1 — nebula depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 42%, rgba(58,74,168,0.30) 0%, rgba(28,32,84,0.16) 34%, rgba(5,7,14,0) 66%)," +
            "radial-gradient(70% 60% at 96% 22%, rgba(155,107,255,0.20) 0%, rgba(5,7,14,0) 62%)," +
            "radial-gradient(55% 50% at 60% 90%, rgba(69,224,210,0.09) 0%, rgba(5,7,14,0) 60%)",
        }}
      />

      {/* 2 — stars */}
      <div className="absolute inset-0 opacity-90">
        <Starfield density={1} />
      </div>
      {/* Mobile stand-in for the canvas: a still, very faint sky */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 18% 24%, rgba(255,255,255,0.55) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 72% 16%, rgba(190,205,255,0.5) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 44% 62%, rgba(255,255,255,0.35) 50%, transparent 51%)," +
            "radial-gradient(1.4px 1.4px at 86% 54%, rgba(200,180,255,0.45) 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 30% 82%, rgba(255,255,255,0.3) 50%, transparent 51%)",
        }}
      />

      {/* 3–5 — the system itself, anchored to the right half on desktop */}
      {/* Below lg the artwork sits behind the copy rather than beside it, so
          it is dialled back and the type keeps the foreground. */}
      <div className="absolute inset-y-0 right-[-28%] w-[150%] opacity-55 sm:right-[-14%] sm:w-[110%] sm:opacity-70 lg:inset-y-[-10%] lg:right-[-6%] lg:w-[62%] lg:opacity-100">
        <svg
          viewBox="0 0 800 800"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          role="presentation"
        >
          <defs>
            {/* Planet body: dark, with atmosphere leaking from the limb */}
            <radialGradient id="planetBody" cx="0.62" cy="0.38" r="0.75">
              <stop offset="0%" stopColor="#16224a" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#0a1024" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#05070e" stopOpacity="1" />
            </radialGradient>

            <linearGradient id="limbGlow" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#45e0d2" stopOpacity="0.55" />
              <stop offset="38%" stopColor="#4c7dff" stopOpacity="0.9" />
              <stop offset="62%" stopColor="#cbd8ff" stopOpacity="1" />
              <stop offset="82%" stopColor="#9b6bff" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#9b6bff" stopOpacity="0.15" />
            </linearGradient>

            <linearGradient id="orbitStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4c7dff" stopOpacity="0" />
              <stop offset="35%" stopColor="#6d97ff" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#9b6bff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#9b6bff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="traceStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#45e0d2" stopOpacity="0" />
              <stop offset="50%" stopColor="#45e0d2" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#45e0d2" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="hotspot" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ffc79a" stopOpacity="0.55" />
              <stop offset="26%" stopColor="#ff9d5c" stopOpacity="0.22" />
              <stop offset="62%" stopColor="#c96a3a" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#c96a3a" stopOpacity="0" />
            </radialGradient>

            <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="14" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="tightGlow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="3.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 3 — planetary limb */}
          <g>
            <circle cx="560" cy="470" r="330" fill="url(#planetBody)" />
            <circle
              cx="560"
              cy="470"
              r="330"
              fill="none"
              stroke="url(#limbGlow)"
              strokeWidth="2.25"
              filter="url(#softGlow)"
            />
            {/* Terminator hotspot — the single warm note in the composition.
                Painted with a radial gradient rather than a blur filter: a
                filter region would clip into a visible rectangle here. */}
            <circle cx="330" cy="285" r="120" fill="url(#hotspot)" />
            <circle cx="330" cy="285" r="7" fill="#ffe4cb" opacity="0.75" />
            {/* Atmospheric band just inside the limb */}
            <circle
              cx="560"
              cy="470"
              r="318"
              fill="none"
              stroke="#4c7dff"
              strokeOpacity="0.14"
              strokeWidth="10"
            />
          </g>

          {/* 4 — orbital geometry, rotating slowly about the planet centre */}
          <g
            style={{
              transformOrigin: "560px 470px",
              animation: "drift-slow 240s linear infinite",
            }}
          >
            <ellipse
              cx="560"
              cy="470"
              rx="418"
              ry="150"
              fill="none"
              stroke="url(#orbitStroke)"
              strokeWidth="1"
              transform="rotate(-24 560 470)"
            />
            <ellipse
              cx="560"
              cy="470"
              rx="366"
              ry="252"
              fill="none"
              stroke="url(#orbitStroke)"
              strokeWidth="1"
              transform="rotate(18 560 470)"
              opacity="0.7"
            />
          </g>
          <g
            style={{
              transformOrigin: "560px 470px",
              animation: "drift-slow 420s linear infinite reverse",
            }}
          >
            <ellipse
              cx="560"
              cy="470"
              rx="452"
              ry="330"
              fill="none"
              stroke="url(#orbitStroke)"
              strokeWidth="1"
              transform="rotate(-58 560 470)"
              opacity="0.5"
            />
            {/* A single body on the outer orbit */}
            <circle cx="180" cy="330" r="3" fill="#9b6bff" filter="url(#tightGlow)" />
          </g>

          {/* 5 — signal lattice: nodes joined by vector lines */}
          <g className="hidden sm:block">
            <g
              stroke="#6d97ff"
              strokeOpacity="0.28"
              strokeWidth="0.9"
              fill="none"
              strokeLinecap="round"
            >
              <path d="M96 214 L212 268 L318 196 L436 246" />
              <path d="M212 268 L246 392 L372 430" />
              <path d="M246 392 L128 452 L164 566" />
              <path d="M372 430 L436 246" />
              <path d="M164 566 L300 604 L372 430" />
              <path d="M300 604 L446 660" />
            </g>

            {[
              [96, 214],
              [212, 268],
              [318, 196],
              [436, 246],
              [246, 392],
              [372, 430],
              [128, 452],
              [164, 566],
              [300, 604],
              [446, 660],
            ].map(([x, y], i) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r={i % 4 === 0 ? 3 : 1.9}
                fill={i % 3 === 0 ? "#45e0d2" : "#8fb0ff"}
                filter="url(#tightGlow)"
                style={{
                  animation: `pulse-node ${7 + (i % 5) * 1.6}s ease-in-out ${i * 0.45}s infinite`,
                }}
              />
            ))}

            {/* Signal traces sweeping across the lattice */}
            <path
              d="M40 640 C 220 560, 300 700, 520 600"
              fill="none"
              stroke="url(#traceStroke)"
              strokeWidth="1.2"
              strokeDasharray="6 14"
              style={{ animation: "trace-dash 26s linear infinite" }}
            />
            <path
              d="M60 150 C 240 90, 400 190, 620 120"
              fill="none"
              stroke="url(#traceStroke)"
              strokeWidth="1"
              strokeDasharray="4 18"
              opacity="0.7"
              style={{ animation: "trace-dash 34s linear infinite" }}
            />
          </g>
        </svg>
      </div>

      {/* 6 — decorative instrumentation (desktop only, labels without readouts) */}
      <div className="pointer-events-none absolute right-6 top-[18%] hidden w-[168px] flex-col gap-3 xl:flex">
        <InstrumentPanel label="Signal">
          <svg viewBox="0 0 140 40" className="h-10 w-full" role="presentation">
            <path
              d="M0 22 L10 22 L14 12 L18 30 L23 8 L28 26 L33 18 L40 22 L52 22 L56 14 L60 28 L65 20 L72 22 L86 22 L90 10 L95 32 L100 16 L106 24 L112 22 L140 22"
              fill="none"
              stroke="#8fb0ff"
              strokeOpacity="0.75"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          </svg>
        </InstrumentPanel>

        <InstrumentPanel label="Orbit">
          <svg viewBox="0 0 140 92" className="h-[74px] w-full" role="presentation">
            <g
              fill="none"
              stroke="#6d97ff"
              strokeOpacity="0.35"
              strokeWidth="0.8"
              style={{ transformOrigin: "70px 46px", animation: "drift-slow 160s linear infinite" }}
            >
              <circle cx="70" cy="46" r="38" />
              <circle cx="70" cy="46" r="26" />
              <circle cx="70" cy="46" r="14" />
              <line x1="32" y1="46" x2="108" y2="46" strokeDasharray="2 6" />
              <line x1="70" y1="8" x2="70" y2="84" strokeDasharray="2 6" />
            </g>
            <circle cx="70" cy="46" r="2.6" fill="#ffd9b8" />
            <circle cx="96" cy="46" r="1.8" fill="#45e0d2" />
            <circle cx="70" cy="20" r="1.6" fill="#9b6bff" />
          </svg>
        </InstrumentPanel>
      </div>

      {/* Bottom fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
    </div>
  );
}

function InstrumentPanel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-lg px-3 pb-2 pt-2.5">
      <p className="text-label font-medium uppercase text-faint">{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
