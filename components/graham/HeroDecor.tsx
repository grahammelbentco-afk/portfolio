import styles from "./Hero.module.css";

/**
 * One quiet device around Graham's three cards: dashed connectors that read
 * Design → Market → Conversion. Coordinates are the cards' own (100 units = the
 * visual's width; cards: Design 0–62 × 0–34.9, Market 38–100 × 37.9–72.8,
 * Conversion 14–76 × 75.8–110.7). Decorative only.
 */
export default function HeroDecor() {
  return (
    <svg className={styles.decor} viewBox="0 0 100 110.7" aria-hidden="true" focusable="false" data-intro="decor">
      <g className={styles.flow}>
        <path d="M62 24 C 74 24, 84 28, 84 37.9" />
        <path d="M38 62 C 30 62, 26 68, 26 75.8" />
      </g>
      <g className={styles.nodes}>
        <circle cx="62" cy="24" r="0.8" />
        <circle cx="84" cy="37.9" r="0.8" />
        <circle cx="38" cy="62" r="0.8" />
        <circle cx="26" cy="75.8" r="0.8" />
      </g>
    </svg>
  );
}
