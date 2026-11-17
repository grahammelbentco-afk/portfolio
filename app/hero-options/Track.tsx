"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./options.module.css";

export type Card = { src: string; label: string };
type Slot = React.CSSProperties;

/**
 * One slider engine for every hero concept (Revision 90). The three hero cards are repeated
 * so there are always spare cards off stage; each step, every card glides to the next slot
 * (Transitions.dev smooth-out curve), the first one leaves and a spare enters, so the loop
 * never jumps. `slots` are the visible positions in order, `leave` and `enter` the off-stage
 * ones. Auto-advances, pauses on hover or focus, holds still under reduced motion.
 */
export function Track({
  cards,
  slots,
  leave,
  enter,
  stage,
  every = 3200,
  name,
}: {
  cards: Card[];
  slots: Slot[];
  leave: Slot;
  enter: Slot;
  stage: string;
  every?: number;
  name: string;
}) {
  const k = slots.length;
  // Enough copies of the cards for k visible slots plus one leaving and one waiting.
  const items: Card[] = [];
  while (items.length < k + 2) items.push(...cards);
  const n = items.length;

  // Current step and the one before it (to tell which spares jump unseen).
  const [pos, setPos] = useState({ active: 0, prev: 0 });
  const { active } = pos;
  const step = (d: number) => setPos((s) => ({ active: s.active + d, prev: s.active }));
  const paused = useRef(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    const id = window.setInterval(() => {
      if (!paused.current && !document.hidden) setPos((s) => ({ active: s.active + 1, prev: s.active }));
    }, every);
    return () => window.clearInterval(id);
  }, [every]);

  const kind = (q: number) => (q < k ? q : q === n - 1 ? "leave" : "enter");
  const mod = (x: number) => ((x % n) + n) % n;

  return (
    <div
      className={styles.track}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
      role="group"
      aria-roledescription="carousel"
      aria-label={name}
    >
      <div className={`${styles.stage} ${stage}`}>
        {items.map((card, i) => {
          const q = mod(i - active);
          const was = kind(mod(i - pos.prev));
          const now = kind(q);
          // A spare jumping between the two off-stage positions moves instantly, unseen.
          const jump = typeof was === "string" && typeof now === "string" && was !== now;
          const style = typeof now === "number" ? slots[now] : now === "leave" ? leave : enter;
          return (
            <figure
              key={i}
              className={styles.card}
              data-jump={jump ? "" : undefined}
              aria-hidden={typeof now !== "number"}
              style={style}
            >
              <img src={card.src} alt="" decoding="async" />
              <figcaption>{card.label}</figcaption>
            </figure>
          );
        })}
      </div>
      <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => step(-1)} aria-label="Previous">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M10 3 5 8l5 5" />
        </svg>
      </button>
      <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => step(1)} aria-label="Next">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M6 3l5 5-5 5" />
        </svg>
      </button>
    </div>
  );
}
