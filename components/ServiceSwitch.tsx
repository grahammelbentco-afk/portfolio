"use client";

import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import type { Audience } from "@/content/homepage";
import styles from "./ServiceSwitch.module.css";

const ICONS: Record<string, string> = {
  // A shopfront, for local businesses
  business: "M3 9.5 4.5 4h15L21 9.5M3 9.5c0 1.4 1.1 2.5 2.5 2.5S8 10.9 8 9.5m-5 0h18m-13 0c0 1.4 1.1 2.5 2.5 2.5h1c1.4 0 2.5-1.1 2.5-2.5m0 0c0 1.4 1.1 2.5 2.5 2.5S21 10.9 21 9.5M5 12v8h14v-8M10 20v-4h4v4",
  // Two people, for the digital marketing team
  team: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6.5 9a6.5 6.5 0 0 1 13 0M16 4.2a3.5 3.5 0 0 1 0 6.6M18 14a6.5 6.5 0 0 1 3.5 6",
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
    const target = audiences[active].href;
    url.hash = target;
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    // Lets the preview form further down fill in the website without a reload.
    window.dispatchEvent(new CustomEvent("webleta:website", { detail: website }));
    document.getElementById(target.replace(/^#/, ""))?.scrollIntoView();
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
            aria-controls={`${id}-panel-${audience.id}`}
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

      {/* Revision 88: every panel is rendered in one grid cell, so the block keeps the height of
          the tallest and nothing below moves when the tab changes. Inactive panels keep the
          hidden attribute (out of the accessibility tree and tab order) but hold their space. */}
      <div className={styles.panels}>
      {audiences.map((panel, i) => (
      <div
        key={panel.id}
        id={`${id}-panel-${panel.id}`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${panel.id}`}
        hidden={i !== active}
        className={styles.panel}
      >
        {panel.field ? (
          <form className={styles.field} onSubmit={onSubmit}>
            <label htmlFor={`${id}-input-${panel.id}`} className="sr-only">
              {panel.field.label}
            </label>
            <input
              id={`${id}-input-${panel.id}`}
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder={panel.field.placeholder}
              className={styles.input}
            />
            <button type="submit" className={`btn btn-primary ${styles.submit}`}>
              {panel.action}
            </button>
          </form>
        ) : (
          // Same height as the field row, so the note below sits at the same place.
          <div className={styles.soloRow}>
            <a href={panel.href} className={`btn ${styles.submit} ${styles.solo}`}>
              {panel.action}
            </a>
          </div>
        )}
        <p className={styles.note}>
          {panel.note} Or <a href={secondary.href}>{secondary.label.toLowerCase()}</a>.
        </p>
      </div>
      ))}
      </div>
    </div>
  );
}
