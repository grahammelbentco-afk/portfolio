"use client";

import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import type { Audience } from "@/content/homepage";
import styles from "./ServiceSwitch.module.css";

const ICONS: Record<string, string> = {
  // A shopfront, for local businesses
  business: "M3 9.5 4.5 4h15L21 9.5M3 9.5c0 1.4 1.1 2.5 2.5 2.5S8 10.9 8 9.5m-5 0h18m-13 0c0 1.4 1.1 2.5 2.5 2.5h1c1.4 0 2.5-1.1 2.5-2.5m0 0c0 1.4 1.1 2.5 2.5 2.5S21 10.9 21 9.5M5 12v8h14v-8M10 20v-4h4v4",
  // Stacked layers, for agencies
  agency: "M12 3 3 7.5 12 12l9-4.5L12 3Zm-9 9 9 4.5 9-4.5M3 16.5 12 21l9-4.5",
};

/**
 * Webtec-style switch between Webleta's two kinds of client, each with its own
 * field, action and line. Tabs follow the ARIA tabs pattern (arrow keys move).
 * No form service exists yet: submitting takes the visitor to the contact section.
 */
export default function ServiceSwitch({
  audiences,
  secondary,
}: {
  audiences: Audience[];
  secondary: { label: string; href: string };
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const current = audiences[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + audiences.length) % audiences.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  // Carries the typed URL to the next step as ?website=, then moves to the action's target.
  // No form service is connected yet, so nothing is sent anywhere.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const website = String(new FormData(event.currentTarget).get("website") ?? "").trim();
    const url = new URL(window.location.href);
    if (website) url.searchParams.set("website", website);
    else url.searchParams.delete("website");
    url.hash = current.href;
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    // Lets the preview form further down fill in the website without a reload.
    window.dispatchEvent(new CustomEvent("webleta:website", { detail: website }));
    document.getElementById(current.href.replace(/^#/, ""))?.scrollIntoView();
  };

  return (
    <div className={styles.switch}>
      <div className={styles.tabs} role="tablist" aria-label="Who it's for" onKeyDown={onKeyDown}>
        {audiences.map((audience, i) => (
          <button
            key={audience.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${audience.id}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
              <path d={ICONS[audience.id]} />
            </svg>
            {audience.label}
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${current.id}`} className={styles.panel}>
        {current.field ? (
          <form className={styles.field} onSubmit={onSubmit}>
            <label htmlFor={`${id}-input`} className="sr-only">
              {current.field.label}
            </label>
            <input
              id={`${id}-input`}
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder={current.field.placeholder}
              className={styles.input}
            />
            <button type="submit" className={`btn btn-primary ${styles.submit}`}>
              {current.action}
            </button>
          </form>
        ) : (
          <a href={current.href} className={`btn btn-primary ${styles.submit} ${styles.solo}`}>
            {current.action}
          </a>
        )}
        <p className={styles.note}>
          {current.note} Or <a href={secondary.href}>{secondary.label.toLowerCase()}</a>.
        </p>
      </div>
    </div>
  );
}
