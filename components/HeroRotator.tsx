"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

type Phrase = { outline: string; rest: string };

const HOLD = 2600; // ms each phrase stays

/**
 * The hero's second line (Revision 88): three phrases swap in place, the Transitions.dev
 * text swap (blur, rise, fade) scaled up for display type. All phrases share one grid cell,
 * so the line keeps the height of the tallest and nothing below it moves.
 * Hidden from screen readers; the h1 carries the full sentence once (see Hero.tsx).
 * Under reduced motion, or with the tab hidden, it holds the current phrase.
 */
export default function HeroRotator({ phrases }: { phrases: Phrase[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % phrases.length);
    }, HOLD);
    return () => window.clearInterval(id);
  }, [phrases.length]);

  const prev = (active - 1 + phrases.length) % phrases.length;

  return (
    <span className={styles.rotator} aria-hidden="true">
      {phrases.map((p, i) => (
        <span key={i} className={styles.phrase} data-state={i === active ? "in" : i === prev ? "out" : "wait"}>
          <span className={styles.outline}>{p.outline}</span>
          {p.rest}
        </span>
      ))}
    </span>
  );
}
