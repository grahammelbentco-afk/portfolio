"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const HOLD = 2600; // ms each phrase stays

type Phrase = { lead: string; rest: string };

/**
 * Lines 2 and 3 of the hero headline (Revision 89): "deserves" + a small swapping word, then
 * a swapping last line in the brand gradient ("a / digital presence.", "to / stand out.",
 * "to / get more leads."). Both swap together with the Transitions.dev text swap (blur,
 * rise, fade) scaled up for display type. Each set of phrases shares one grid cell, so the
 * lines keep the size of the widest and nothing below moves. Visual only: the h1 carries
 * the full sentence for screen readers (see Hero.tsx). Under reduced motion, or with the
 * tab hidden, it holds the current phrase.
 */
export default function HeroRotator({ second, phrases }: { second: string; phrases: Phrase[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % phrases.length);
    }, HOLD);
    return () => window.clearInterval(id);
  }, [phrases.length]);

  const prev = (active - 1 + phrases.length) % phrases.length;
  const state = (i: number) => (i === active ? "in" : i === prev ? "out" : "wait");
  // The small word only animates when it actually changes ("to" -> "to" stays put).
  const leadState = (i: number) =>
    phrases[i].lead === phrases[active].lead ? (i === active ? "in" : "wait") : state(i);

  return (
    <>
      <span className={styles.line} data-intro="line">
        {second}{" "}
        <span className={styles.rotator}>
          {phrases.map((p, i) => (
            <span key={i} className={styles.phrase} data-state={leadState(i)}>
              {p.lead}
            </span>
          ))}
        </span>
      </span>
      <span className={styles.line} data-intro="line">
        <span className={styles.rotator}>
          {phrases.map((p, i) => (
            <span key={i} className={`${styles.phrase} ${styles.highlight} text-gradient`} data-state={state(i)}>
              {p.rest}
            </span>
          ))}
        </span>
      </span>
    </>
  );
}
