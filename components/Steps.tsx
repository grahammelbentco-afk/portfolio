"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { steps } from "@/content/homepage";
import styles from "./Steps.module.css";

/**
 * Steps (Revision 49). One large browser "stage", driven by the three steps below it:
 *   [ heading                                  intro, button ]
 *   [ stage: 1 compare slider | 2 site plan card | 3 site live ]
 *   [ 1 Free preview ────── 2 Plan the pages ────── 3 Build and launch ]
 * The steps are a tablist (click, or arrow keys); the stage is its panel. A progress line
 * fills to the chosen step. Motion only answers the visitor's choice, and is off under
 * reduced motion. Bloom & Fern is a fictional example.
 */
export default function Steps() {
  const [active, setActive] = useState(0);
  const [split, setSplit] = useState(42);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const c = steps.compare;
  const n = steps.items.length;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + n) % n;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="steps" className={styles.section} data-ground="light" data-steps aria-labelledby="steps-title">
      <div className={`container ${styles.head}`}>
        <h2 id="steps-title" className="sec-title">
          <span className="outline-type">{steps.title.outline}</span> {steps.title.rest}
        </h2>
        <div className={styles.headSide}>
          <p className="sec-intro">{steps.intro}</p>
          <a href={steps.action.href} className="btn btn-lg btn-primary">
            {steps.action.label}
          </a>
        </div>
      </div>

      <div className="container">
        <figure
          className={styles.compare}
          data-step={active}
          style={{ "--split": `${active === 0 ? split : 0}%` } as React.CSSProperties}
          id="steps-stage"
          role="tabpanel"
          aria-labelledby={`steps-tab-${active}`}
        >
          <div className={styles.chrome} aria-hidden="true">
            <span className={styles.dots}>
              <i />
              <i />
              <i />
            </span>
            <span className={styles.url}>
              <svg className={styles.lock} viewBox="0 0 16 16">
                <rect x="3.5" y="7" width="9" height="7" rx="1.5" fill="currentColor" />
                <path d="M5.5 7V5a2.5 2.5 0 015 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {c.url}
              <span className={styles.liveTag}>Live</span>
            </span>
          </div>

          <div className={styles.stage} aria-hidden="true">
            {/* Before: the template look most local sites share. */}
            <div className={`${styles.site} ${styles.before}`}>
              <div className={styles.bNav}>
                <span className={styles.bLogo}>{c.business.toUpperCase()} FLORIST</span>
                <span className={styles.bLinks}>
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className={styles.bHero}>
                <span className={styles.bTitle}>Welcome to Our Website</span>
                <span className={styles.bLine} />
                <span className={styles.bLine} data-short />
                <span className={styles.bBtn}>Read More</span>
              </div>
              <div className={styles.bCols}>
                <span />
                <span />
                <span />
              </div>
            </div>

            {/* After: the preview. */}
            <div className={`${styles.site} ${styles.after}`}>
              <img
                src={`${c.image.base}-1000.webp`}
                srcSet={`${c.image.base}-1000.webp 1000w, ${c.image.base}-1600.webp 1600w`}
                sizes="(min-width: 1024px) 90vw, 100vw"
                alt=""
                width={c.image.width}
                height={c.image.height}
                loading="lazy"
                decoding="async"
              />
              <div className={styles.aNav}>
                <span className={styles.aLogo}>{c.business}</span>
                <span className={styles.aLinks}>
                  {c.nav.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </span>
              </div>
              <div className={styles.aHero}>
                <span className={styles.aTitle}>{c.headline}</span>
                <span className={styles.aSub}>{c.sub}</span>
                <span className={styles.aBtn}>{c.cta}</span>
              </div>
            </div>

            {/* Step 2: the plan, agreed before the build. */}
            <div className={styles.plan}>
              <span className={styles.planTitle}>{steps.plan.title}</span>
              <ul className={styles.planPages}>
                {steps.plan.pages.map((p) => (
                  <li key={p}>
                    <svg viewBox="0 0 16 16">
                      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
              <span className={styles.planScope}>{steps.plan.scope}</span>
              <span className={styles.planPrice}>{steps.plan.price}</span>
            </div>

            {/* Step 3: live. */}
            <div className={styles.toast}>
              <span className={styles.toastDot} />
              <span>
                <b>{steps.live.title}</b>
                <small>{steps.live.text}</small>
              </span>
            </div>

            <span className={styles.handle}>
              <svg viewBox="0 0 24 24">
                <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {active === 0 && (
            <input
              className={styles.range}
              type="range"
              min={0}
              max={100}
              value={split}
              onChange={(e) => setSplit(Number(e.target.value))}
              aria-label={c.label}
              aria-valuetext={`${split}% today, ${100 - split}% preview`}
              data-steps-range
            />
          )}

          <figcaption className={styles.caption}>
            <span className={styles.tagBefore}>{active === 0 ? c.before : ""}</span>
            <span className={styles.note}>{c.note}</span>
            <span className={styles.tagAfter}>{active === 0 ? c.after : steps.items[active].title}</span>
          </figcaption>
        </figure>

        <div
          className={styles.tabs}
          role="tablist"
          aria-label="How it works, step by step"
          onKeyDown={onKeyDown}
          style={{ "--progress": active / (n - 1) } as React.CSSProperties}
        >
          <span className={styles.track} aria-hidden="true">
            <span className={styles.fill} />
          </span>
          {steps.items.map((s, i) => (
            <button
              key={s.title}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`steps-tab-${i}`}
              aria-selected={i === active}
              aria-controls="steps-stage"
              tabIndex={i === active ? 0 : -1}
              className={styles.tab}
              onClick={() => setActive(i)}
              data-steps-tab={i}
            >
              <span className={styles.num} aria-hidden="true">
                {i + 1}
              </span>
              <span className={styles.tabTitle}>{s.title}</span>
              <span className={styles.tabText}>{s.text}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
