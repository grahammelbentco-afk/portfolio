import { clients } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import styles from "./Clients.module.css";

/**
 * Clients (Revision 74). The real client logos from webleta.com on a 4 x 2 wall of flat
 * tiles: each logo is a single-colour mask, so all seven share one quiet tone and step up
 * to Seafoam on hover. The eighth tile is the open slot, a Seafoam call to the free preview.
 */
export default function Clients() {
  return (
    <section id="clients" className={styles.section} data-ground="dark" data-clients aria-labelledby="clients-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <Eyebrow>{clients.eyebrow}</Eyebrow>
          <h2 id="clients-title" className="sec-title">
            {clients.title.solid} <span className="outline-type">{clients.title.outline}</span>
          </h2>
        </div>

        <ul className={styles.wall}>
          {clients.logos.map((l) => (
            <li key={l.id} className={styles.tile} data-client={l.id}>
              <span
                className={styles.logo}
                role="img"
                aria-label={l.name}
                style={{ "--logo": `url(/brands/clients/${l.id}.png)`, "--ar": l.ar, "--s": l.scale ?? 1 } as React.CSSProperties}
              />
            </li>
          ))}
          <li className={`${styles.tile} ${styles.next}`}>
            <a href={clients.next.href} className={styles.nextLink}>
              <span className={styles.nextLead}>{clients.next.lead}</span>
              <span className={styles.nextLabel}>
                {clients.next.label}
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h9M8.5 4l4 4-4 4" />
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
