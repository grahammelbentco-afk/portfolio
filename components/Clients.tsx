import { clients } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import styles from "./Clients.module.css";

/**
 * Clients (Revision 78). Light ground; the real client logos from webleta.com run in a
 * full-width carousel that loops on its own. Each logo is a single-colour mask in Deep Water,
 * so all seven share one tone. The row is drawn twice so the loop never shows a gap; the
 * second copy is hidden from screen readers. Hover pauses it, and with reduced motion the
 * logos sit still in a centred, wrapping row.
 */
function Row({ copy }: { copy?: boolean }) {
  return (
    <ul className={styles.row} aria-hidden={copy || undefined}>
      {clients.logos.map((l) => (
        <li key={l.id} className={styles.item} data-client={copy ? undefined : l.id}>
          <span
            className={styles.logo}
            role={copy ? undefined : "img"}
            aria-label={copy ? undefined : l.name}
            style={{ "--logo": `url(/brands/clients/${l.id}.png)`, "--ar": l.ar, "--s": l.scale ?? 1 } as React.CSSProperties}
          />
        </li>
      ))}
    </ul>
  );
}

export default function Clients() {
  return (
    <section id="clients" className={styles.section} data-ground="light" data-clients aria-labelledby="clients-title">
      <div className={`container ${styles.head}`}>
        <div>
          <Eyebrow>{clients.eyebrow}</Eyebrow>
          <h2 id="clients-title" className="sec-title">
            {clients.title.solid} <span className="outline-type">{clients.title.outline}</span>
          </h2>
        </div>
        <a href={clients.next.href} className={styles.next}>
          {clients.next.lead}? <span>{clients.next.label}</span>
        </a>
      </div>

      <div className={styles.marquee} data-clients-track>
        <div className={styles.track}>
          <Row />
          <Row copy />
        </div>
      </div>
    </section>
  );
}
