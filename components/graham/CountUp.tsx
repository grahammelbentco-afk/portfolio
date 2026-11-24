"use client";

import { useEffect, useRef } from "react";

/**
 * A figure like "+180%", "0.9s" or "2k+" that counts up once when it scrolls into view, as
 * the old webleta.com counters did. The final value is in the HTML (no JS, reduced motion and
 * screen readers get it as is); only the visible digits run, over 1.4 s with an ease-out.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !m || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    // Already on screen at load: leave the final value alone.
    if (el.getBoundingClientRect().top < innerHeight) return;

    let frame = 0;
    const render = (n: number) => (el.textContent = `${pre}${n.toFixed(decimals)}${post}`);
    render(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          render(target * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} aria-hidden="true">
      {value}
    </span>
  );
}
