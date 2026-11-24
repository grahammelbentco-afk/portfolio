import { faq, linkProps } from "@/content/graham/homepage";
import Eyebrow from "./Eyebrow";
import FaqTopics from "./FaqTopics";
import Spark from "./Spark";
import styles from "./Faq.module.css";

/**
 * FAQ (Revision 85), built to be read by people, search engines and AI answer engines:
 * - every question and its full answer is in the HTML (native <details>, so closed answers
 *   are still in the page and found by in-page search);
 * - questions are headings, grouped under topic headings;
 * - FAQPage JSON-LD carries the same text.
 *   [ heading, intro              ][ Cost · Process · Ownership · Agencies    ]  (sticky)
 *   [                              ][ Cost                                     ]
 *   [                              ][  How much does a website cost?        −  ]
 *   [ ✦ The Webleta team          ][  (answer, large, on Deep Water)          ]
 *   [   Ask us directly            ][  Can I pay monthly?                   +  ]
 * One question open at a time (`name="faq"`), still with every answer in the HTML.
 * The left column and the topic bar stay in view; the bar marks the group you're reading.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.groups.flatMap((g) =>
    g.items.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  ),
};

/** The first question starts open. */
const FIRST = faq.groups[0].items[0].id;

export default function Faq() {
  return (
    <section id="faq" className={styles.section} data-ground="light" data-faq aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className={`container ${styles.layout}`}>
        <aside className={styles.side}>
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="sec-title">
            <span className={styles.line}>{faq.title.solid}</span>{" "}
            <span className={`${styles.line} outline-type`}>{faq.title.outline}</span>
          </h2>
          <p className={styles.intro}>{faq.intro}</p>
          <div className={styles.ask}>
            <span className={styles.avatar} aria-hidden="true">
              <Spark className={styles.spark} />
            </span>
            <p>
              <span className={styles.who}>{faq.signature.name}</span>
              {faq.more.lead} <a href={faq.more.href} {...linkProps(faq.more.href)}>{faq.more.label}</a>
            </p>
          </div>
        </aside>

        <div className={styles.groups}>
          <FaqTopics topics={faq.groups.map((g) => ({ id: g.id, title: g.title, count: g.items.length }))} />
          {faq.groups.map((g) => (
            <section key={g.id} id={`faq-${g.id}`} className={styles.group} aria-labelledby={`faq-${g.id}-title`}>
              <h3 id={`faq-${g.id}-title`} className={styles.groupTitle}>
                {g.title}
              </h3>
              <div className={styles.list}>
                {g.items.map((x) => {
                  return (
                    <details key={x.id} id={`faq-q-${x.id}`} name="faq" className={styles.item} open={x.id === FIRST} data-faq-item>
                      <summary className={styles.summary}>
                        <h4 className={styles.q}>{x.q}</h4>
                        <span className={styles.icon} aria-hidden="true" />
                      </summary>
                      <p className={styles.a}>{x.a}</p>
                    </details>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
