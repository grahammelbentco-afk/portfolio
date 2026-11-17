/** Slider layouts, kept out of the client component so server components can import them. */
type Slot = React.CSSProperties;

const box = (left: number, top: number, width: number, height: number, extra: Slot = {}): Slot => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  height: `${height}%`,
  ...extra,
});

/**
 * The homepage layout (Jasper and Graham chose "Descending", 2026-11-17): three cards
 * stepping down in size, each growing as it moves left. Even 3% gaps, all three centred on
 * one line, 2% kept clear on the right for the arrow.
 */
export const DESCENDING = {
  slots: [box(0, 4, 40, 92), box(43, 18, 30, 64), box(76, 28, 22, 44)],
  leave: box(-44, 4, 40, 92, { opacity: 0 }),
  enter: box(102, 28, 22, 44, { opacity: 0 }),
};
