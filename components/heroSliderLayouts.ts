/** Slider layouts, kept out of the client component so server components can import them. */
type Slot = React.CSSProperties;

type Rect = { x: number; y: number; w: number; h: number };

const GLIDE = "900ms cubic-bezier(0.22, 1, 0.36, 1)"; // Transitions.dev smooth-out, as before

/**
 * A slot drawn with transforms only. Every card keeps the same box (`frame`) and is moved and
 * scaled with a plain `transform` from its top-left corner, which the browser animates on the
 * GPU: no layout, no whole-pixel snapping, no re-cropping of the photo or video, and (with
 * `will-change: transform`, set here too) no re-rendering of the picture on every frame.
 * The caption counter-scales through `--cap` (a ready-made transform the CSS transitions too),
 * so it stays the same size and 12px from the corner on every slot.
 * All rects must share the frame's aspect ratio so a uniform scale fits them exactly.
 */
const frameSlot = (frame: Rect, r: Rect, extra: Slot = {}): Slot => {
  const s = r.w / frame.w;
  const tx = ((r.x - frame.x) / frame.w) * 100;
  const ty = ((r.y - frame.y) / frame.h) * 100;
  return {
    left: `${frame.x}%`,
    top: `${frame.y}%`,
    width: `${frame.w}%`,
    height: `${frame.h}%`,
    transformOrigin: "0 0",
    transform: `translate(${tx}%, ${ty}%) scale(${s})`,
    willChange: "transform",
    "--cap": `translate(${12 / s}px, ${-12 / s}px) scale(${1 / s})`,
    transition: `transform ${GLIDE}, opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)`,
    ...extra,
  } as Slot;
};

/**
 * The homepage layout (Jasper and Graham chose "Descending", 2026-11-17): three cards
 * stepping down in size, each growing as it moves left, all centred on one line, 2% kept
 * clear on the right for the arrow. Revision 94: every slot now has the same shape
 * (0.55 width to height on the 6:5 stage) and the cards glide with transforms, which removed
 * the shimmer and the sliding crop that animating left/top/width/height caused.
 */
const STAGE = 6 / 5; // `.square` stage aspect
const CARD = 0.55; // card width / height
const rect = (x: number, w: number): Rect => {
  const h = (w * STAGE) / CARD; // height in % of the stage for this width
  return { x, y: 50 - h / 2, w, h };
};
const FRAME = rect(0, 40);

export const DESCENDING = {
  slots: [frameSlot(FRAME, FRAME), frameSlot(FRAME, rect(43, 30)), frameSlot(FRAME, rect(76, 22))],
  leave: frameSlot(FRAME, rect(-44, 40), { opacity: 0 }),
  enter: frameSlot(FRAME, rect(102, 22), { opacity: 0 }),
};
