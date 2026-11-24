import type { PlaceholderSection as Section } from "@/content/graham/homepage";
import styles from "./PlaceholderSection.module.css";

/**
 * Stand-in for a section that will be designed in a later phase: heading and one line.
 * What each section still needs is kept in content/homepage.ts (`needs`), not rendered.
 */
export default function PlaceholderSection({ section }: { section: Section }) {
  const headingId = `${section.id}-title`;
  const dark = section.ground === "deep";

  return (
    <section
      id={section.id}
      className={styles.section}
      data-ground={dark ? "dark" : "light"}
      data-tone={section.ground}
      aria-labelledby={headingId}
    >
      <div className={`container ${styles.inner}`}>
        <h2 id={headingId} className={styles.title}>
          {section.title}
        </h2>
        <p className={styles.intro}>{section.intro}</p>
      </div>
    </section>
  );
}
