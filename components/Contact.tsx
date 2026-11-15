"use client";

import { useEffect, useState, type FormEvent } from "react";
import Eyebrow from "./Eyebrow";
import { contact } from "@/content/homepage";
import Spark from "./Spark";
import styles from "./Contact.module.css";

/**
 * Contact (Graham's reference: "Tell us your win"). No form service is connected yet, so
 * sending opens the visitor's own email app with the request filled in: nothing is lost
 * and nothing pretends to send. The website field picks up ?website= from the hero switch.
 *   [ heading, three promises, email ][ form card ]
 */
export default function Contact() {
  const [website, setWebsite] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fromHero = new URLSearchParams(window.location.search).get("website");
    if (fromHero) setWebsite(fromHero);
  }, []);

  const toggle = (g: string) => setGoals((cur) => (cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Website: ${data.get("website") || "none yet"}`,
      `What the site should win: ${goals.join(", ") || "not sure yet"}`,
      "",
      String(data.get("message") || ""),
    ].join("\n");
    const subject = `Website request from ${data.get("name")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className={styles.section} data-ground="dark" data-contact aria-labelledby="contact-title">
      <svg className={styles.ripples} viewBox="0 0 600 600" aria-hidden="true" focusable="false">
        {[100, 170, 240, 310, 380, 450].map((r) => (
          <circle key={r} cx="0" cy="0" r={r} />
        ))}
      </svg>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2 id="contact-title" className={styles.title}>
            {contact.title}
          </h2>
          <ul className={styles.promises}>
            {contact.promises.map((p) => (
              <li key={p}>
                <Spark className={styles.spark} />
                {p}
              </li>
            ))}
          </ul>
          <p className={styles.direct}>
            Prefer email? <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>

        <form className={styles.form} onSubmit={onSubmit} noValidate data-contact-form>
          <div className={styles.row}>
            <label className={styles.field}>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label className={styles.field}>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
          </div>
          <label className={styles.field}>
            <span>
              Your website <em>if you have one</em>
            </span>
            <input
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="yourbusiness.com.au"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              data-contact-website
            />
          </label>
          <fieldset className={styles.goals}>
            <legend>What should the new site win you?</legend>
            <div className={styles.chips}>
              {contact.goals.map((g) => (
                <button key={g} type="button" className={styles.chip} aria-pressed={goals.includes(g)} onClick={() => toggle(g)}>
                  {g}
                </button>
              ))}
            </div>
          </fieldset>
          <label className={styles.field}>
            <span>
              Anything we should know? <em>optional</em>
            </span>
            <textarea name="message" rows={3} placeholder="Who you sell to, a site you like, what isn't working today." />
          </label>
          <button type="submit" className={`btn btn-lg btn-primary ${styles.submit}`}>
            {contact.submit}
          </button>
          <p className={styles.status} role="status">
            {sent ? contact.sent : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
