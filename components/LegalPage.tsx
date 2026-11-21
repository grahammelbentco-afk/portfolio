import Link from "next/link";
import { legal, site } from "@/content/homepage";
import styles from "./LegalPage.module.css";

type Doc = (typeof legal)["privacy" | "terms"];

/** Privacy and terms: one plain reading page on the dark ground, linked from the footer. */
export default function LegalPage({ doc }: { doc: Doc }) {
  return (
    <main className={styles.page} data-ground="dark">
      <div className={`container ${styles.inner}`}>
        <Link className={styles.home} href="/">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3.5M7.5 4l-4 4 4 4" /></svg>
          {site.name}
        </Link>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.updated}>Last updated {legal.updated}</p>
        <p className={styles.intro}>{doc.intro}</p>
        {doc.sections.map(({ h, p }) => (
          <section key={h} className={styles.section}>
            <h2>{h}</h2>
            {p.map((text) => <p key={text}>{text}</p>)}
          </section>
        ))}
      </div>
    </main>
  );
}
