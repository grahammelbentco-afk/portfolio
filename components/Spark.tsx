/** The Split Arc's spark half on its own: V1.6's list and marker device. Decorative. */
const SPARK = "M194.14 64.05L124.73 219.94A92 92 0 0 0 194.14 64.05Z";

export default function Spark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="134 34 102 164" aria-hidden="true" focusable="false">
      <path d={SPARK} transform="translate(12 -26)" />
    </svg>
  );
}
