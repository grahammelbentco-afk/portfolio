"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroSlider.module.css";

export type Card = { src: string; label: string; alt?: string; video?: { src: string; poster: string; grade?: { filter: string; tint: string } } };
type Slot = React.CSSProperties;

/**
 * The hero slider (Revision 90; the homepage uses the Descending layout, the options page
 * shows all eight). One engine for every concept. The three hero cards are repeated
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
  const paused = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Tell the hero which card is in front (index into `cards`), so the rotating headline can
  // follow the slider (HeroRotator listens). Bubbles from the track, so each hero only hears
  // its own slider.
  useEffect(() => {
    const front = (((active % n) + n) % n) % cards.length;
    trackRef.current?.dispatchEvent(new CustomEvent("hero:front", { bubbles: true, detail: front }));
  }, [active, n, cards.length]);

  // Every on-stage card's video loops on its own, and the slider steps on a fixed timer, so a
  // slow or stalled clip can never hold it up. Off-stage copies pause. Starting a video makes the
  // browser decode it, which drops frames mid-glide, so a card that just came on stage starts
  // once the 900ms glide is over. Under reduced motion nothing plays or advances.
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const figs = [...(trackRef.current?.querySelectorAll("figure") ?? [])];
    const onStage = (fig: Element) => fig.getAttribute("aria-hidden") !== "true";
    // After the first step, a clip must not resume from wherever its copy last paused (Jasper
    // saw clips open on their ending). The new front card plays from the start; a card that
    // just came on stage (its video still paused) starts mid-clip, so the two never loop in step.
    if (motion && active > 0) {
      figs.forEach((fig) => {
        const v = fig.querySelector("video");
        if (!v || !onStage(fig)) return;
        if (fig.hasAttribute("data-front")) {
          v.pause();
          v.currentTime = 0;
        } else if (v.paused) v.currentTime = 3;
      });
    }
    figs.forEach((fig) => {
      if (!motion || !onStage(fig)) fig.querySelector("video")?.pause();
    });
    if (!motion) return;

    const settle = window.setTimeout(() => {
      figs.forEach((fig) => {
        if (onStage(fig)) fig.querySelector("video")?.play().catch(() => {});
      });
    }, 900);

    // Step on when the time is up, unless the slider is hovered, focused or the tab is hidden.
    let timer = 0;
    const advance = () => {
      if (paused.current || document.hidden) timer = window.setTimeout(advance, 400);
      else setPos((s) => ({ active: s.active + 1, prev: s.active }));
    };
    timer = window.setTimeout(advance, every);
    return () => {
      window.clearTimeout(settle);
      window.clearTimeout(timer);
    };
  }, [active, every]);

  const kind = (q: number) => (q < k ? q : q === n - 1 ? "leave" : "enter");
  const mod = (x: number) => ((x % n) + n) % n;

  return (
    <div
      ref={trackRef}
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
              data-front={now === 0 ? "" : undefined}
              aria-hidden={typeof now !== "number"}
              style={style}
            >
              {card.video ? (
                // Only on-stage cards load video. Preloading the off-stage copies too can stall playback.
                <video
                  src={card.video.src}
                  poster={card.video.poster}
                  muted
                  playsInline
                  loop
                  preload={typeof now === "number" ? "auto" : "none"}
                  aria-hidden="true"
                  style={card.video.grade ? { filter: card.video.grade.filter } : undefined}
                />
              ) : (
                <img src={card.src} alt={typeof now === "number" ? (card.alt ?? "") : ""} decoding="async" />
              )}
              {card.video?.grade && (
                <span className={styles.grade} style={{ background: card.video.grade.tint }} aria-hidden="true" />
              )}
              <figcaption>{card.label}</figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
