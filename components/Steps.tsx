"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import { contact, steps } from "@/content/homepage";
import styles from "./Steps.module.css";

/**
 * Steps (Revision 56): the free preview offer, built to convert. One Seafoam panel:
 *   [ heading                             intro               ]
 *   [ before/after compare              | three-step request  ]
 *   [ 1 Free preview → 2 Plan the pages → 3 Build and launch  ]
 * The request asks one thing at a time: website, goal, then where to send it. No form
 * service is connected yet, so sending opens the visitor's email app (as Contact does).
 * The website step picks up ?website= and the hero's webleta:website event.
 * Tidewell Physio is a fictional example client.
 */

const GOAL_ICONS: Record<string, ReactNode> = {
  calls: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2" />,
  bookings: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4M8.5 14.5l2 2 4-4" />
    </>
  ),
  sales: (
    <>
      <path d="M5 8h14l-1.2 11.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8z" />
      <path d="M9 8V6.5a3 3 0 016 0V8" />
    </>
  ),
  quotes: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M9 3.5V5h6V3.5M8.5 10h7M8.5 13.5h7M8.5 17h4" />
    </>
  ),
};

export default function Steps() {
  const [split, setSplit] = useState<number>(steps.compare.start);
  const c = steps.compare;
  const p = c.preview;
  const f = steps.form;

  // ---- Multistep request ----
  const [step, setStep] = useState(0);
  const [website, setWebsite] = useState("");
  const [goal, setGoal] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const headings = useRef<(HTMLHeadingElement | null)[]>([]);
  const moved = useRef(false);

  useEffect(() => {
    const fromHero = new URLSearchParams(window.location.search).get("website");
    if (fromHero) setWebsite(fromHero);
    const onHero = (e: Event) => {
      const v = (e as CustomEvent<string>).detail;
      if (v) setWebsite(v);
    };
    window.addEventListener("webleta:website", onHero);
    return () => window.removeEventListener("webleta:website", onHero);
  }, []);

  // Move focus to the new step's question, but only after the visitor has moved.
  useEffect(() => {
    if (moved.current) headings.current[step]?.focus();
  }, [step]);

  const check = (): string => {
    if (step === 0 && !website.trim()) return "Add your website or business name to continue.";
    if (step === 1 && !goal) return "Pick one to continue.";
    if (step === 2) {
      if (!name.trim()) return "Add your name so we know who to write to.";
      if (!/^\S+@\S+\.\S+$/.test(email.trim())) return "Add an email address we can send the preview to.";
    }
    return "";
  };

  const go = (to: number) => {
    moved.current = true;
    setError("");
    setStep(to);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const problem = check();
    if (problem) {
      setError(problem);
      return;
    }
    if (step < 2) {
      go(step + 1);
      return;
    }
    const goalLabel = f.goals.find((g) => g.id === goal)?.label ?? goal;
    const body = [`Name: ${name}`, `Website: ${website}`, `Wants: ${goalLabel}`, `Email: ${email}`].join("\n");
    const subject = `Free preview request: ${website}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const question = (i: number) => (
    <div className={styles.q}>
      <h4
        className={styles.qTitle}
        id={`steps-q-${i}`}
        tabIndex={-1}
        ref={(el) => {
          headings.current[i] = el;
        }}
      >
        {f.steps[i].title}
      </h4>
      <p className={styles.qHint}>{f.steps[i].hint}</p>
    </div>
  );

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

            <form className={styles.form} onSubmit={onSubmit} noValidate aria-labelledby="steps-form-title" data-steps-form data-step={step}>
              <div className={styles.formHead}>
                <h3 id="steps-form-title" className={styles.formTitle}>
                  {f.title}
                </h3>
                <p className={styles.formReply}>{f.reply}</p>
              </div>

              <div className={styles.progress}>
                <span className="sr-only" aria-live="polite">
                  {f.progress} {step + 1} of {f.steps.length}: {f.steps[step].label}
                </span>
                <ol className={styles.progressBar} aria-hidden="true">
                  {f.steps.map((st, i) => (
                    <li key={st.label} data-done={i < step || undefined} data-now={i === step || undefined}>
                      {st.label}
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.stepBody} key={step}>
                {step === 0 && (
                  <>
                    {question(0)}
                    <label className={styles.field}>
                      <span className="sr-only">Your website or business name</span>
                      <input
                        name="website"
                        type="text"
                        inputMode="url"
                        autoComplete="url"
                        placeholder="yourbusiness.com.au"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        aria-invalid={!!error || undefined}
                        aria-describedby={error ? "steps-error" : undefined}
                        data-steps-website
                      />
                    </label>
                  </>
                )}

                {step === 1 && (
                  <fieldset className={styles.goals} aria-labelledby="steps-q-1" aria-describedby={error ? "steps-error" : undefined}>
                    {question(1)}
                    <div className={styles.goalGrid}>
                      {f.goals.map((g) => (
                        <label key={g.id} className={styles.goal}>
                          <input type="radio" name="goal" value={g.id} checked={goal === g.id} onChange={() => setGoal(g.id)} />
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            {GOAL_ICONS[g.id]}
                          </svg>
                          <b>{g.label}</b>
                          <span>{g.note}</span>
                          <i className={styles.tick} aria-hidden="true">
                            <svg viewBox="0 0 16 16">
                              <path d="M3.5 8.5l3 3 6-7" />
                            </svg>
                          </i>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <>
                    {question(2)}
                    <div className={styles.pair}>
                      <label className={styles.field}>
                        <span>Your name</span>
                        <input name="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                      </label>
                      <label className={styles.field}>
                        <span>Email</span>
                        <input name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </label>
                    </div>
                  </>
                )}

                <p className={styles.error} id="steps-error" role="alert">
                  {error}
                </p>
              </div>

              <div className={styles.actions}>
                {step > 0 && (
                  <button type="button" className={styles.back} onClick={() => go(step - 1)}>
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M10 3.5L5.5 8l4.5 4.5" />
                    </svg>
                    {f.back}
                  </button>
                )}
                <button type="submit" className={`btn btn-lg btn-primary ${styles.submit}`} data-steps-next>
                  {step < 2 ? f.next : f.submit}
                </button>
              </div>
              <p className={styles.trust}>{f.trust}</p>
              <p className={styles.status} role="status">
                {sent ? f.sent : ""}
              </p>
            </form>
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
