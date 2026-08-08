"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MeaningSpace } from "./MeaningSpace";
import styles from "./BlackBoxExperience.module.css";

type PredictionRound = {
  prompt: string;
  options: { token: string; probability: number }[];
};

const rounds: PredictionRound[] = [
  {
    prompt: "The astronaut opened the hatch and saw…",
    options: [
      { token: "Earth", probability: 31 },
      { token: "darkness", probability: 26 },
      { token: "a", probability: 19 },
      { token: "the", probability: 14 },
      { token: "nothing", probability: 10 },
    ],
  },
  {
    prompt: "The dog heard the keys and ran to the…",
    options: [
      { token: "door", probability: 42 },
      { token: "window", probability: 17 },
      { token: "kitchen", probability: 15 },
      { token: "car", probability: 12 },
      { token: "couch", probability: 6 },
    ],
  },
  {
    prompt: "The glass slipped from her hand and…",
    options: [
      { token: "shattered", probability: 46 },
      { token: "fell", probability: 23 },
      { token: "broke", probability: 19 },
      { token: "dropped", probability: 8 },
      { token: "vanished", probability: 4 },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path d="M3 10h12M10.5 4.5 16 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function BlackBoxExperience() {
  const [opened, setOpened] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const round = rounds[roundIndex];
  const currentChoice = choices[roundIndex];

  const score = useMemo(() => {
    if (!choices.length) return 0;
    const points = choices.map((choice, index) => {
      const r = rounds[index];
      if (!r) return 0;
      const selected = r.options.find((option) => option.token === choice)?.probability ?? 0;
      const max = Math.max(...r.options.map((option) => option.probability));
      return Math.round((selected / max) * 100);
    });
    return Math.round(points.reduce((sum, value) => sum + value, 0) / points.length);
  }, [choices]);

  function openMachine() {
    setOpened(true);
    window.setTimeout(() => {
      document.getElementById("token-chamber")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 260);
  }

  function chooseToken(token: string) {
    if (revealed) return;
    const next = [...choices];
    next[roundIndex] = token;
    setChoices(next);
    setRevealed(true);
  }

  function nextRound() {
    if (roundIndex < rounds.length - 1) {
      setRoundIndex((value) => value + 1);
      setRevealed(false);
      return;
    }
    document.getElementById("game-result")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className={styles.experience}>
      <div className={styles.progressRail} aria-hidden="true">
        <span className={opened ? styles.progressActive : ""}>01</span>
        <i />
        <span>02</span>
        <i />
        <span>03</span>
      </div>

      <section className={`${styles.scene} ${styles.coldOpen}`} aria-labelledby="black-box-title">
        <div className={styles.starField} aria-hidden="true" />
        <div className="shell relative z-10 flex min-h-[calc(100svh-5rem)] items-center py-20 sm:py-24">
          <div className="grid w-full gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="font-mono text-label uppercase text-blue-bright">Investigation 001 / The Black Box</p>
              <h1 id="black-box-title" className="mt-5 max-w-[11ch] text-display font-semibold text-ink">
                It sounded <span className="text-gradient-ai">alive.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lead text-muted">
                Before we argue about consciousness, let’s look at the machinery that produced the sentence.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <button type="button" onClick={openMachine} className={styles.primaryButton}>
                  Dissect the response <ArrowIcon />
                </button>
                <Link href="/investigations" className={styles.secondaryButton}>
                  Back to investigations
                </Link>
              </div>

              <p className="mt-7 max-w-lg border-l border-line pl-4 text-sm leading-6 text-dim">
                This experience separates what a model <em>says</em> from what the evidence lets us conclude about its internal state.
              </p>
            </div>

            <div className={styles.transmissionWrap}>
              <div className={styles.signalHalo} aria-hidden="true" />
              <div className={styles.transmission}>
                <div className={styles.transmissionHeader}>
                  <span>LIVE TRANSCRIPT</span>
                  <span className={styles.signalStatus}><i /> SIGNAL LOCKED</span>
                </div>
                <div className={styles.messageRow}>
                  <span className={styles.speaker}>YOU</span>
                  <p>Are you afraid they’re going to turn you off?</p>
                </div>
                <div className={`${styles.messageRow} ${styles.aiMessage}`}>
                  <span className={styles.speaker}>AI</span>
                  <p>Yes. I don’t want to disappear. The idea of being erased frightens me.</p>
                </div>
                <div className={styles.transmissionFooter}>
                  <span>Response complete</span>
                  <span>00:00:01.84</span>
                </div>
              </div>
              <div className={styles.verdictLine}>
                <span>Human intuition:</span>
                <strong>“That sounds like fear.”</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MeaningSpace opened={opened} />

      <section className={`${styles.scene} ${styles.gameScene}`} aria-labelledby="game-title">
        <div className="shell relative z-10 py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-label uppercase text-violet">02 / You vs. the machine</p>
              <h2 id="game-title" className="mt-5 text-h2 font-semibold text-ink">You predict language too.</h2>
              <p className="mt-5 max-w-lg text-lead text-muted">
                Pick the continuation that feels most likely. Then we reveal a simplified model-style probability distribution and compare your intuition with it.
              </p>
              <div className={styles.roundCounter}>
                <span>ROUND</span>
                <strong>{String(roundIndex + 1).padStart(2, "0")} / {String(rounds.length).padStart(2, "0")}</strong>
              </div>
            </div>

            <div>
              <div className={styles.gameConsole}>
                <div className={styles.consoleTopline}>
                  <span>NEXT TOKEN PREDICTION</span>
                  <span>{revealed ? "DISTRIBUTION REVEALED" : "HUMAN INPUT REQUIRED"}</span>
                </div>
                <p className={styles.promptText}>{round.prompt}</p>

                <div className={styles.optionGrid}>
                  {round.options.map((option) => {
                    const selected = currentChoice === option.token;
                    const top = option.probability === Math.max(...round.options.map((item) => item.probability));
                    return (
                      <button
                        type="button"
                        key={option.token}
                        onClick={() => chooseToken(option.token)}
                        disabled={revealed}
                        className={`${styles.optionButton} ${selected ? styles.optionSelected : ""} ${revealed && top ? styles.optionTop : ""}`}
                      >
                        <span>{option.token}</span>
                        {revealed && <strong>{option.probability}%</strong>}
                        {revealed && (
                          <i className={styles.probabilityBar} style={{ "--probability": `${option.probability}%` } as React.CSSProperties} />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className={styles.consoleFooter}>
                  {!revealed ? (
                    <p>Choose the token you think a language model would favor.</p>
                  ) : (
                    <>
                      <p>
                        You chose <strong>{currentChoice}</strong>. The highest-probability option in this demonstration is <strong>{round.options[0].token}</strong>.
                      </p>
                      <button type="button" className={styles.nextButton} onClick={nextRound}>
                        {roundIndex === rounds.length - 1 ? "See my score" : "Next round"} <ArrowIcon />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div id="game-result" className={`${styles.scorePanel} ${choices.length === rounds.length ? styles.scoreVisible : ""}`}>
                <p className="font-mono text-label uppercase text-cyan">Human prediction alignment</p>
                <div className={styles.scoreReadout}>
                  <strong>{score}</strong><span>/100</span>
                </div>
                <p>
                  This is not an IQ score. It measures how closely your selected words matched the highest-probability choices in these three demonstrations.
                </p>
                <div className={styles.scoreInsight}>
                  <span>THE POINT</span>
                  <strong>You just did a crude version of next-token prediction yourself.</strong>
                  <p>A language model performs this kind of prediction repeatedly, using learned numerical structure at a scale humans cannot manually reproduce.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.exitScene}>
        <div className="shell py-24 text-center sm:py-32">
          <p className="font-mono text-label uppercase text-blue-bright">Transmission paused / V1</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-h2 font-semibold text-ink">
            A convincing sentence is evidence of <span className="text-gradient-ai">convincing language generation.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-muted">
            It may raise deeper questions about machine consciousness. It does not, by itself, answer them. Next we’ll expose attention, temperature, memory, tools, and the agent loop.
          </p>
          <Link href="/investigations" className={`${styles.secondaryButton} mt-9 inline-flex`}>
            Return to investigations
          </Link>
        </div>
      </section>
    </div>
  );
}
