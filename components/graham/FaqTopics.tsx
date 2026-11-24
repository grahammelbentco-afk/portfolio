"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Faq.module.css";

/**
 * The FAQ's topic bar: sticky at the top of the questions column, each chip jumps to its
 * group and the chip for the group you're reading is marked current (aria-current). Once
 * stuck under the header it lifts off the list a little (data-stuck, styled in Faq.module.css).
 */
export default function FaqTopics({ topics }: { topics: { id: string; title: string; count: number }[] }) {
  const [active, setActive] = useState(topics[0]?.id);
  const [stuck, setStuck] = useState(false);
  const sentinel = useRef<HTMLSpanElement>(null);

  // A zero-height marker just above the bar: once it scrolls under the header, the bar is
  // stuck and lifts off the list.
  useEffect(() => {
    const el = sentinel.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < header + 1), {
      rootMargin: `-${header + 1}px 0px 0px 0px`,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const groups = topics.map((t) => document.getElementById(`faq-${t.id}`)).filter((g): g is HTMLElement => !!g);
    if (!groups.length || !("IntersectionObserver" in window)) return;
    // A group counts as current while it crosses a band just under the sticky bar.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id.replace("faq-", ""));
      },
      { rootMargin: "-160px 0px -55% 0px" },
    );
    groups.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, [topics]);

  return (
    <>
    <span ref={sentinel} className={styles.sentinel} aria-hidden="true" />
    <nav aria-label="FAQ topics" className={styles.topics} data-stuck={stuck || undefined}>
      <ul>
        {topics.map((t) => (
          <li key={t.id}>
            <a href={`#faq-${t.id}`} aria-current={active === t.id ? "true" : undefined} onClick={() => setActive(t.id)}>
              {t.title}
              <span className={styles.count}>{t.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
    </>
  );
}
