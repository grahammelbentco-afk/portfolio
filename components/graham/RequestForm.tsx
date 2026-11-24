"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { contact, type RequestFormCopy } from "@/content/graham/homepage";
import styles from "./Steps.module.css";

/**
 * The three-step request (Revision 56, shared from Revision 76): website, goal, then where to
 * reply, one question at a time. Used by Steps (free preview) and Contact (project request)
 * with their own copy; the design and its CSS live in Steps.module.css.
 * No form service is connected yet, so sending opens the visitor's email app with the request
 * filled in. The website step picks up ?website= and the hero's webleta:website event.
 * `hook` names the QA data attributes (data-{hook}-form, -website, -next).
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

export default function RequestForm({ copy: f, hook, className }: { copy: RequestFormCopy; hook: string; className?: string }) {
  const [step, setStep] = useState(0);
  const [website, setWebsite] = useState("");
  const [goal, setGoal] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const headings = useRef<(HTMLHeadingElement | null)[]>([]);
  const moved = useRef(false);
  const id = (s: string) => `${hook}-${s}`;
  const data = (s: string) => ({ [`data-${hook}-${s}`]: "" });

  useEffect(() => {
    const fromHero = new URLSearchParams(window.location.search).get("website");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the query parameter is read after hydration to preserve static-export behavior
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
    if (step === 0 && !website.trim()) return f.errors.website;
    if (step === 1 && !goal) return "Pick one to continue.";
    if (step === 2) {
      if (!name.trim()) return "Add your name so we know who to write to.";
      if (!/^\S+@\S+\.\S+$/.test(email.trim())) return f.errors.email;
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
    const subject = `${f.subject}: ${website}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const question = (i: number) => (
    <div className={styles.q}>
      <h4
        className={styles.qTitle}
        id={id(`q-${i}`)}
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
    <form
      className={`${styles.form} ${className ?? ""}`}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={id("form-title")}
      data-step={step}
      {...data("form")}
    >
      <div className={styles.formHead}>
        <h3 id={id("form-title")} className={styles.formTitle}>
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
                aria-describedby={error ? id("error") : undefined}
                {...data("website")}
              />
            </label>
          </>
        )}

        {step === 1 && (
          <fieldset className={styles.goals} aria-labelledby={id("q-1")} aria-describedby={error ? id("error") : undefined}>
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

        <p className={styles.error} id={id("error")} role="alert">
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
        <button type="submit" className={`btn btn-lg btn-primary ${styles.submit}`} {...data("next")}>
          {step < 2 ? f.next : f.submit}
        </button>
      </div>
      <p className={styles.trust}>{f.trust}</p>
      <p className={styles.status} role="status">
        {sent ? f.sent : ""}
      </p>
    </form>
  );
}
