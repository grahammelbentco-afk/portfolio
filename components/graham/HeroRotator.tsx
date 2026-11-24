"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

type Phrase = { lead: string; rest: string };

/**
 * Lines 2 and 3 of the hero headline (Revision 89): "deserves" + a small swapping word, then
 * a swapping last line in the brand gradient ("a / digital presence.", "to / stand out.",
 * "to / get more leads."). Both swap together with the Transitions.dev text swap (blur,
 * rise, fade) scaled up for display type. Each set of phrases shares one grid cell, so the
 * lines keep the size of the widest and nothing below moves. Visual only: the h1 carries
 * the full sentence for screen readers (see Hero.tsx).
 *
 * Revision 94: no timer of its own. The hero slider is the clock: each time a card comes to
 * the front it sends "hero:front" with that card's index, and the phrase with the same index
 * shows (Design / digital presence, Market / stand out, Conversion / get more leads). So the
 * phrase changes as the cards glide, holds as long as its card (longer while the Design video
 * plays), pauses with the slider on hover or focus, and follows the arrows. Under reduced
 * motion the slider holds still, so the headline does too.
 */
export default function HeroRotator({ second, phrases }: { second: string; phrases: Phrase[] }) {
  const [pos, setPos] = useState({ active: 0, prev: -1 });
  const { active, prev } = pos;
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero) return;
    const onFront = (e: Event) => {
      const i = Number((e as CustomEvent<number>).detail) % phrases.length;
      setPos((p) => (i === p.active ? p : { active: i, prev: p.active }));
    };
    hero.addEventListener("hero:front", onFront);
    return () => hero.removeEventListener("hero:front", onFront);
  }, [phrases.length]);

  const state = (i: number) => (i === active ? "in" : i === prev ? "out" : "wait");
  // The small word only animates when it actually changes ("to" -> "to" stays put).
  const leadState = (i: number) =>
    phrases[i].lead === phrases[active].lead ? (i === active ? "in" : "wait") : state(i);

  return (
    <>
      <span ref={ref} className={styles.line} data-intro="line">
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
