import type { ServiceIcon as Kind } from "@/content/homepage";

/** Small line icons for the service tiles. Decorative: the tile title carries the meaning. */
const PATHS: Record<Kind, React.ReactNode> = {
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18M6.5 6.8h.01M9 6.8h.01" />
    </>
  ),
  app: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="4.5" rx="1.6" />
      <rect x="13.5" y="11" width="7" height="9.5" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </>
  ),
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  social: (
    <>
      <circle cx="6.5" cy="12" r="2.5" />
      <circle cx="17.5" cy="6" r="2.5" />
      <circle cx="17.5" cy="18" r="2.5" />
      <path d="M8.7 10.8l6.6-3.6M8.7 13.2l6.6 3.6" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 013 3L8 18.5 4 20z" />
      <path d="M13.5 7l3 3" />
    </>
  ),
};

export default function ServiceIcon({ kind, className }: { kind: Kind; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[kind]}
    </svg>
  );
}
