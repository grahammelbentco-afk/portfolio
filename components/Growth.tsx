"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { growth } from "@/content/homepage";
import Eyebrow from "./Eyebrow";
import SectionShader from "./SectionShader";
import styles from "./Growth.module.css";

gsap.registerPlugin(Flip, ScrollTrigger, useGSAP);

/**
 * After launch (Graham, 2026-11-22): SEO with a weekly blog post, and social branding and posting.
 *   [ SEO.                              ][ Social.                         ]
 *   [ search box, typing on a loop      ][ profile: logo, name, brand kit  ]
 *   [ results: the client climbs to #1, ][ Meta  Facebook  Instagram  X    ]
 *   [ its sitelinks are the weekly blog ][ a deck of real branded posts    ]
 * Two GSAP loops, paused off screen and on hover. Reduced motion: the client already first, the
 * first post in front. Ground: ShaderGradient plane, a slow diagonal silk.
 */

// Analogous ramp (Abyss → Harbour → Dusk Violet): neighbours on the wheel, so the blend stays
// clean. A tilted plane folding slowly, unlike the hero's Halo and Industries' water.
const SILK = {
  type: "plane",
  uAmplitude: 1,
  uDensity: 1.1,
  uFrequency: 5.5,
  uSpeed: 0.08,
  uStrength: 2.4,
  uTime: 0,
  brightness: 0.78,
  cAzimuthAngle: 180,
  cDistance: 2.7,
  cPolarAngle: 90,
  cameraZoom: 1,
  envPreset: "city",
  grain: "off",
  lightType: "3d",
  pixelDensity: 1,
  fov: 45,
  positionX: -0.6,
  positionY: 0.2,
  positionZ: 0,
  reflection: 0.1,
  rotationX: 40,
  rotationY: 0,
  rotationZ: -55,
  shader: "defaults",
  wireframe: false,
  color1: "#2468b8",
  color2: "#6a5fd0",
  color3: "#051a2d",
};

const REDUCED = "(prefers-reduced-motion: reduce)";
// The platform cycle: Instagram, YouTube, Facebook, X (indexes into social.platforms).
const CYCLE = [2, 3, 1, 4];

const R = growth.seo.report;
type Vals = { clicks: number; position: number };
const total = (v: Vals[]) => v.reduce((n, r) => n + r.clicks, 0);
// Sparkline: earlier weeks are fixed, the last point is the live total, so the line tips up as
// each query climbs. Example data, like the report around it.
// Daily visits for the active search: 28 straight segments, blended from its "before" shape to its
// "after" shape as its visits rise, scaled so the days add up to its visits. Fixed axis per search.
const SW = 300;
const SH = 64;
const ROWS = growth.seo.report.rows;
const HI = total(ROWS.map((r) => r.after));
const norm = (d: number[]) => { const s = d.reduce((n, v) => n + v, 0); return d.map((v) => v / s); };
const days = (i: number, visits: number) => {
  const r = ROWS[i];
  const f = Math.min(1, Math.max(0, (visits - r.before.clicks) / (r.after.clicks - r.before.clicks)));
  const b = norm(r.days.before);
  const a = norm(r.days.after);
  return b.map((v, k) => (v + (a[k] - v) * f) * visits);
};
const YMAX = ROWS.map((r, i) => Math.max(...days(i, r.after.clicks)) * 1.12);
const spark = (i: number, visits: number) =>
  days(i, visits).map((v, k, arr) => `${k ? "L" : "M"}${((k / (arr.length - 1)) * SW).toFixed(1)} ${(SH - (v / YMAX[i]) * SH).toFixed(1)}`).join(" ");
const sparkArea = (i: number, visits: number) => `${spark(i, visits)} L${SW} ${SH} L0 ${SH} Z`;
const growthPct = (visits: number) => `↑ ${Math.round(((visits - growth.seo.report.previous) / growth.seo.report.previous) * 100)}%`;
/** A spot on Google in plain words: 1.2 reads as "1st", 4.3 as "4th". */
const spot = (p: number) => {
  const n = Math.max(1, Math.round(p));
  return n + (n % 10 === 1 && n !== 11 ? "st" : n % 10 === 2 && n !== 12 ? "nd" : n % 10 === 3 && n !== 13 ? "rd" : "th");
};

/** The logo's shield mark, cropped from the full lockup image with CSS. */
function Mark({ className }: { className: string }) {
  return <span className={className} style={{ backgroundImage: `url(${growth.social.logo})` }} aria-hidden="true" />;
}

export default function Growth() {
  const { seo, social } = growth;
  const root = useRef<HTMLElement>(null);
  const [turn, setTurn] = useState(0);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (window.matchMedia(REDUCED).matches) return;

      // Ranking loop: type the query, load the results with the client fourth, then the client
      // climbs to first (Flip), hold, clear, next query.
      const typed = q(`.${styles.typed}`)[0] as HTMLElement;
      const list = q(`.${styles.results}`)[0] as HTMLElement;
      const rows = q(`.${styles.row}`);
      const clients = q(`.${styles.client}`);
      const totalClicks = q(`.${styles.totalClicks}`)[0] as HTMLElement;
      const delta = q(`.${styles.delta}`)[0] as HTMLElement;
      const miniRank = q(`.${styles.miniRank}`)[0] as HTMLElement;
      const miniQuery = q(`.${styles.miniQuery}`)[0] as HTMLElement;
      const scenario = q(`.${styles.scenario}`)[0] as HTMLElement;
      let active = 0;
      let ranked = false; // false while a query is still being typed
      const sparkLine = root.current!.querySelector<SVGPathElement>(`.${styles.sparkLine}`)!;
      const sparkFill = root.current!.querySelector<SVGPathElement>(`.${styles.sparkFill}`)!;
      const now: Vals[] = R.rows.map((r) => ({ ...r.before }));
      const paint = () => {
        totalClicks.textContent = String(Math.round(total(now)));
        sparkLine.setAttribute("d", spark(active, now[active].clicks));
        sparkFill.setAttribute("d", sparkArea(active, now[active].clicks));
        scenario.textContent = ROWS[active].scenario;
        delta.textContent = growthPct(total(now));
        miniRank.textContent = ranked ? spot(now[active].position) : "…";
      };
      // The report answers the search: the query's row lights while it types, and when the client
      // climbs its position ticks down and its clicks count up, carrying the totals with them.
      const settle = (i: number, to: Vals, duration = 1.2) =>
        gsap.to(now[i], { ...to, duration, ease: "power3.out", onUpdate: paint });
      const focus = (i: number) => {
        active = i;
        ranked = false;
        paint();
      };
      paint();
      // The client sits below the competitors in the map pack and the web results, then climbs.
      const setClientLast = () => clients.forEach((c) => { c.style.order = "9"; c.dataset.top = ""; });
      const climb = () => {
        const state = Flip.getState(rows);
        clients.forEach((c) => { c.style.order = "0"; });
        Flip.from(state, { duration: 1.1, ease: "power3.inOut", stagger: 0.12 });
        gsap.delayedCall(0.9, () => clients.forEach((c) => { c.dataset.top = "true"; }));
      };
      setClientLast();
      gsap.set(list, { opacity: 0.25 }); // the previous results stay, dimmed, while a new query types

      // A short lead-in, so the first callbacks never sit at time 0 (GSAP can skip those when
      // a timeline repeats, which left the client stuck at first on the second pass).
      const search = gsap.timeline({ repeat: -1, paused: true }).to({}, { duration: 0.2 });
      search.call(() => R.rows.forEach((r, i) => settle(i, r.before, 0.6)));
      seo.queries.forEach((query, i) => {
        const t = { n: 0 };
        // The ranking row in the report mirrors the search box as it types.
        const write = () => {
          const text = query.slice(0, Math.round(t.n));
          typed.textContent = text;
          miniQuery.textContent = text;
        };
        search
          .call(() => { setClientLast(); focus(i); })

          .to(t, { n: query.length, duration: query.length * 0.055, ease: "none", onUpdate: write })
          .to(list, { opacity: 1, duration: 0.5, ease: "power2.out" }, "+=0.3")
          .call(() => { ranked = true; paint(); }, [], "<")
          .call(climb, [], "+=1")
          .call(() => { settle(i, R.rows[i].after); }, [], "+=0.6")
          .to(list, { opacity: 0.25, duration: 0.4, ease: "power2.in" }, "+=3.2")
          .to(t, { n: 0, duration: 0.45, ease: "none", onUpdate: write }, "<");
      });

      const shots = q(`.${styles.brandShot}`);
      gsap.set(shots.slice(1), { clipPath: "inset(0 0 0 100% round 22px)" });
      let shot = 0;
      // Every 3.2s the next platform lights: its pill, its day and its posts in the feed.
      let first = 0;
      let k = 0;
      const deck = gsap.timeline({ repeat: -1, paused: true });
      deck.to({}, { duration: 3.2 }).call(() => {
        k = (k + 1) % CYCLE.length;
        setTurn(k);
        // Every other turn the next identity shot wipes in over the current one.
        first = (first + 1) % 2;
        if (first === 0) {
          const next = (shot + 1) % shots.length;
          const prev = shots[shot];
          gsap.set(shots[next], { zIndex: 1 });
          gsap.set(prev, { zIndex: 0 });
          gsap.fromTo(shots[next], { clipPath: "inset(0 0 0 100% round 22px)" }, {
            clipPath: "inset(0 0 0 0% round 22px)",
            duration: 1.2,
            ease: "power3.inOut",
            onComplete: () => { gsap.set(prev, { clipPath: "inset(0 0 0 100% round 22px)" }); },
          });
          shot = next;
        }
      });

      const loops = [search, deck];
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 75%",
        end: "bottom top",
        onToggle: (self) => loops.forEach((l) => (self.isActive ? l.play() : l.pause())),
      });
      q(`.${styles.panel}`).forEach((p, i) => {
        p.addEventListener("pointerenter", () => loops[i].pause());
        p.addEventListener("pointerleave", () => loops[i].play());
      });
    },
    { scope: root },
  );

  const activePlatform = CYCLE[turn];

  return (
    <section ref={root} id="growth" className={styles.section} data-ground="dark" aria-labelledby="growth-title" data-reveal-skip>
      <SectionShader className={styles.shader} config={SILK} />
      <div className="container">
        <div className={styles.head}>
          <Eyebrow>{growth.eyebrow}</Eyebrow>
          <h2 id="growth-title" className={`sec-title ${styles.title}`}>
            {growth.title.solid} <span className="outline-type">{growth.title.outline}</span>
          </h2>
        </div>

        <div className={styles.grid}>
          <article className={`${styles.panel} ${styles.seo}`} aria-labelledby="growth-seo">
            <h3 id="growth-seo" className={styles.word}>{seo.word}</h3>
            <p className={styles.line}>{seo.line}</p>

            <div className={styles.engine} aria-hidden="true">
              <p className={styles.searchBox}>
                <svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5 14 14" /></svg>
                <span className={styles.typed}>{seo.queries[0]}</span>
              </p>
              <div className={styles.results}>
                <p className={styles.serpLabel}>Places</p>
                <div className={styles.pack}>
                  <ol className={styles.places}>
                    <li className={`${styles.row} ${styles.place} ${styles.client}`} data-top="true">
                      <Mark className={styles.placeLogo} />
                      <span>
                        <strong>{seo.client.name}</strong>
                        <small>{seo.place.kind} · {seo.place.area}</small>
                        <small className={styles.open}>{seo.place.status}</small>
                      </span>
                    </li>
                    {[0, 1].map((k) => (
                      <li key={k} className={`${styles.row} ${styles.place}`}>
                        <span className={styles.skelThumb} />
                        <span className={styles.skelLines}><i /><i /><i /></span>
                      </li>
                    ))}
                  </ol>
                  <img className={styles.map} src={seo.map} alt="" loading="lazy" decoding="async" />
                </div>
                <ol className={styles.web}>
                  <li className={`${styles.row} ${styles.client}`} data-top="true">
                    <span className={styles.site}>
                      <Mark className={styles.favicon} />
                      <span>{seo.client.name}<small>https://{seo.client.url}</small></span>
                    </span>
                    <span className={styles.resultTitle}>{seo.client.title}</span>
                    <span className={styles.desc}>{seo.client.description}</span>
                    <span className={styles.pages}>
                      {seo.client.pages.map((pg) => (
                        <span key={pg.title}><b>{pg.title}</b><small>{pg.note}</small></span>
                      ))}
                    </span>
                  </li>
                  {[0].map((k) => (
                    <li key={k} className={`${styles.row} ${styles.skelResult}`}>
                      <span className={styles.skelSite}><span className={styles.skelDot} /><span className={styles.skelLines}><i /><i /></span></span>
                      <span className={styles.skelLines}><i /><i /></span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <figure className={styles.report} aria-label={`${R.totals.clicks}, ${R.period}`}>
              <figcaption className={styles.reportHead}>
                <span>{R.totals.clicks}</span>
                <small>{R.period}</small>
              </figcaption>
              <p className={styles.big}>
                <strong className={styles.totalClicks}>{total(R.rows.map((r) => r.after))}</strong>
                <span className={styles.delta}>{growthPct(HI)}</span>
              </p>
              <ol className={styles.mini} aria-hidden="true">
                <li>
                  <span className={styles.miniRank}>{spot(R.rows[0].after.position)}</span>
                  <span className={styles.miniQuery}>{seo.queries[0]}</span>
                </li>
                <li><span className={styles.miniSkel} style={{ width: "22px" }} /><span className={styles.miniSkel} style={{ width: "62%" }} /></li>
                <li><span className={styles.miniSkel} style={{ width: "22px" }} /><span className={styles.miniSkel} style={{ width: "46%" }} /></li>
              </ol>
              <span className={styles.scenario}>{ROWS[0].scenario}</span>
              <svg className={styles.spark} viewBox={`-6 -8 ${SW + 12} ${SH + 12}`} preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="growth-spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#5fd3a0" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#5fd3a0" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className={styles.sparkFill} d={sparkArea(0, ROWS[0].after.clicks)} fill="url(#growth-spark)" />
                <path className={styles.sparkLine} d={spark(0, ROWS[0].after.clicks)} />
              </svg>
            </figure>
          </article>

          <article className={`${styles.panel} ${styles.social}`} aria-labelledby="growth-social">
            <h3 id="growth-social" className={styles.word}>{social.word}</h3>
            <p className={styles.line}>{social.line}</p>

            <ul className={styles.platforms} aria-label="Platforms we post to">
              {social.platforms.map((p, i) => {
                // Meta lights with Facebook and Instagram, the two it runs.
                const on = i === activePlatform || (p.slug === "meta" && (activePlatform === 1 || activePlatform === 2));
                return (
                  <li key={p.slug} data-on={on || undefined}>
                    <span className={styles.icon} style={{ maskImage: `url(/brands/si/${p.slug}.svg)` }} />
                    {p.name}
                  </li>
                );
              })}
            </ul>

            <div className={styles.stage}>
              {social.brand.map((b, i) => (
                <img key={b.src} className={styles.brandShot} src={b.src} alt={b.alt} loading="lazy" decoding="async" data-first={i === 0 || undefined} />
              ))}
            </div>

            {/* The week's posts run past in a slow strip; posts on the lit platform come forward. */}
            <div className={styles.feed} aria-label="Example posts">
              <ul className={styles.feedTrack}>
                {[0, 1].map((copy) =>
                  social.posts.map((pst) => {
                    const pl = social.platforms[pst.platform];
                    return (
                      <li key={copy + pst.src} className={styles.post} data-shape={pst.shape} data-on={pst.platform === activePlatform || undefined} aria-hidden={copy ? true : undefined}>
                        <img src={pst.src} alt={copy ? "" : pst.alt} loading="lazy" decoding="async" />
                        <span className={styles.badge} title={pl.name}>
                          <span className={styles.icon} style={{ maskImage: `url(/brands/si/${pl.slug}.svg)` }} />
                        </span>
                      </li>
                    );
                  }),
                )}
              </ul>
            </div>
            <ol className={styles.schedule} aria-label="This week's posts">
              {social.schedule.map((d) => {
                const p = social.platforms[d.platform];
                return (
                  <li key={d.day} data-on={d.platform === activePlatform || undefined}>
                    <strong>{d.day}</strong>
                    <span className={styles.icon} style={{ maskImage: `url(/brands/si/${p.slug}.svg)` }} />
                    <span className={styles.dayName}>{p.name}</span>
                  </li>
                );
              })}
            </ol>
            <p className={styles.scope}>{social.scope}</p>
          </article>
        </div>

        <a className={`btn btn-light ${styles.cta}`} href={growth.cta.href}>{growth.cta.label}</a>
      </div>
    </section>
  );
}
