"use client";

import { useMemo, useState } from "react";
import styles from "./MeaningSpace.module.css";

type ContextMode = "finance" | "river";

type ConceptNode = {
  label: string;
  x: number;
  y: number;
  group: ContextMode | "neutral";
};

const concepts: ConceptNode[] = [
  { label: "loan", x: 16, y: 24, group: "finance" },
  { label: "account", x: 26, y: 39, group: "finance" },
  { label: "money", x: 13, y: 56, group: "finance" },
  { label: "mortgage", x: 30, y: 68, group: "finance" },
  { label: "finance", x: 21, y: 80, group: "finance" },
  { label: "river", x: 78, y: 23, group: "river" },
  { label: "shore", x: 68, y: 39, group: "river" },
  { label: "water", x: 84, y: 53, group: "river" },
  { label: "creek", x: 70, y: 69, group: "river" },
  { label: "fishing", x: 82, y: 79, group: "river" },
  { label: "building", x: 47, y: 17, group: "neutral" },
  { label: "edge", x: 53, y: 83, group: "neutral" },
  { label: "place", x: 50, y: 66, group: "neutral" },
];

const sentences: Record<ContextMode, string> = {
  finance: "I deposited my paycheck at the BANK.",
  river: "We sat beside the BANK of the river.",
};

const target: Record<ContextMode, { x: number; y: number }> = {
  finance: { x: 23, y: 48 },
  river: { x: 76, y: 48 },
};

const start = { x: 50, y: 49 };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function vectorFor(x: number, y: number, layer: number) {
  const nx = (x - 50) / 50;
  const ny = (50 - y) / 50;
  const contextual = layer / 8;
  return [
    nx * 0.88 + contextual * 0.09,
    ny * 0.76 - contextual * 0.06,
    (nx - ny) * 0.42 + contextual * 0.31,
  ];
}

function nearestConcepts(x: number, y: number) {
  return concepts
    .map((node) => ({
      ...node,
      distance: Math.hypot(node.x - x, node.y - y),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 4);
}

function Sentence({ text }: { text: string }) {
  const [before, after] = text.split("BANK");
  return (
    <span>
      {before}<strong>BANK</strong>{after}
    </span>
  );
}

export function MeaningSpace({ opened }: { opened: boolean }) {
  const [mode, setMode] = useState<ContextMode | null>(null);
  const [layer, setLayer] = useState(0);
  const [showNumbers, setShowNumbers] = useState(false);

  const progress = layer / 8;
  const activeTarget = mode ? target[mode] : start;
  const bank = {
    x: lerp(start.x, activeTarget.x, progress),
    y: lerp(start.y, activeTarget.y, progress),
  };

  const vector = vectorFor(bank.x, bank.y, layer);
  const nearest = useMemo(() => nearestConcepts(bank.x, bank.y), [bank.x, bank.y]);

  function chooseContext(nextMode: ContextMode) {
    setMode(nextMode);
    setLayer(8);
  }

  const explanationTitle = !mode
    ? "Right now, BANK could mean several things."
    : layer === 0
      ? "You rewound BANK to its ambiguous starting point."
      : "The point moved because the context changed.";

  return (
    <section id="token-chamber" className={styles.scene} aria-labelledby="meaning-space-title">
      <div className={styles.gridPlane} aria-hidden="true" />
      <div className="shell relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-label uppercase text-cyan">01 / Enter meaning space</p>
          <h2 id="meaning-space-title" className="mt-5 text-h2 font-semibold text-ink">
            A vector is an address for meaning.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-muted">
            Don’t memorize that sentence. Move the word yourself and watch what the numbers are doing.
          </p>
        </div>

        <div className={styles.contextChooser} data-open={opened ? "true" : "false"}>
          <div className={styles.chooserTopline}>
            <p className={styles.kicker}>SAME WORD / DIFFERENT CONTEXT</p>
            <p>Pick a sentence. Watch <strong>BANK</strong> move.</p>
          </div>
          <div className={styles.contextButtons} role="group" aria-label="Choose a sentence using the word bank">
            {(Object.keys(sentences) as ContextMode[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.contextButton} ${mode === key ? styles.contextActive : ""}`}
                onClick={() => chooseContext(key)}
              >
                <Sentence text={sentences[key]} />
              </button>
            ))}
          </div>
          <p className={styles.contextHint}>
            The letters in <strong>BANK</strong> stay the same. The surrounding words change which learned relationships become useful.
          </p>
        </div>

        <div className={styles.labGrid}>
          <div className={styles.spacePanel}>
            <div className={styles.panelTopline}>
              <span>MEANING SPACE / HUMAN-VISIBLE PROJECTION</span>
              <span>LAYER {layer.toString().padStart(2, "0")}</span>
            </div>

            <div className={styles.meaningSpace} aria-label="A simplified two-dimensional projection of semantic relationships">
              <div className={`${styles.neighborhood} ${styles.financeField}`} aria-hidden="true">
                <span>FINANCE NEIGHBORHOOD</span>
              </div>
              <div className={`${styles.neighborhood} ${styles.riverField}`} aria-hidden="true">
                <span>RIVER NEIGHBORHOOD</span>
              </div>
              <div className={styles.axisX} aria-hidden="true" />
              <div className={styles.axisY} aria-hidden="true" />

              {concepts.map((node) => {
                const relevant = mode !== null && node.group === mode;
                const proximity = Math.max(0, 1 - Math.hypot(node.x - bank.x, node.y - bank.y) / 45);
                return (
                  <div
                    key={node.label}
                    className={`${styles.conceptNode} ${relevant ? styles.conceptRelevant : ""}`}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      "--proximity": proximity,
                    } as React.CSSProperties}
                  >
                    <i />
                    <span>{node.label}</span>
                  </div>
                );
              })}

              {mode && (
                <svg className={styles.trajectory} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d={`M ${start.x} ${start.y} C 46 ${start.y - 7}, ${target[mode].x + (mode === "finance" ? 10 : -10)} ${target[mode].y + 8}, ${target[mode].x} ${target[mode].y}`}
                  />
                </svg>
              )}

              <div
                className={styles.bankNode}
                style={{ left: `${bank.x}%`, top: `${bank.y}%` }}
                aria-live="polite"
              >
                <span>BANK</span>
                <small>
                  {!mode || layer === 0 ? "AMBIGUOUS" : mode === "finance" ? "FINANCIAL SENSE" : "RIVER SENSE"}
                </small>
              </div>
            </div>

            <div className={styles.layerControl}>
              <div className={styles.layerLabels}>
                <span>EARLY REPRESENTATION</span>
                <strong>
                  {!mode ? "Choose a sentence above" : layer === 0 ? "Mostly ambiguous" : `Context incorporated: ${Math.round(progress * 100)}%`}
                </strong>
                <span>LATER REPRESENTATION</span>
              </div>
              <input
                aria-label="Scrub through a simplified sequence of transformer layers"
                type="range"
                min="0"
                max="8"
                step="1"
                value={layer}
                disabled={!mode}
                onChange={(event) => setLayer(Number(event.target.value))}
              />
              <div className={styles.layerTicks} aria-hidden="true">
                {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
              </div>
              <p className={styles.layerHelp}>
                After choosing a sentence, drag this backward and forward. It stands in for the way representations can become increasingly contextual as information moves through the network.
              </p>
            </div>
          </div>

          <aside className={styles.readoutPanel}>
            <div className={styles.readoutBlock}>
              <p className={styles.readoutLabel}>What are you looking at?</p>
              <h3>{explanationTitle}</h3>
              <p>
                Nearby points stand for patterns the model has learned to treat as related. We’ve flattened an impossible-to-see high-dimensional representation into a map your eyes can follow.
              </p>
            </div>

            <div className={styles.neighborReadout}>
              <p className={styles.readoutLabel}>Nearest concepts right now</p>
              <ol>
                {nearest.map((node, index) => (
                  <li key={node.label}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{node.label}</strong>
                    <i style={{ "--near": `${Math.max(12, 100 - node.distance * 2.1)}%` } as React.CSSProperties} />
                  </li>
                ))}
              </ol>
            </div>

            <button type="button" className={styles.revealButton} onClick={() => setShowNumbers((value) => !value)}>
              {showNumbers ? "Hide the numbers" : "Show me what the point really is"}
            </button>

            <div className={`${styles.numberReveal} ${showNumbers ? styles.numberRevealOpen : ""}`} aria-live="polite">
              <div className={styles.vectorEquation}>
                <span>BANK</span>
                <b>=</b>
                <code>[{vector.map((value) => value.toFixed(2)).join(", ")}, …]</code>
              </div>
              <div className={styles.dimensionBars}>
                {vector.map((value, index) => (
                  <div key={index}>
                    <span>d{index + 1}</span>
                    <i><b style={{ "--value": `${50 + value * 45}%` } as React.CSSProperties} /></i>
                    <strong>{value.toFixed(2)}</strong>
                  </div>
                ))}
              </div>
              <p>
                <strong>Those numbers are the vector.</strong> We turned a tiny slice of it into a visible position so your eyes could follow the idea. A real model uses far more coordinates than we can draw.
              </p>
            </div>
          </aside>
        </div>

        <div className={styles.lessonStrip}>
          <div>
            <span>1</span>
            <p><strong>One token</strong> can start with several plausible relationships.</p>
          </div>
          <div>
            <span>2</span>
            <p><strong>Context</strong> changes which relationships become useful.</p>
          </div>
          <div>
            <span>3</span>
            <p><strong>The vector</strong> is the numerical address representing that state.</p>
          </div>
        </div>

        <div className={styles.truthStrip}>
          <span>VISUAL CHEAT, DISCLOSED:</span>
          <p>
            Real language-model representations are high-dimensional and model-specific. This scene compresses the geometry into two visible dimensions and exposes only three illustrative coordinates. The literal picture is simplified; the relationship between numerical representation, context, and similarity is the idea being demonstrated.
          </p>
        </div>
      </div>
    </section>
  );
}
