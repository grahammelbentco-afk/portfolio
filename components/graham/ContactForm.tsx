"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/graham/homepage";
import steps from "./Steps.module.css";
import styles from "./Contact.module.css";

type State = "idle" | "sending" | "sent" | "error";

/**
 * The old webleta.com contact form: first and last name, email and message, posted to the
 * same Web3Forms inbox (its access key is public by design and was already in the old page).
 * Card and field styles are the request form's (Steps.module.css).
 */
export default function ContactForm({ className }: { className?: string }) {
  const f = contact.message;
  const [state, setState] = useState<State>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState("sending");
    try {
      const res = await fetch(f.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...f.hidden, ...Object.fromEntries(new FormData(form)) }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("not sent");
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <form className={`${steps.form} ${className ?? ""}`} onSubmit={onSubmit} noValidate={false} data-contact-form>
      {/* Honeypot: hidden from people, bots fill it and Web3Forms drops the message. */}
      <input type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className={steps.pair}>
        <label className={steps.field}>
          <span className="sr-only">{f.firstName}</span>
          <input name="first_name" type="text" autoComplete="given-name" placeholder={f.firstName} required />
        </label>
        <label className={steps.field}>
          <span className="sr-only">{f.lastName}</span>
          <input name="last_name" type="text" autoComplete="family-name" placeholder={f.lastName} required />
        </label>
      </div>
      <label className={steps.field}>
        <span className="sr-only">{f.email}</span>
        <input name="email" type="email" autoComplete="email" placeholder={f.email} required />
      </label>
      <label className={steps.field}>
        <span className="sr-only">{f.message}</span>
        <textarea className={styles.message} name="message" rows={5} placeholder={f.message} required />
      </label>
      <button type="submit" className="btn btn-lg btn-primary" disabled={state === "sending"}>
        {state === "sending" ? f.sending : f.submit}
      </button>
      <p className={steps.status} role="status">
        {state === "sent" ? f.sent : state === "error" ? f.failed : ""}
      </p>
    </form>
  );
}
