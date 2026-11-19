"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroSlider.module.css";

export type Card = { src: string; label: string; alt?: string; video?: { src: string; poster: string; holdEnd?: boolean } };
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

  // Revision 94: a card video plays once, from the start, only while its card is the front
  // (first, largest) slot, and the slider waits for it to finish before stepping on. On the
  // smaller slots it shows its first frame. Seeking or starting a video makes the browser decode
  // it, which drops frames if it lands mid-glide, so videos are only paused at the step (cheap);
  // the front one starts, and a copy that has left is rewound, once the 900ms glide is over
  // (the leaving copy has faded out by then). Under reduced motion nothing plays or advances.
  // Tell the hero which card is in front (index into `cards`), so the rotating headline can
  // follow the slider (HeroRotator listens). Bubbles from the track, so each hero only hears
  // its own slider.
  useEffect(() => {
    const front = (((active % n) + n) % n) % cards.length;
    trackRef.current?.dispatchEvent(new CustomEvent("hero:front", { bubbles: true, detail: front }));
  }, [active, n, cards.length]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const figs = [...(trackRef.current?.querySelectorAll("figure") ?? [])];
    const withVideo = figs
      .map((fig) => ({ fig, v: fig.querySelector("video") }))
      .filter((x): x is { fig: HTMLElement; v: HTMLVideoElement } => !!x.v);
    const frontEntry = motion ? withVideo.find(({ fig }) => fig.hasAttribute("data-front")) : undefined;
    withVideo.forEach(({ v }) => {
      if (v !== frontEntry?.v) v.pause();
    });
    if (!motion) return;

    // Step on when the time is up (or the front video has ended) and the slider isn't hovered.
    let timer = 0;
    const advance = () => {
      if (paused.current || document.hidden) timer = window.setTimeout(advance, 400);
      else setPos((s) => ({ active: s.active + 1, prev: s.active }));
    };

    let cleanupVideo = () => {};
    const settle = window.setTimeout(() => {
      withVideo.forEach(({ fig, v }) => {
        if (fig.getAttribute("aria-hidden") === "true" && v.currentTime > 0) v.currentTime = 0;
      });
      if (frontEntry) cleanupVideo = playFront(frontEntry.v);
    }, 900);

    const playFront = (video: HTMLVideoElement) => {
      if (video.ended || video.currentTime > 0) video.currentTime = 0;
      video.play().catch(() => {});
      const held = () => paused.current || document.hidden;
      // When the clip ends: step on, or, while the slider is held (hover, focus, hidden tab),
      // replay it so the front card never sits frozen on its last frame.
      const onEnded = () => {
        if (held()) {
          // A clip that ends on its payoff (data-hold-end) rests on its last frame; others replay.
          if (video.hasAttribute("data-hold-end")) return;
          video.currentTime = 0;
          video.play().catch(() => {});
          return;
        }
        window.clearTimeout(timer);
        advance();
      };
      // Fallback in case the clip is stuck (decode error, blocked autoplay): step on if it isn't
      // playing; while it plays, keep checking.
      const ms = Number.isFinite(video.duration) && video.duration > 0 ? video.duration * 1000 : 6000;
      const check = () => {
        if (!video.paused || held()) timer = window.setTimeout(check, 1000);
        else advance();
      };
      timer = window.setTimeout(check, Math.max(every, ms + 1500));
      video.addEventListener("ended", onEnded);
      return () => video.removeEventListener("ended", onEnded);
    };

    if (!frontEntry) timer = window.setTimeout(advance, every);
    return () => {
      window.clearTimeout(settle);
      window.clearTimeout(timer);
      cleanupVideo();
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
                // Decorative clip; the caption names the card. Muted and inline; it plays once on
                // the front slot and otherwise shows its first frame (see the effect above).
                <video
                  src={card.video.src}
                  poster={card.video.poster}
                  muted
                  playsInline
                  preload="metadata"
                  data-hold-end={card.video.holdEnd ? "" : undefined}
                  aria-hidden="true"
                />
              ) : (
                <img src={card.src} alt={typeof now === "number" ? (card.alt ?? "") : ""} decoding="async" />
              )}
              <figcaption>{card.label}</figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
