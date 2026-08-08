"use client";

import { useMemo, useState } from "react";
import styles from "./AttentionChamber.module.css";

type ContextMode = "finance" | "river";
type Phase = 1 | 2 | 3;

type TokenSignal = {
  token: string;
  weight: number;
  x: number;
  y: number;
};

const scenes: Record<ContextMode, { sentence: string; signals: TokenSignal[]; sense: string }> = {
  finance: {
    sentence: "I deposited my paycheck at the BANK.",
    sense: "financial institution",
    signals: [
      { token: "I", weight: 3, x: 13, y: 25 },
      { token: "deposited", weight: 27, x: 27, y: 14 },
      { token: "my", weight: 4, x: 44, y: 10 },
      { token: "paycheck", weight: 38, x: 62, y: 13 },
      { token: "at", weight: 5, x: 78, y: 24 },
      { token: "the", weight: 3, x: 87, y: 42 },
      { token: "BANK", weight: 20, x: 50, y: 75 },
    ],
  },
  river: {
    sentence: "We sat beside the river BANK.",
    sense: "edge of a river",
    signals: [
      { token: "We", weight: 3, x: 14, y: 26 },
      { token: "sat", weight: 10, x: 29, y: 14 },
      { token: "beside", weight: 22, x: 46, y: 10 },
      { token: "the", weight: 4, x: 64, y: 14 },
      { token: "river", weight: 43, x: 80, y: 27 },
      { token: "BANK", weight: 18, x: 50, y: 75 },
    ],
  },
};

const phaseCopy: Record<Phase, { label: string; title: string; copy: string }> = {
  1: {
    label: "QUERY",
    title: "BANK creates a learned query.",
    copy: "Not an English question. Think of it as a numerical pattern describing what kind of information would be useful for updating this token right now.",
  },
  2: {
    label: "MATCH",
    title: "That query is compared with learned keys.",
    copy: "Every available token offers a key. Better query-key matches receive larger scores, so some context can matter much more than other context.",
  },
  3: {
    label: "MIX",
    title: "The scores control an information mix.",
    copy: "The weights scale value vectors carried by the tokens. Those weighted values are blended into BANK's next representation, helping context reshape what BANK means here.",
  },
};

function Sentence({ text }: { text: string }) {
  const [before, after] = text.split("BANK");
  return <>{before}<strong>BANK</strong>{after}</>;
}

export function AttentionChamber() {
  const [mode, setMode] = useState<ContextMode>("finance");
  const [phase, setPhase] = useState<Phase>(1);
  const scene = scenes[mode];

  const ranked = useMemo(
    () => [...scene.signals].filter((signal) => signal.token !== "BANK").sort((a, b) => b.weight - a.weight),
    [scene],
  );

  return (
    <section id="attention-chamber" className={styles.scene} aria-labelledby="attention-title">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className="shell relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-label uppercase text-violet">02 / The attention chamber</p>
          <h2 id="attention-title" className="mt-5 text-h2 font-semibold text-ink">
            So how did context move <span className="text-gradient-ai">BANK?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-muted">
            One of the transformer's core mechanisms lets a token selectively pull information from other tokens. Change the sentence, then X-ray one simplified attention pass.
          </p>
        </div>

        <div className={styles.contextSwitch} role="group" aria-label="Choose which BANK sentence to inspect">
          {(Object.keys(scenes) as ContextMode[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => { setMode(key); setPhase(1); }}
              className={mode === key ? styles.contextActive : ""}
            >
              <Sentence text={scenes[key].sentence} />
            </button>
          ))}
        </div>

        <div className={styles.chamberGrid}>
          <div className={styles.reactor} data-phase={phase}>
            <div className={styles.reactorTopline}>
              <span>ATTENTION ROUTING / ILLUSTRATIVE HEAD-LIKE VIEW</span>
              <strong>{phaseCopy[phase].label}</strong>
            </div>

            <div className={styles.reactorField}>
              <div className={styles.orbitA} aria-hidden="true" />
              <div className={styles.orbitB} aria-hidden="true" />
              <svg className={styles.beamLayer} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                {scene.signals.filter((signal) => signal.token !== "BANK").map((signal) => (
                  <line
                    key={signal.token}
                    x1={signal.x}
                    y1={signal.y}
                    x2="50"
                    y2="75"
                    style={{
                      "--beam-strength": signal.weight / 43,
                      "--beam-width": `${0.14 + signal.weight / 46}px`,
                    } as React.CSSProperties}
                  />
                ))}
              </svg>

              {scene.signals.filter((signal) => signal.token !== "BANK").map((signal) => (
                <div
                  key={signal.token}
                  className={styles.signalNode}
                  style={{
                    left: `${signal.x}%`,
                    top: `${signal.y}%`,
                    "--signal-strength": signal.weight / 43,
                  } as React.CSSProperties}
                >
                  <span>{signal.token}</span>
                  <small>{phase >= 2 ? `${signal.weight}%` : "KEY"}</small>
                </div>
              ))}

              <div className={styles.targetNode}>
                <span>BANK</span>
                <small>{phase === 1 ? "QUERY" : phase === 2 ? "SCORING" : "UPDATED"}</small>
              </div>

              <div className={styles.flowParticles} aria-hidden="true">
                {Array.from({ length: 10 }, (_, index) => <i key={index} style={{ "--particle": index } as React.CSSProperties} />)}
              </div>
            </div>

            <div className={styles.phaseControls}>
              {(Object.keys(phaseCopy) as unknown as Phase[]).map((step) => (
                <button
                  key={step}
                  type="button"
                  className={phase === step ? styles.phaseActive : ""}
                  onClick={() => setPhase(step)}
                >
                  <span>0{step}</span>
                  <strong>{phaseCopy[step].label}</strong>
                </button>
              ))}
            </div>
          </div>

          <aside className={styles.readout}>
            <div className={styles.phaseReadout} aria-live="polite">
              <p>{phaseCopy[phase].label} / STEP 0{phase}</p>
              <h3>{phaseCopy[phase].title}</h3>
              <span>{phaseCopy[phase].copy}</span>
            </div>

            <div className={styles.signalMixer}>
              <div className={styles.mixerTopline}>
                <p>Strongest context signals</p>
                <span>{phase < 2 ? "hidden until match" : "illustrative weights"}</span>
              </div>
              <ol className={phase < 2 ? styles.weightsHidden : ""}>
                {ranked.slice(0, 4).map((signal, index) => (
                  <li key={signal.token}>
                    <span>0{index + 1}</span>
                    <strong>{signal.token}</strong>
                    <i><b style={{ "--weight": `${signal.weight}%` } as React.CSSProperties} /></i>
                    <em>{signal.weight}%</em>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.resultCard}>
              <p>AFTER THE MIX</p>
              <div>
                <span>BANK</span>
                <b>→</b>
                <strong>{scene.sense}</strong>
              </div>
              <small>
                Attention does not store this English label. The label is our translation of the contextual relationship the visualization is teaching.
              </small>
            </div>
          </aside>
        </div>

        <div className={styles.mechanismStrip}>
          <div>
            <span>Q</span>
            <p><strong>Query</strong> — what information would be useful?</p>
          </div>
          <div>
            <span>K</span>
            <p><strong>Key</strong> — how well does each token match that request?</p>
          </div>
          <div>
            <span>V</span>
            <p><strong>Value</strong> — what information does each matched token contribute?</p>
          </div>
        </div>

        <div className={styles.truthStrip}>
          <span>IMPORTANT:</span>
          <p>
            The weights in this scene are illustrative, not measurements from a named model. Real transformer layers run multiple attention heads in parallel, and attention weights alone are not a complete explanation of a model's reasoning. What is real is the mechanism: learned queries score learned keys, normalized scores weight value vectors, and the resulting information is mixed into token representations.
          </p>
        </div>
      </div>
    </section>
  );
}
