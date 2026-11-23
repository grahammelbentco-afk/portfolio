import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import { hero } from "@/content/homepage";
import { Track, type Card } from "@/components/HeroSlider";
import slider from "@/components/HeroSlider.module.css";
import styles from "./options.module.css";

/**
 * Hero options (Revision 90). The homepage hero as it is, eight times, each with a different
 * looping slider on the right. Concepts 1-4 follow Jasper's references (arc row, curved
 * wall, coverflow, deck), 5-8 his wireframes. Only the three hero cards are used (videos
 * later). Not linked from the homepage; noindex like the rest of the preview.
 */
export const metadata: Metadata = {
  title: "Hero options",
  robots: { index: false, follow: false },
};

const CARDS: Card[] = hero.cards.map((c) => ({ src: c.image.src, label: c.label }));

type S = React.CSSProperties;
const box = (left: number, top: number, width: number, height: number, extra: S = {}): S => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  height: `${height}%`,
  ...extra,
});
const hide: S = { opacity: 0 };

// 1. Arc row: five cards along a gentle curve.
const arc = (d: number, extra: S = {}) =>
  box(41 + d * 21, 26 + Math.abs(d) ** 1.6 * 5, 18, 46, { transform: `rotate(${d * 6}deg)`, ...extra });

// 2. Curved wall: cards on the inside of a cylinder (concave), turning one step at a time.
const wall = (a: number, extra: S = {}) =>
  box(35, 12, 30, 76, { transform: `perspective(1100px) translateZ(340px) rotateY(${a}deg) translateZ(-340px)`, ...extra });

// 3. Coverflow: centre card flat, neighbours turned away.
const flow = (x: number, a: number, extra: S = {}) =>
  box(x, 12, 36, 76, { transform: `perspective(1000px) rotateY(${a}deg) scale(${a ? 0.86 : 1})`, ...extra });

const CONCEPTS: { name: string; stage: string; slots: S[]; leave: S; enter: S }[] = [
  {
    name: "Arc row",
    stage: slider.wide,
    slots: [-2, -1, 0, 1, 2].map((d) => arc(d, { zIndex: 3 - Math.abs(d) })),
    leave: arc(-3, hide),
    enter: arc(3, hide),
  },
  {
    name: "Curved wall",
    stage: slider.wide,
    slots: [arc0(-44), arc0(0), arc0(44)],
    leave: wall(-88, hide),
    enter: wall(88, hide),
  },
  {
    name: "Coverflow",
    stage: slider.wide,
    slots: [flow(4, 40, { opacity: 0.55, zIndex: 1 }), flow(32, 0, { zIndex: 3 }), flow(60, -40, { opacity: 0.55, zIndex: 1 })],
    leave: flow(-24, 60, { ...hide, zIndex: 0 }),
    enter: flow(88, -60, { ...hide, zIndex: 0 }),
  },
  {
    name: "Deck",
    stage: slider.tall,
    slots: [
      box(12, 16, 76, 80, { zIndex: 3 }),
      box(12, 16, 76, 80, { transform: "translateY(-7%) scale(0.92)", opacity: 0.7, zIndex: 2 }),
      box(12, 16, 76, 80, { transform: "translateY(-14%) scale(0.84)", opacity: 0.45, zIndex: 1 }),
    ],
    leave: box(12, 16, 76, 80, { transform: "translateX(-60%) rotate(-10deg) scale(0.92)", ...hide, zIndex: 4 }),
    enter: box(12, 16, 76, 80, { transform: "translateY(-21%) scale(0.76)", ...hide, zIndex: 0 }),
  },
  {
    name: "Three, centre tall",
    stage: slider.square,
    slots: [box(0, 20, 30, 60), box(35, 4, 30, 92, { zIndex: 2 }), box(70, 20, 30, 60)],
    leave: box(-35, 20, 30, 60, hide),
    enter: box(105, 20, 30, 60, hide),
  },
  {
    name: "Centre overlap",
    stage: slider.square,
    slots: [
      box(0, 18, 36, 64, { opacity: 0.6, zIndex: 1 }),
      box(24, 4, 52, 92, { zIndex: 3 }),
      box(64, 18, 36, 64, { opacity: 0.6, zIndex: 1 }),
    ],
    leave: box(-30, 18, 36, 64, { ...hide, zIndex: 0 }),
    enter: box(94, 18, 36, 64, { ...hide, zIndex: 0 }),
  },
  {
    name: "Descending",
    stage: slider.square,
    slots: [box(0, 6, 40, 88), box(44, 18, 30, 64), box(78, 28, 22, 44)],
    leave: box(-44, 6, 40, 88, hide),
    enter: box(104, 28, 22, 44, hide),
  },
  {
    name: "Bento",
    stage: slider.square,
    slots: [box(38, 0, 62, 100), box(0, 0, 35, 48), box(0, 52, 35, 48)],
    leave: box(104, 0, 62, 100, hide),
    enter: box(0, 104, 35, 48, hide),
  },
];

function arc0(a: number) {
  return wall(a, { zIndex: a === 0 ? 2 : 1, opacity: a === 0 ? 1 : 0.8 });
}

export default function HeroOptions() {
  return (
    <main className={styles.page}>
      <nav className={styles.bar} aria-label="Hero options">
        <Link className={styles.back} href="/">
          ← Homepage
        </Link>
        <p className={styles.barTitle}>Hero options</p>
        <ol className={styles.jump}>
          {CONCEPTS.map((c, i) => (
            <li key={c.name}>
              <a href={`#option-${i + 1}`} title={c.name}>
                {i + 1}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {CONCEPTS.map((c, i) => (
        <div key={c.name} className={styles.option}>
          <p className={styles.label}>
            <span>Option {i + 1}</span> {c.name}
          </p>
          <Hero
            id={`option-${i + 1}`}
            visual={<Track cards={CARDS} slots={c.slots} leave={c.leave} enter={c.enter} stage={c.stage} name={`${c.name} slider`} every={3000 + i * 150} />}
          />
        </div>
      ))}
    </main>
  );
}
