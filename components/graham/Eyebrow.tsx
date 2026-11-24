import Spark from "./Spark";

/**
 * The section eyebrow: the Split Arc's spark in Aqua, then a short label. Jasper's call
 * (2026-11-15): every section after the hero opens with one. Styles in globals.css (.eyebrow).
 */
export default function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={className ? `eyebrow ${className}` : "eyebrow"}>
      <Spark className="eyebrow-spark" />
      {children}
    </p>
  );
}
