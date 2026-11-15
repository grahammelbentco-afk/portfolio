"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Eyebrow from "./Eyebrow";
import { pricing } from "@/content/homepage";
import Spark from "./Spark";
import styles from "./Pricing.module.css";

/**
 * Pricing (Revision 75). The same two audiences as the hero switch, as tabs. Plans are V1.6
 * p.5's ways to work; prices are placeholders (UNCONFIRMED in content/homepage.ts).
 *   [ heading (solid, then outline)        ][ intro                          ]
 *   [ For local businesses | For agencies  ][ every plan includes: a, b, c  ]
 *   [ featured: duotone photo, 24° cut, big price ][ plan ]
 *   [                                               ][ plan ]
 *   [ not sure yet? see a free preview first ]
 * Flat tiles in tone steps; the featured plan is the one bold element.
 */
export default function Pricing() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const audiences = pricing.audiences;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + audiences.length) % audiences.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="pricing" className={styles.section} data-ground="light" data-pricing aria-labelledby="pricing-title">
      <div className={`container ${styles.head}`}>
        <Eyebrow>{pricing.eyebrow}</Eyebrow>
        <h2 id="pricing-title" className="sec-title">
          <span className={styles.line}>{pricing.title.solid}</span>{" "}
          <span className={`${styles.line} outline-type`}>{pricing.title.outline}</span>
        </h2>
        <p className="sec-intro">{pricing.intro}</p>
      </div>

      <div className="container">
        <div className={styles.bar}>
          <div className={styles.tabs} role="tablist" aria-label="Who it's for" onKeyDown={onKeyDown}>
            {audiences.map((a, i) => (
              <button
                key={a.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`pricing-tab-${a.id}`}
                aria-selected={i === active}
                aria-controls={`pricing-panel-${a.id}`}
                tabIndex={i === active ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(i)}
                data-pricing-tab={a.id}
              >
                {a.label}
              </button>
            ))}
            <span className={styles.thumb} style={{ transform: `translateX(${active * 100}%)` }} aria-hidden="true" />
          </div>
        <div className={styles.always}>
          <p className={styles.alwaysLabel}>Every plan includes</p>
          <ul>
            {pricing.always.map((t) => (
              <li key={t}>
                <Spark className={styles.spark} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        </div>

        {audiences.map((a, i) => (
          <div
            key={a.id}
            role="tabpanel"
            id={`pricing-panel-${a.id}`}
            aria-labelledby={`pricing-tab-${a.id}`}
            hidden={i !== active}
            className={styles.panel}
          >
            <ul className={styles.plans}>
              {a.plans.map((p) => (
                <li key={p.id} className={styles.plan} data-featured={p.featured ? "true" : undefined} data-plan={p.id}>
                  {p.image && (
                    <div className={styles.photo} aria-hidden="true">
                      <img
                        src={`${p.image.base}-720.webp`}
                        srcSet={`${p.image.base}-720.webp 720w, ${p.image.base}-1280.webp 1280w`}
                        sizes="(min-width: 960px) 36vw, 92vw"
                        width={p.image.w}
                        height={p.image.h}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <h3 className={styles.name}>{p.name}</h3>
                  <p className={styles.fit}>{p.fit}</p>
                  <p className={styles.price}>
                    <span className={styles.amount}>{p.price}</span>
                    <span className={styles.unit}>{p.unit}</span>
                  </p>
                  <ul className={styles.features}>
                    {p.features.map((f) => (
                      <li key={f}>
                        <Spark className={styles.spark} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`btn ${p.featured ? "btn-primary" : styles.planBtn}`}>
                    {p.action}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className={styles.preview}>
          {pricing.preview.lead}{" "}
          <a href={pricing.preview.href} className={styles.previewLink}>
            {pricing.preview.label}
          </a>
        </p>
      </div>
    </section>
  );
}
