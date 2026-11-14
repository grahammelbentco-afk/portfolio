import { clients } from "@/content/homepage";
import styles from "./Clients.module.css";

/**
 * Clients (Graham: "Logos of company we previously worked with"; reference: a dark logo
 * strip). No logo files exist yet, so each name is set in type with its own character,
 * all in one muted tone so no single mark shouts. Swap in real SVG logos when cleared.
 */
export default function Clients() {
  return (
    <section id="clients" className={styles.section} data-ground="dark" data-clients aria-labelledby="clients-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="clients-title" className={styles.title}>
          {clients.title}
        </h2>
        <ul className={styles.marks}>
          {clients.names.map((c) => (
            <li key={c.name} className={styles.mark} data-style={c.style}>
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
