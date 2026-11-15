"use client";

import { useEffect, useRef, useState } from "react";
import { reviews } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import Spark from "./Spark";
import styles from "./Reviews.module.css";

/** Seconds each review stays up while the carousel runs on its own. */
const HOLD = 8;

/**
 * Reviews (Revision 79). Real reviews for Graham and Jasper, one at a time, rotating:
 *   [ duotone photo, 24° cut, Upwork proof chip ][ the quote, large, with its byline       ]
 *                                                [ ‹ ›  4 / 16  gauge filling for 8s      ]
 * It moves on by itself every 8 seconds and pauses while hovered, focused or off screen; with
 * reduced motion it doesn't move on its own. The arrows (and ←/→ on the panel) step through.
 * The Split Arc gauge is Work's, filling as the current review's time runs.
 */
export default function Reviews() {
  const items = reviews.items;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLElement>(null);
  const r = items[active];
  const running = !paused && onScreen && !still;

  const step = (by: number) => setActive((a) => (a + by + items.length) % items.length);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => step(1), HOLD * 1000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  return (
    <section id="reviews" ref={root} className={styles.section} data-ground="light" data-reviews aria-labelledby="reviews-title">
      <div className={`container ${styles.head}`}>
        <Eyebrow>{reviews.eyebrow}</Eyebrow>
        <h2 id="reviews-title" className="sec-title">
          {reviews.title.solid} <span className="outline-type">{reviews.title.outline}</span>
        </h2>
        <p className="sec-intro">{reviews.intro}</p>
      </div>

      <div className={`container ${styles.layout}`}>
        <figure className={styles.photo}>
          <img
            src={`${reviews.image.base}-720.webp`}
            srcSet={`${reviews.image.base}-720.webp 720w, ${reviews.image.base}-1280.webp 1280w`}
            sizes="(min-width: 960px) 38vw, 92vw"
            width={720}
            height={405}
            alt={reviews.image.alt}
            loading="lazy"
            decoding="async"
          />
          <figcaption className={styles.proof}>
            <strong>{reviews.proof.value}</strong>
            <span>{reviews.proof.label}</span>
          </figcaption>
        </figure>

        <div
          className={styles.stage}
          role="region"
          aria-roledescription="carousel"
          aria-label="Reviews"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
          }}
          onKeyDown={onKey}
        >
          <div className={styles.panel} aria-live={running ? "off" : "polite"} data-review-panel>
            <figure
              className={styles.current}
              key={r.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${active + 1} of ${items.length}`}
              data-review-current
            >
              <blockquote className={styles.quote}>
                <p>{r.quote}</p>
              </blockquote>
              <figcaption className={styles.byline}>
                <span className={styles.avatar} aria-hidden="true">
                  {r.initials ?? <Spark className={styles.avatarSpark} />}
                </span>
                <span>
                  <span className={styles.who}>{r.name}</span>
                  <span className={styles.role}>
                    {r.role} <span className={styles.source}>{r.source}</span>
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>

          <div className={styles.controls}>
            <button type="button" className={styles.arrow} onClick={() => step(-1)} aria-label="Previous review" data-review-prev>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M10 3.5L5.5 8l4.5 4.5" />
              </svg>
            </button>
            <button type="button" className={styles.arrow} onClick={() => step(1)} aria-label="Next review" data-review-next>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M6 3.5L10.5 8 6 12.5" />
              </svg>
            </button>
            <p className={styles.count} aria-hidden="true">
              <b>{active + 1}</b> / {items.length}
            </p>
            <svg className={styles.gauge} viewBox="0 0 44 24" aria-hidden="true">
              <path className={styles.gaugeTrack} d="M2 2a20 20 0 0 0 40 0" />
              <path
                key={`${r.id}-${running}`}
                className={styles.gaugeFill}
                d="M2 2a20 20 0 0 0 40 0"
                pathLength={100}
                data-running={running || undefined}
                style={{ animationDuration: `${HOLD}s` } as React.CSSProperties}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
