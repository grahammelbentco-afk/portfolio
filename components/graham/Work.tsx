"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { getLenis } from "@/lib/smooth";
import { linkProps, work } from "@/content/graham/homepage";
import Eyebrow from "./Eyebrow";
import styles from "./Work.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

/** Depth between boards (px), after Concept F's "What we design for". */
const SPACING = 700;

/** How visible a board is at depth t (camera z minus the board's depth): it fades in from
 *  the distance, stays solid while it grows past the viewer, then fades out. */
function visibility(t: number) {
  if (t > 650) return 0;
  if (t > 350) return (650 - t) / 300;
  if (t < -2100) return 0;
  if (t < -1400) return (t + 2100) / 700;
  return 1;
}

/** Peripheral blur: a board sharp at its true size softens as it grows past the viewer. */
function blur(t: number) {
  return t > 60 ? Math.min(22, (t - 60) / 20) : 0;
}

/* ---- Starfield: a warp through space, drawn on one canvas ---- */

type Star = { x: number; y: number; z: number; pz: number; tint: number; arc: boolean; rot: number };

const TINTS = ["255,255,255", "191,240,227", "60,207,195", "209,222,234"]; // white, Seafoam, Aqua, Harbour tint
const DEPTH = 1600;

function makeStars(n: number, w: number, h: number): Star[] {
  const span = Math.max(w, h) * 1.4;
  return Array.from({ length: n }, (_, i) => {
    const z = Math.random() * DEPTH + 1;
    return {
      x: (Math.random() - 0.5) * span,
      y: (Math.random() - 0.5) * span,
      z,
      pz: z,
      tint: i % 7 === 0 ? 2 : i % 5 === 0 ? 1 : i % 9 === 0 ? 3 : 0,
      // About one in eighteen is a Split Arc half-circle: the brand's design element in flight.
      arc: i % 18 === 0,
      rot: Math.random() * Math.PI * 2,
    };
  });
}

function drawField(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  w: number,
  h: number,
  cx: number,
  cy: number,
  speed: number,
) {
  const f = Math.min(w, h) * 0.9;
  ctx.clearRect(0, 0, w, h);
  ctx.lineCap = "round";
  for (const s of stars) {
    s.pz = s.z;
    s.z -= speed;
    if (s.z < 1) {
      s.z = DEPTH;
      s.pz = DEPTH;
    }
    const x = cx + (s.x / s.z) * f;
    const y = cy + (s.y / s.z) * f;
    if (x < -40 || x > w + 40 || y < -40 || y > h + 40) {
      s.z = DEPTH;
      s.pz = DEPTH;
      continue;
    }
    const near = 1 - s.z / DEPTH; // 0 far .. 1 near
    const alpha = Math.min(1, 0.12 + near * 1.3);
    const size = 0.7 + near * 2.4;
    const col = TINTS[s.tint];

    if (s.arc) {
      // A small half-circle, the Split Arc, turning slowly as it streams past.
      const r = 2 + near * 14;
      ctx.strokeStyle = `rgba(${TINTS[1]},${alpha * 0.85})`;
      ctx.lineWidth = Math.max(1, near * 3);
      ctx.beginPath();
      ctx.arc(x, y, r, s.rot, s.rot + Math.PI);
      ctx.stroke();
      s.rot += 0.004 + speed * 0.0004;
      continue;
    }

    // Streak from where the star was to where it is: long when warping, a dot when idle.
    const px = cx + (s.x / s.pz) * f;
    const py = cy + (s.y / s.pz) * f;
    ctx.strokeStyle = `rgba(${col},${alpha})`;
    ctx.lineWidth = size;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(x + 0.01, y);
    ctx.stroke();
  }
}

/**
 * Work (Revision 71): a warp through space, past nine real projects. Jasper's reference is
 * Concept F's "What we design for" (M5 Round 2). Each project is Graham's whole presentation
 * board, never cropped and never moving inside its frame. On wide screens with motion allowed
 * the stage pins under the title and the camera flies forward through the boards, which sit
 * in depth and alternate left and right. A board is sharp at its true size, then blurs like
 * peripheral vision as it grows past the viewer. Behind them a starfield streams out from the
 * same vanishing point, drifting when idle and stretching into warp streaks with scroll speed,
 * with a few Split Arc shapes in the stream. Phones get a swipe row and reduced motion a
 * masonry grid, both over a still starfield.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  // Set by the fly-through while it runs: the arrows and timeline call it, and it reports
  // the board in front so they can mark it.
  const fly = useRef<((i: number) => void) | null>(null);
  const [current, setCurrent] = useState(0);
  const items = work.items;

  useGSAP(
    () => {
      const section = root.current!;
      const canvas = section.querySelector<HTMLCanvasElement>("[data-work-space]")!;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let stars: Star[] = [];
      let w = 0;
      let h = 0;
      const size = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        stars = makeStars(w < 960 ? 260 : 680, w, h);
      };

      const mm = gsap.matchMedia();

      // Phones and reduced motion: one still frame of stars, redrawn on resize.
      mm.add("(max-width: 959px), (prefers-reduced-motion: reduce)", () => {
        const still = () => {
          size();
          drawField(ctx, stars, w, h, w / 2, h * 0.4, 0);
        };
        still();
        window.addEventListener("resize", still);
        return () => window.removeEventListener("resize", still);
      });

      mm.add("(min-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
        const stage = section.querySelector<HTMLElement>("[data-work-stage]")!;
        const cam = section.querySelector<HTMLElement>("[data-work-track]")!;
        const boards = gsap.utils.toArray<HTMLElement>("[data-project]", section);
        const view = section.querySelector<HTMLElement>("[data-work-view]")!;
        const meterArc = section.querySelector<SVGPathElement>("[data-work-meter-arc]")!;
        const meterNow = section.querySelector<HTMLElement>("[data-work-meter-now]")!;

        section.dataset.motion = "on";
        size();

        // Opacity, visibility and blur are written directly: hidden boards also leave the tab order.
        const paint = boards.map((b) => (t: number) => {
          const v = visibility(t);
          const px = v > 0 ? blur(t) : 0;
          b.style.opacity = String(v);
          b.style.visibility = v === 0 ? "hidden" : "visible";
          // Only boards still ahead of the viewer take clicks: one that has grown past its true
          // size (and blurs) would otherwise sit over the far boards and catch their clicks.
          b.style.pointerEvents = v > 0 && t <= 120 ? "auto" : "none";
          b.style.filter = px > 0.2 ? `blur(${px.toFixed(1)}px)` : "";
        });

        const start = -200;
        const end = (boards.length - 1) * SPACING + 60;
        // Detail: the Split Arc fills as you travel, and the number follows the sharp board (the
        // count moves on once the one before it has started to blur past).
        let shown = -1;
        const place = () => {
          const z = Number(gsap.getProperty(cam, "z"));
          boards.forEach((_, i) => paint[i](z - SPACING * i));
          const p = gsap.utils.clamp(0, 1, (z - start) / (end - start));
          meterArc.style.strokeDashoffset = String(100 - p * 100);
          const now = gsap.utils.clamp(0, boards.length - 1, Math.floor((z + 420) / SPACING));
          if (now !== shown) {
            shown = now;
            meterNow.textContent = String(now + 1);
            setCurrent(now);
          }
        };

        gsap.set(cam, { z: start });
        place();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            // A longer run and a 1.6s catch-up: the camera glides after each scroll step and
            // settles softly, instead of jumping with every wheel notch. This section only.
            end: `+=${(boards.length - 1) * 65 + 90}%`,
            pin: true,
            scrub: 1.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(cam, { z: start }, { z: end, ease: "none", duration: 1, onUpdate: place }, 0);

        // Click a board to fly to it: scroll to where that board sits at its true size.
        // Keyboard: Enter or Space.
        const flyTo = (i: number) => {
          const st = tl.scrollTrigger;
          if (!st) return;
          const p = gsap.utils.clamp(0, 1, (SPACING * i - start) / (end - start));
          // 0.3s, starting at full speed (expo.out), and it skips the scrub's catch-up, so the
          // camera follows the scroll exactly and the click lands almost at once.
          const y = st.start + p * (st.end - st.start);
          // Revision 87: with momentum scroll on, Lenis makes the jump so it doesn't fight it.
          const lenis = getLenis();
          if (lenis) {
            const off = lenis.on("scroll", () => st.getTween()?.progress(1));
            lenis.scrollTo(y, {
              duration: 0.3,
              easing: (t) => 1 - Math.pow(2, -10 * t),
              onComplete: () => {
                st.getTween()?.progress(1);
                off();
              },
            });
            return;
          }
          gsap.to(window, {
            scrollTo: y,
            duration: 0.3,
            ease: "expo.out",
            overwrite: "auto",
            onUpdate: () => {
              st.getTween()?.progress(1);
            },
          });
        };
        fly.current = flyTo;
        const onClick = boards.map((b, i) => {
          const name = b.querySelector("figcaption strong")?.textContent ?? "project";
          b.setAttribute("role", "button");
          b.setAttribute("tabindex", "0");
          b.setAttribute("aria-label", `Bring ${name} into view`);
          const click = () => flyTo(i);
          const key = (e: KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              flyTo(i);
            }
          };
          b.addEventListener("click", click);
          b.addEventListener("keydown", key);
          return () => {
            b.removeEventListener("click", click);
            b.removeEventListener("keydown", key);
            ["role", "tabindex", "aria-label"].forEach((a) => b.removeAttribute(a));
          };
        });
        // Keep the count right after a resize or a jump: refreshes don't always fire onUpdate.
        ScrollTrigger.addEventListener("refresh", place);

        // The warp: a slow drift at rest, faster with scroll speed, eased so it never snaps.
        // It only runs while the section is on screen.
        let speed = 3.2;
        // Detail: the vanishing point leans slightly toward the pointer (1.5% x, 1.2% y; was 5/4,
        // Jasper found it too much), eased slowly, so the
        // boards and stars shift in depth like a slow camera.
        const look = { x: 0, y: 0, tx: 0, ty: 0 };
        const onPointer = (e: PointerEvent) => {
          look.tx = (e.clientX / window.innerWidth) * 2 - 1;
          look.ty = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("pointermove", onPointer, { passive: true });
        const tick = () => {
          look.x += (look.tx - look.x) * 0.025;
          look.y += (look.ty - look.y) * 0.025;
          view.style.perspectiveOrigin = `${50 + look.x * 1.5}% ${47 + look.y * 1.2}%`;
          const v = Math.abs(tl.scrollTrigger?.getVelocity() ?? 0);
          // A steady warp at rest (3.2), stretching with scroll speed.
          const target = 3.2 + Math.min(v / 80, 32);
          speed += (target - speed) * 0.05;
          drawField(ctx, stars, w, h, w * (0.5 - look.x * 0.01), h * (0.47 - look.y * 0.01), speed);
        };
        const watch = ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
        });
        const onResize = () => size();
        window.addEventListener("resize", onResize);

        return () => {
          onClick.forEach((off) => off());
          gsap.ticker.remove(tick);
          watch.kill();
          window.removeEventListener("resize", onResize);
          window.removeEventListener("pointermove", onPointer);
          view.style.perspectiveOrigin = "";
          fly.current = null;
          delete section.dataset.motion;
          // Clear only what was set: the boards' inline style also carries --i and --ar.
          gsap.set(cam, { clearProps: "transform" });
          gsap.set(boards, { clearProps: "opacity,visibility,filter,pointerEvents" });
          ScrollTrigger.removeEventListener("refresh", place);
        };
      });
    },
    { scope: root },
  );

  return (
    <section id="projects" ref={root} className={styles.section} data-ground="dark" data-work aria-labelledby="work-title">
      <div className={styles.sky} aria-hidden="true">
        <canvas className={styles.space} data-work-space />
      </div>

      <div className={styles.stage} data-work-stage>
        <div className={`container ${styles.head}`}>
          {work.eyebrow && <Eyebrow>{work.eyebrow}</Eyebrow>}
          <h2 id="work-title" className="sec-title">
            {work.title.solid.map((l) => (
              <span key={l} className={styles.line}>
                {l}{" "}
              </span>
            ))}
            <span className={`${styles.line} outline-type`}>{work.title.outline}</span>
          </h2>
        </div>

        <div className={styles.view} data-work-view>
          <ul className={styles.cam} data-work-track>
            {items.map((p, i) => (
              <li
                key={p.id}
                className={styles.study}
                data-project={p.id}
                style={{ "--i": i, "--ar": p.image.w / p.image.h } as React.CSSProperties}
              >
                <figure className={styles.figure}>
                  <img
                    className={styles.board}
                    src={`${p.image.base}-1000.webp`}
                    srcSet={`${p.image.base}-640.webp 640w, ${p.image.base}-1000.webp 1000w`}
                    sizes="(min-width: 960px) 40vw, 70vw"
                    width={p.image.w}
                    height={p.image.h}
                    alt={p.image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className={styles.caption}>
                    <strong className={styles.name}>
                      {p.name}
                      <svg className={styles.go} viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M3 8h9M8.5 4l4 4-4 4" />
                      </svg>
                    </strong>
                    <span className={styles.sector}>{p.sector}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        {/* Dark veil over the top of the frame, between the boards and the title: boards
            dim as they pass under it, so the title always sits on dark. */}
        <div className={styles.veil} aria-hidden="true" />

        {/* The timeline: one point per project down the right edge; the current one is
            Seafoam and longer, each shows its name on hover or focus, and a click flies there. */}
        <nav className={styles.timeline} aria-label="Projects">
          <ol>
            {items.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={styles.point}
                  aria-current={i === current ? "true" : undefined}
                  onClick={() => fly.current?.(i)}
                  data-work-point={p.id}
                >
                  <span className={styles.pointName}>{p.name}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* The frame's bottom row, there for the whole flight: the line on the left, then the
            gauge (a Split Arc that fills as you travel, and the count) beside the button. */}
        <div className={`container ${styles.outro}`} data-work-outro>
          <p className={styles.outroLead}>{work.cta.lead}</p>
          <div className={styles.outroAct}>
            <div className={styles.arrows}>
              <button type="button" className={styles.arrow} onClick={() => fly.current?.(Math.max(0, current - 1))} disabled={current === 0} aria-label="Previous project" data-work-prev>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3.5L5.5 8l4.5 4.5" />
                </svg>
              </button>
              <button type="button" className={styles.arrow} onClick={() => fly.current?.(Math.min(items.length - 1, current + 1))} disabled={current === items.length - 1} aria-label="Next project" data-work-next>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3.5L10.5 8 6 12.5" />
                </svg>
              </button>
            </div>
            <div className={styles.meter} aria-hidden="true" data-work-meter>
              <svg className={styles.meterArc} viewBox="0 0 44 24">
                <path className={styles.meterTrack} d="M2 2a20 20 0 0 0 40 0" />
                <path className={styles.meterFill} d="M2 2a20 20 0 0 0 40 0" pathLength={100} data-work-meter-arc />
              </svg>
              <p className={styles.meterText}>
                <span data-work-meter-now>1</span> / {items.length}
              </p>
            </div>
            <a href={work.cta.href} {...linkProps(work.cta.href)} className={`btn btn-lg ${styles.cta}`}>
              {work.cta.label}
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
