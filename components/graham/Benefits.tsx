"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { benefits, type Benefit, type BenefitVisual } from "@/content/graham/homepage";
import styles from "./Benefits.module.css";
import WhatsAppIcon from "./WhatsAppIcon";

const SPARK = "M194.14 64.05L124.73 219.94A92 92 0 0 0 194.14 64.05Z";

const PHONE_ICON =
  "M5.2 2.5l1.6 3-1.3 1.2a8 8 0 003.8 3.8l1.2-1.3 3 1.6-.6 2.3a1.4 1.4 0 01-1.5 1A11.5 11.5 0 012 4.6a1.4 1.4 0 011-1.5z";

function Spark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="134 34 102 164" aria-hidden="true">
      <path d={SPARK} transform="translate(12 -26)" />
    </svg>
  );
}

/**
 * The moment each benefit happens, as a real-world object (Jasper: like the receipt): a
 * desk-calendar page, a blueprint, a shipping label, a case folder, a rosette, a call log. Decorative (the title and text carry
 * the meaning); dates and amounts are illustrative examples (see content/homepage.ts).
 */
function Note({ kind }: { kind: BenefitVisual }) {
  if (kind === "booking") {
    // Three weeks of March as blank tiles: other bookings filled, the 14th booked and named.
    const taken = new Set([1, 4, 5, 9, 12, 17, 19]);
    return (
      <div className={`${styles.obj} ${styles.calPage}`} data-pop>
        <span className={styles.calBind}>
          <i />
          <b>March</b>
          <i />
        </span>
        <span className={styles.month}>
          {Array.from({ length: 21 }, (_, i) =>
            i === 5 ? (
              <span key={i} className={styles.booked}>
                14
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ) : (
              <span key={i} data-taken={taken.has(i) ? "true" : undefined} />
            ),
          )}
        </span>
        <span className={styles.objSmall}>Party band booked</span>
      </div>
    );
  }
  if (kind === "quote")
    return (
      <div className={`${styles.obj} ${styles.blueprint}`} data-pop>
        <span className={styles.objSmall}>Site plan</span>
        <span className={styles.objBig}>40 racks</span>
        <span className={styles.objSmall}>Quote sent · 2 photos</span>
        <svg className={styles.planMark} viewBox="0 0 60 40" aria-hidden="true">
          {[6, 18, 30, 42, 54].map((x) => (
            <path key={x} d={`M${x} 34V14a6 6 0 0112 0`} />
          ))}
        </svg>
      </div>
    );
  if (kind === "order")
    // The product page's card: the mug on the receipt (fal photo, 2026-11-18).
    return (
      <div className={`${styles.obj} ${styles.product}`} data-pop>
        <img src="/images/benefits/product-mug.webp" width={480} height={480} alt="" loading="lazy" decoding="async" />
        <span className={styles.productRow}>
          <span className={styles.objStrong}>Speckled mug</span>
          <b className={styles.productPrice}>$28</b>
        </span>
        <span className={styles.cartBtn}>Add to cart</span>
      </div>
    );
  if (kind === "trust")
    // A manila case folder with a consult sheet and a Confirmed stamp.
    return (
      <div className={styles.folder} data-pop>
        <span className={styles.folderTab}>Family law</span>
        <span className={styles.folderSheet}>
          <span className={styles.objSmall}>Consultation</span>
          <span className={styles.objStrong}>Tue 10:00</span>
        </span>
        <svg className={styles.rubber} viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <filter id="stamp-ink">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
              <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.75" />
              <feComposite in="SourceGraphic" operator="in" />
            </filter>
            <path id="stamp-ring" d="M60 60m-41 0a41 41 0 1 1 82 0a41 41 0 1 1 -82 0" />
          </defs>
          <g filter="url(#stamp-ink)">
            <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="4" />
            <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text className={styles.rubberRing}>
              <textPath href="#stamp-ring" startOffset="0">
                CONSULT · TUE 10:00 · CONSULT · TUE 10:00 ·
              </textPath>
            </text>
            <rect x="2" y="47" width="116" height="26" fill="#fff" />
            <rect x="2" y="47" width="116" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <text x="60" y="67" textAnchor="middle">
              CONFIRMED
            </text>
          </g>
        </svg>
      </div>
    );
  if (kind === "search")
    // A first-place rosette pinned to the results.
    return (
      <div className={styles.rosette} data-pop>
        <i className={styles.tails} />
        <span className={styles.medal}>
          <b>#1</b>
          <span>near you</span>
        </span>
      </div>
    );
  // call: today's call log, every call from the website.
  return (
    <div className={`${styles.obj} ${styles.callLog}`} data-pop>
      <span className={styles.objSmall}>Calls via WhatsApp</span>
      <span className={styles.objBig}>3 today</span>
      {[
        ["Last: 2:05 pm", "4 min"],
      ].map(([time, len]) => (
        <span key={time} className={styles.logRow}>
          <svg viewBox="0 0 16 16">
            <path d={PHONE_ICON} fill="currentColor" />
          </svg>
          <span>{time}</span>
          <span className={styles.objSmall}>{len}</span>
        </span>
      ))}
    </div>
  );
}

/**
 * A faint motif per card, matched to its subject and set in the card's open space (sales has
 * its spark in the art): a waveform, a dimension line, a section mark, a dial pad, a compass.
 */
function Decor({ kind }: { kind: BenefitVisual }) {
  if (kind === "booking")
    return (
      <svg className={styles.decor} data-kind="wave" viewBox="0 0 240 40" aria-hidden="true">
        <path d="M0 20c10 0 10-14 20-14s10 28 20 28 10-22 20-22 10 16 20 16 10-26 20-26 10 34 20 34 10-18 20-18 10 10 20 10 10-6 20-6 10 2 20 2 10 0 20 0" />
      </svg>
    );
  if (kind === "quote")
    return (
      <svg className={styles.decor} data-kind="dimension" viewBox="0 0 200 40" aria-hidden="true">
        <path d="M4 20H196M4 10v20M196 10v20M4 20l8-4M4 20l8 4M196 20l-8-4M196 20l-8 4" />
        <text x="100" y="12" textAnchor="middle">4.8 m</text>
      </svg>
    );
  if (kind === "trust")
    return (
      <svg className={styles.decor} data-kind="section" viewBox="0 0 100 140" aria-hidden="true">
        <text x="50" y="112" textAnchor="middle">§</text>
      </svg>
    );
  if (kind === "call")
    return (
      <svg className={styles.decor} data-kind="dial" viewBox="0 0 60 80" aria-hidden="true">
        {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={10 + c * 20} cy={10 + r * 20} r="2.5" />))}
      </svg>
    );
  if (kind === "search")
    return (
      <svg className={styles.decor} data-kind="compass" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="88" />
        <circle cx="100" cy="100" r="70" strokeDasharray="2 6" />
        <path d="M100 18l12 70 70 12-70 12-12 70-12-70-70-12 70-12z" />
        <path d="M100 60l6 34-6 6-6-6z" data-n="true" />
        <text x="100" y="12" textAnchor="middle">N</text>
      </svg>
    );
  return null;
}

/** A compact browser window: traffic-light bar, the page's top in view. No URL (Jasper). */
function Browser({ src, w, h, alt, className, scroll }: { src: string; w: number; h: number; alt: string; className?: string; scroll?: boolean }) {
  return (
    <div className={`${styles.browser} ${className ?? ""}`}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={styles.screen}>
        <img src={src} width={w} height={h} alt={alt} loading="lazy" decoding="async" className={scroll ? styles.autoScroll : undefined} />
      </div>
    </div>
  );
}

/** A phone: dark frame, rounded screen, a small island at the top. */
function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${styles.phone} ${className ?? ""}`}>
      <span className={styles.island} aria-hidden="true" />
      <div className={styles.phoneScreen}>{children}</div>
    </div>
  );
}


/** A real build in a device mockup. Its page scrolls itself down and back up as a preview. */
function Project({ project }: { project: NonNullable<Benefit["project"]> }) {
  if (project.frame === "phone")
    return (
      <div className={styles.duo}>
        {project.back && (
          <Browser src={project.back.screen} w={project.back.w} h={project.back.h} alt="" className={styles.duoBack} />
        )}
        <Phone className={styles.duoPhone}>
          <img src={project.screen} width={project.w} height={project.h} alt={project.alt} loading="lazy" decoding="async" className={styles.autoScroll} />
        </Phone>
      </div>
    );
  return (
    <Browser
      src={project.screen}
      w={project.w}
      h={project.h}
      alt={project.alt}
      className={project.frame === "browser-bleed" ? styles.bleedWin : styles.tiltWin}
      scroll
    />
  );
}

/** Coded illustrations for the cards without a real site ("premium vectors", Graham). */
function Art({ kind }: { kind: BenefitVisual }) {
  if (kind === "order")
    return (
      <>
        <Spark className={styles.sparkMark} />
        <div className={styles.receiptWrap} aria-hidden="true">
          <div className={styles.receipt}>
            <span className={styles.shop}>Thanks for your order</span>
            {[
              ["Speckled mug", "$28"],
              ["Linen apron", "$46"],
            ].map(([name, price]) => (
              <span key={name} className={styles.line}>
                <span>{name}</span>
                <i />
                <span>{price}</span>
              </span>
            ))}
            <span className={styles.totalLabel}>Total</span>
            <span className={styles.totalValue}>$74</span>
          </div>
          <span className={styles.stamp}>
            <Spark />
            Paid
          </span>
        </div>
      </>
    );
  if (kind === "search")
    // Local search: a map with numbered pins and the ranked results, yours first.
    return (
      <div className={styles.seo} aria-hidden="true">
        <span className={styles.query}>
          <svg viewBox="0 0 16 16">
            <circle
              cx="7"
              cy="7"
              r="4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M10.5 10.5L14 14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          coffee near me
        </span>
        <div className={styles.mapStrip}>
          <svg viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice">
            <rect width="300" height="120" className={styles.land} />
            <path
              className={styles.park}
              d="M-10 90c40-14 70-6 95 4s30 30 20 40H-10z"
            />
            <path
              className={styles.water}
              d="M220-10c-10 30 5 50 40 58s40 4 50-2V-10z"
            />
            <g className={styles.roads}>
              <path d="M-10 40L310 22" />
              <path d="M70-10L110 130" />
              <path d="M-10 104L310 70" />
              <path d="M200-10l24 140" />
            </g>
            <g className={styles.minor}>
              <path d="M-10 70L310 46" />
              <path d="M150-10l8 140" />
            </g>
          </svg>
          {[
            ["1", "52%", "46%"],
            ["2", "22%", "30%"],
            ["3", "80%", "64%"],
          ].map(([n, x, y]) => (
            <span
              key={n}
              className={styles.mapPin}
              data-first={n === "1" ? "true" : undefined}
              style={{ left: x, top: y }}
            >
              <span>{n}</span>
            </span>
          ))}
        </div>
        <ol className={styles.ranks}>
          {[
            ["Your café", "650 m · open now"],
            ["Another café", "1.2 km"],
            ["Another café", "2.0 km"],
          ].map(([name, meta], i) => (
            <li key={i} className={styles.rank} data-first={i === 0 ? "true" : undefined}>
              <span className={styles.rankNo}>{i + 1}</span>
              <span className={styles.lines}>
                <span className={styles.strong}>{name}</span>
                <span className={styles.small}>{meta}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  if (kind === "call")
    // An incoming call, the way a phone shows it: caller, then decline and a pulsing answer.
    return (
      <Phone className={styles.callPhone}>
      <div className={styles.incoming} aria-hidden="true">
        <span className={styles.waMark}>
          <WhatsAppIcon size={24} />
        </span>
        <span className={styles.callerLabel}>WhatsApp voice call</span>
        <span className={styles.caller}>New customer</span>
        <span className={styles.callerLabel}>via your website</span>
        <span className={styles.callActions}>
          <span className={styles.decline}>
            <svg viewBox="0 0 16 16">
              <path d={PHONE_ICON} fill="currentColor" />
            </svg>
          </span>
          <span className={styles.answer}>
            <i className={styles.pulse} />
            <i className={styles.pulse} />
            <svg className={styles.handset} viewBox="0 0 16 16">
              <path d={PHONE_ICON} fill="currentColor" />
            </svg>
          </span>
        </span>
      </div>
      </Phone>
    );
  return null;
}

function Title({ item }: { item: Benefit }) {
  const [before, after] = item.title.split(item.mark);
  return (
    <h3 className={styles.cardTitle}>
      {before}
      <span className={styles.mark}>{item.mark}</span>
      {after}
    </h3>
  );
}

export default function Benefits() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    setEdges({ start: t.scrollLeft <= 2, end: t.scrollLeft >= max - 2 });
    setProgress(max > 0 ? t.scrollLeft / max : 1);
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          measure();
        });
    };
    onScroll();
    t.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      t.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [measure]);

  // One card per press: card width plus the gap.
  const go = (dir: 1 | -1) => {
    const t = trackRef.current;
    const card = t?.querySelector<HTMLElement>("li");
    if (!t || !card) return;
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    t.scrollBy({
      left: dir * (card.offsetWidth + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="benefits"
      className={styles.section}
      data-ground="light"
      data-benefits
      aria-labelledby="benefits-title"
    >
      <div className={`container ${styles.head}`}>
        <p className={styles.eyebrow}>
          <Spark className={styles.eyebrowSpark} />
          {benefits.eyebrow}
        </p>
        <h2 id="benefits-title" className={styles.title}>
          {benefits.title.split(benefits.titleMark)[0]}
          <span className={styles.titleMark}>{benefits.titleMark}</span>
          {benefits.title.split(benefits.titleMark)[1]}
        </h2>
        <p className={styles.intro}>{benefits.intro}</p>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => go(-1)}
            disabled={edges.start}
            aria-controls="benefits-track"
            aria-label="Previous"
            data-benefits-prev
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M10 3L5 8l5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => go(1)}
            disabled={edges.end}
            aria-controls="benefits-track"
            aria-label="Next"
            data-benefits-next
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M6 3l5 5-5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <ul
        id="benefits-track"
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        aria-label="What a website brings in, by type of business"
        data-benefits-track
      >
        {benefits.items.map((b) => (
          <li
            key={b.id}
            className={styles.card}
            data-colour={b.colour}
            data-benefit={b.id}
          >
            <div
              className={styles.stage}
              data-kind={b.project ? "site" : "art"}
              data-frame={b.project?.frame}
              data-note={b.note}
            >
              <Decor kind={b.visual} />
              <span className={styles.tag}>
                <Spark className={styles.tagSpark} />
                {b.tag}
              </span>
              {b.project ? (
                <Project project={b.project} />
              ) : (
                <Art kind={b.visual} />
              )}
              <div className={styles.overlay} aria-hidden="true">
                <Note kind={b.visual} />
              </div>
            </div>
            <Title item={b} />
            <p className={styles.cardBody}>{b.text}</p>
          </li>
        ))}
      </ul>

      <div className="container">
        <div className={styles.progress} aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }} />
        </div>
      </div>
    </section>
  );
}
