"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { benefits, type Benefit, type BenefitVisual } from "@/content/homepage";
import styles from "./Benefits.module.css";

const SPARK = "M194.14 64.05L124.73 219.94A92 92 0 0 0 194.14 64.05Z";

function Spark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="134 34 102 164" aria-hidden="true">
      <path d={SPARK} transform="translate(12 -26)" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The moment on a website where each benefit happens, as a small UI card that breaks out of
 * the photo frame. Decorative (the title and text carry the meaning). All names, items and
 * prices are fictional examples (see content/homepage.ts).
 */
function Overlay({ kind }: { kind: BenefitVisual }) {
  switch (kind) {
    case "order":
      return (
        <div className={`${styles.chip} ${styles.row}`} data-pop>
          <span className={styles.badge}>
            <Check />
          </span>
          <span className={styles.lines}>
            <span className={styles.small}>New order · paid online</span>
            <span className={styles.strong}>Stoneware bowl × 2</span>
          </span>
          <span className={styles.price}>$84</span>
        </div>
      );
    case "booking":
      return (
        <div className={styles.chip} data-pop>
          <span className={styles.chipHead}>
            <span className={styles.small}>Book a time</span>
            <span className={styles.strong}>Sun 16 Nov</span>
          </span>
          <span className={styles.slots}>
            {["9:00", "10:30", "1:15", "3:45"].map((t) => (
              <span key={t} className={styles.slot} data-picked={t === "10:30" ? "true" : undefined}>
                {t}
              </span>
            ))}
          </span>
        </div>
      );
    case "quote":
      return (
        <div className={`${styles.chip} ${styles.row}`} data-pop>
          <span className={styles.lines}>
            <span className={styles.small}>Quote request · Fremantle</span>
            <span className={styles.strong}>Leaking shower, upstairs</span>
          </span>
          <span className={styles.status}>
            <Check />
            Sent
          </span>
        </div>
      );
    case "search":
      return (
        <div className={styles.chip} data-pop>
          <span className={styles.search}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            bakery near me
          </span>
          <span className={styles.result}>
            <span className={styles.strong}>Crumb &amp; Co Bakery</span>
            <span className={styles.small}>650 m · fresh loaves from 7am</span>
          </span>
        </div>
      );
    case "call":
      return (
        <div className={`${styles.chip} ${styles.row}`} data-pop>
          <span className={`${styles.badge} ${styles.ring}`}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M5.2 2.5l1.6 3-1.3 1.2a8 8 0 003.8 3.8l1.2-1.3 3 1.6-.6 2.3a1.4 1.4 0 01-1.5 1A11.5 11.5 0 012 4.6a1.4 1.4 0 011-1.5z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className={styles.lines}>
            <span className={styles.small}>Tapped “Call now” on your site</span>
            <span className={styles.strong}>Calling Kingsway Auto…</span>
          </span>
        </div>
      );
    case "trust":
      return (
        <div className={`${styles.chip} ${styles.row}`} data-pop>
          <span className={styles.faces}>
            {["AL", "JM", "PR"].map((i) => (
              <span key={i}>{i}</span>
            ))}
          </span>
          <span className={styles.lines}>
            <span className={styles.strong}>Meet the team</span>
            <span className={styles.small}>Fees listed · book online</span>
          </span>
        </div>
      );
  }
}

function Title({ item }: { item: Benefit }) {
  const [before, after] = item.title.split(item.mark);
  return (
    <h3 className={styles.cardTitle}>
      {before}
      <span className={styles.mark}>{item.mark}</span>
      {after}
    </h3>
  );
}

export default function Benefits() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    setEdges({ start: t.scrollLeft <= 2, end: t.scrollLeft >= max - 2 });
    setProgress(max > 0 ? t.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          measure();
        });
    };
    onScroll();
    t.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      t.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [measure]);

  // One card per press: card width plus the gap.
  const go = (dir: 1 | -1) => {
    const t = trackRef.current;
    const card = t?.querySelector<HTMLElement>("li");
    if (!t || !card) return;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    t.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section id="benefits" className={styles.section} data-ground="light" data-benefits aria-labelledby="benefits-title">
      <div className={`container ${styles.head}`}>
        <p className={styles.eyebrow}>
          <Spark className={styles.eyebrowSpark} />
          {benefits.eyebrow}
        </p>
        <h2 id="benefits-title" className={styles.title}>
          {benefits.title.split(benefits.titleMark)[0]}
          <span className={styles.titleMark}>{benefits.titleMark}</span>
          {benefits.title.split(benefits.titleMark)[1]}
        </h2>
        <p className={styles.intro}>{benefits.intro}</p>
        <div className={styles.controls}>
          <button type="button" className={styles.navBtn} onClick={() => go(-1)} disabled={edges.start} aria-controls="benefits-track" aria-label="Previous" data-benefits-prev>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className={styles.navBtn} onClick={() => go(1)} disabled={edges.end} aria-controls="benefits-track" aria-label="Next" data-benefits-next>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <ul id="benefits-track" ref={trackRef} className={styles.track} tabIndex={0} aria-label="What a website brings in, by type of business" data-benefits-track>
        {benefits.items.map((b) => (
          <li key={b.id} className={styles.card} data-colour={b.colour} data-benefit={b.id}>
            <div className={styles.frame}>
              <div className={styles.media}>
                <img
                  src={`${b.image.base}-480.webp`}
                  srcSet={`${b.image.base}-480.webp 480w, ${b.image.base}-800.webp 800w`}
                  sizes="(min-width: 960px) 26vw, 78vw"
                  width={480}
                  height={600}
                  alt={b.image.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.tag}>
                  <Spark className={styles.tagSpark} />
                  {b.tag}
                </span>
              </div>
              <div className={styles.overlay} aria-hidden="true">
                <Overlay kind={b.visual} />
              </div>
            </div>
            <Title item={b} />
            <p className={styles.cardBody}>{b.text}</p>
          </li>
        ))}
      </ul>

      <div className="container">
        <div className={styles.progress} aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }} />
        </div>
      </div>
    </section>
  );
}
