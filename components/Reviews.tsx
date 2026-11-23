"use client";

import { useEffect, useRef, useState } from "react";
import { reviews, type Review } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import Spark from "./Spark";
import styles from "./Reviews.module.css";

/** Seconds each review stays up while the carousel runs on its own. */
const HOLD = 8;

/** The quote with its strongest phrase marked in Seafoam, like "Website first." in Benefits. */
function Quote({ r }: { r: Review }) {
  const at = r.mark ? r.quote.indexOf(r.mark) : -1;
  if (!r.mark || at < 0) return <>{r.quote}</>;
  return (
    <>
      {r.quote.slice(0, at)}
      <mark className={styles.mark}>{r.mark}</mark>
      {r.quote.slice(at + r.mark.length)}
    </>
  );
}

/** The avatar circle: the logo of where the review came from (Graham: "add the logo where the
 *  feedback came from ... for trust"). Upwork and LinkedIn in their own colours, a company's
 *  logo in its real colours; initials when there's no logo yet. */
function Avatar({ r }: { r: Review }) {
  const via = r.via;
  if (!via) {
    return (
      <span className={styles.avatar} aria-hidden="true">
        {r.initials ?? <Spark className={styles.avatarSpark} />}
      </span>
    );
  }
  if (via.kind === "client") {
    // The company's own logo, in its real colours.
    return (
      <span className={styles.avatar} data-logo="client" data-fill={via.fill ? "" : undefined}>
        <img className={styles.avatarImg} src={via.src} alt={`${r.org} logo`}width={52} height={52} loading="lazy" decoding="async" />
      </span>
    );
  }
  const label = via.kind === "upwork" ? "Upwork" : "LinkedIn";
  return (
    <span className={styles.avatar} data-logo={via.kind} role="img" aria-label={label}>
      <span className={styles.avatarMark} style={{ "--src": `url(/brands/si/${via.kind}.svg)` } as React.CSSProperties} />
    </span>
  );
}

/** A five-point star, 24-unit box. */
const STAR = "M12 2.2l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z";

/**
 * The review overlay on the photo (2026-11-22, Graham: "a vector/svg overlay ... relevant and
 * creative"). Decorative, all coded: a big outlined quote mark in the dark top corner, a review
 * bubble in the sunlit patch of wall whose five stars light one by one, a hand-drawn arrow from
 * the bubble to the person, and two brand sparks that twinkle. Motion is CSS only and stops
 * under reduced motion.
 */
function ReviewArt() {
  return (
    <div className={styles.art} aria-hidden="true">
      <svg className={styles.bigQuote} viewBox="0 0 120 96">
        <path d="M50 8C26 14 8 32 8 58c0 17 10 30 26 30 13 0 22-9 22-21 0-11-8-20-19-20-3 0-5 0-7 1 3-13 13-24 26-29zM110 8C86 14 68 32 68 58c0 17 10 30 26 30 13 0 22-9 22-21 0-11-8-20-19-20-3 0-5 0-7 1 3-13 13-24 26-29z" />
      </svg>

      <div className={styles.bubble}>
        <span className={styles.stars}>
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} viewBox="0 0 24 24" style={{ "--i": i } as React.CSSProperties}>
              <path d={STAR} />
            </svg>
          ))}
        </span>
        <span className={styles.bubbleRow}>
          <b>5.0</b>
          <span>Would hire again</span>
        </span>
        <i className={styles.bubbleLine} />
        <i className={styles.bubbleLine} />
      </div>

      <svg className={styles.pointer} viewBox="0 0 120 90">
        <path className={styles.arrowLine} d="M6 10c30-6 62 2 78 22s16 34 12 46" pathLength={100} />
        <path className={styles.arrowHead} d="M86 70l10 10 9-13" pathLength={100} />
      </svg>

      <Spark className={`${styles.twinkle} ${styles.twinkleA}`} />
      <Spark className={`${styles.twinkle} ${styles.twinkleB}`} />
    </div>
  );
}

/**
 * Reviews (Revision 80: real desk footage, source logos; 2026-11-22: a still photo with a coded overlay). Real reviews for Graham and Jasper, one at a time, rotating:
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
            className={styles.shot}
            src={reviews.image.src}
            srcSet={reviews.image.srcSet}
            sizes="(min-width: 960px) 42vw, 100vw"
            width={reviews.image.width}
            height={reviews.image.height}
            alt={reviews.image.alt}
            loading="lazy"
            decoding="async"
          />
          <ReviewArt />
          <figcaption className={styles.proof}>
            <span className={styles.proofValue}>
              <strong>{reviews.proof.value}</strong>
              <span className={styles.proofMark} aria-hidden="true" />
            </span>
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
                <p>
                  <Quote r={r} />
                </p>
              </blockquote>
              <figcaption className={styles.byline}>
                <Avatar r={r} />
                <span>
                  <span className={styles.who}>{r.name}</span>
                  <span className={styles.role}>{r.role}</span>
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
