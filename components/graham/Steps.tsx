"use client";

import { useState } from "react";
import Eyebrow from "./Eyebrow";
import { steps } from "@/content/graham/homepage";
import RequestForm from "./RequestForm";
import styles from "./Steps.module.css";

/**
 * Steps (Revision 56): the free preview offer, built to convert. One Seafoam panel:
 *   [ heading                             intro               ]
 *   [ before/after compare              | three-step request  ]
 *   [ 1 Free preview → 2 Plan the pages → 3 Build and launch  ]
 * The request asks one thing at a time: website, goal, then where to send it. It's the
 * shared RequestForm (also used by Contact).
 * Tidewell Physio is a fictional example client.
 */

export default function Steps() {
  const [split, setSplit] = useState<number>(steps.compare.start);
  const c = steps.compare;
  const p = c.preview;
  const f = steps.form;

  return (
    <section id="steps" className={styles.section} data-ground="light" data-steps aria-labelledby="steps-title">
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.head}>
            <Eyebrow>{steps.eyebrow}</Eyebrow>
            <h2 id="steps-title" className={styles.title}>
              {steps.title.solid} <span className="outline-type">{steps.title.outline}</span>
            </h2>
            <p className={styles.intro}>{steps.intro}</p>
          </div>

          <div className={styles.body}>
            <figure className={styles.compare} style={{ "--split": `${split}%` } as React.CSSProperties}>
              <div className={styles.chrome} aria-hidden="true">
                <span className={styles.dots}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.url}>
                  <svg viewBox="0 0 16 16">
                    <rect x="3.5" y="7" width="9" height="7" rx="1.5" fill="currentColor" />
                    <path d="M5.5 7V5a2.5 2.5 0 015 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  {c.url}
                </span>
              </div>

              <div className={styles.stage} aria-hidden="true">
                {/* Today: the dated template most local sites share. */}
                <div className={`${styles.site} ${styles.before}`}>
                  <div className={styles.bTop}>
                    <span>{c.today.phone}</span>
                    <span>{c.today.hours}</span>
                  </div>
                  <div className={styles.bNav}>
                    <span className={styles.bLogo}>
                      <i />
                      {c.today.name}
                    </span>
                    <span className={styles.bLinks}>
                      {c.today.nav.map((x, k) => (
                        <span key={x} data-on={k === 0 || undefined}>
                          {x}
                        </span>
                      ))}
                    </span>
                    <span className={styles.bBook}>{c.today.book}</span>
                  </div>
                  <div className={styles.bBanner}>
                    <span className={styles.bArrow}>
                      <svg viewBox="0 0 12 12">
                        <path d="M7.5 2.5L4 6l3.5 3.5" />
                      </svg>
                    </span>
                    <span className={styles.bTitle}>{c.today.title}</span>
                    <span className={styles.bArrow}>
                      <svg viewBox="0 0 12 12">
                        <path d="M4.5 2.5L8 6 4.5 9.5" />
                      </svg>
                    </span>
                    <span className={styles.bDots}>
                      <i data-on />
                      <i />
                      <i />
                    </span>
                  </div>
                  <div className={styles.bServices}>
                    <span className={styles.bHeading}>{c.today.servicesTitle}</span>
                    <span className={styles.bCols}>
                      {c.today.services.map((x) => (
                        <span key={x} className={styles.bCol}>
                          <i />
                          <b>{x}</b>
                          <span className={styles.bLine} />
                          <span className={styles.bLine} data-short />
                          <u>{c.today.button}</u>
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className={styles.bFoot}>{c.today.footer}</div>
                </div>

                {/* The preview: Tidewell Physio's new homepage. */}
                <div className={`${styles.site} ${styles.after}`}>
                  <div className={styles.pAnnounce}>{p.announce}</div>

                  <div className={styles.pNav}>
                    <span className={styles.pLogo}>
                      <svg viewBox="0 0 24 24">
                        <path d="M3 15c3-5 6-5 9 0s6 5 9 0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                        <path d="M3 9c3-5 6-5 9 0s6 5 9 0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.45" />
                      </svg>
                      {p.name}
                    </span>
                    <span className={styles.pLinks}>
                      {p.nav.map((x) => (
                        <span key={x}>{x}</span>
                      ))}
                    </span>
                    <span className={styles.pPhone}>{p.phone}</span>
                    <span className={styles.pBook}>{p.book}</span>
                  </div>

                  {/* A flat butter sun rising behind the arch: the accent's one large object. */}
                  <span className={styles.pSun} />
                  {/* A fine wireframe of a knee assessment, the clinic's core service, with the
                      joint warmed in the accent. Generated by scripts/art/physio-mesh.py. */}
                  <img className={styles.pMesh} src="/images/steps-physio-mesh.svg" alt="" width={400} height={300} />

                  <div className={styles.pArch}>
                    <img
                      src={`${p.image.base}-600.webp`}
                      srcSet={`${p.image.base}-600.webp 600w, ${p.image.base}-1000.webp 1000w`}
                      sizes="(min-width: 1024px) 18vw, 30vw"
                      alt=""
                      width={p.image.width}
                      height={p.image.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Today's open times, the way booking tools show them. */}
                  <div className={styles.pSlot}>
                    <span className={styles.pSlotLabel}>
                      <i />
                      {p.slot.label}
                    </span>
                    <span className={styles.pTimes}>
                      {p.slot.times.map((x, k) => (
                        <span key={x} data-first={k === 0 || undefined}>
                          {x}
                        </span>
                      ))}
                      <em>{p.slot.unit}</em>
                    </span>
                  </div>

                  <div className={styles.pHero}>
                    <span className={styles.pTitle}>
                      {p.headline.map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </span>
                    <span className={styles.pSub}>{p.sub}</span>
                    <span className={styles.pActions}>
                      {/* Split CTA: the label, then a butter cap with a calendar. */}
                      <span className={styles.pCta}>
                        <span>{p.cta}</span>
                        <i>
                          <svg viewBox="0 0 24 24">
                            <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
                            <path d="M3.5 10h17M8 3v4M16 3v4M8.5 14.5l2 2 4-4" />
                          </svg>
                        </i>
                      </span>
                      <span className={styles.pLink}>
                        <svg viewBox="0 0 24 24">
                          <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0113 0c0 4.8-6.5 11-6.5 11z" />
                          <circle cx="12" cy="10" r="2.3" />
                        </svg>
                        {p.link}
                      </span>
                    </span>

                    {/* Review platforms an Australian clinic shows: Google, Trustindex, HICAPS claims. */}
                    <span className={styles.pProof}>
                      <span className={styles.pProofItem}>
                        <img src="/brands/google-g.svg" alt="" width={48} height={48} />
                        <b>{p.reviews.google.score}</b>
                        <span className={styles.pStars}>
                          {[0, 1, 2, 3, 4].map((k) => (
                            <svg key={k} viewBox="0 0 20 20">
                              <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
                            </svg>
                          ))}
                        </span>
                        <span>{p.reviews.google.count}</span>
                      </span>
                      <span className={styles.pProofItem}>
                        <img src="/brands/trustindex-icon.svg" alt="" width={48} height={48} />
                        <span>{p.reviews.trustindex}</span>
                      </span>
                      <span className={styles.pProofItem}>
                        <svg className={styles.pCard} viewBox="0 0 24 24">
                          <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
                          <path d="M2.5 9.5h19M6 15h4" />
                        </svg>
                        <span>{p.reviews.claims}</span>
                      </span>
                    </span>
                  </div>

                  {/* Three clinics with today's hours, on a eucalyptus band. */}
                  <div className={styles.pClinics}>
                    {p.clinics.map((k) => (
                      <span key={k.name}>
                        <b>{k.name}</b>
                        <span>{k.hours}</span>
                        <svg viewBox="0 0 16 16">
                          <path d="M4 12L12 4M6 4h6v6" />
                        </svg>
                      </span>
                    ))}
                  </div>
                </div>

                <span className={styles.handle}>
                  <svg viewBox="0 0 24 24">
                    <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

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
              <figcaption className={styles.caption}>
                <span className={styles.tagBefore} aria-hidden="true">
                  {c.before}
                </span>
                <span className={styles.hint}>{c.hint}</span>
                <span className={styles.tagAfter} aria-hidden="true">
                  {c.after}
                </span>
              </figcaption>
            </figure>

            <RequestForm copy={f} hook="steps" />
          </div>

          <ol className={styles.steps} data-steps-list>
            {steps.items.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <span className={styles.num} aria-hidden="true">
                  {i + 1}
                </span>
                {i < steps.items.length - 1 && (
                  <svg className={styles.next} viewBox="0 0 32 16" aria-hidden="true">
                    <path d="M1 8h28M23 2l6 6-6 6" />
                  </svg>
                )}
                <div className={styles.stepCopy}>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepText}>{s.text}</p>
                  <p className={styles.pay} data-paid={i === steps.items.length - 1 || undefined}>
                    <span className="sr-only">You pay: </span>
                    {s.pay}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
