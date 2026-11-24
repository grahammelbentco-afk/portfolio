import HeroShader from "./HeroShader";
import styles from "./HeroGradient.module.css";

/**
 * The hero's ground, as on the V1.6 cover: the live ShaderGradient Halo (HeroShader).
 * Underneath it, a CSS version of the same light paints first and stays as the
 * fallback for no WebGL and no JavaScript.
 */
export default function HeroGradient() {
  return (
    <div className={styles.ground} data-bg aria-hidden="true">
      <div data-bg-layer className={`${styles.layer} ${styles.depth}`} />
      <div data-bg-layer className={`${styles.layer} ${styles.bloom}`} />
      <HeroShader />
      <div className={styles.scrim} />
      <div className={styles.dither} />
    </div>
  );
}
