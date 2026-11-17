import type Lenis from "lenis";

/** The page's one Lenis instance (Revision 87), shared so GSAP code can scroll through it. */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}
