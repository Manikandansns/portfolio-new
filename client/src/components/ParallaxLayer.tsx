import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

type Props = {
  children: ReactNode;
  /** -1 = moves up fast, 0 = static, 1 = moves down with scroll (slow parallax). */
  speed?: number;
  /** Optional Z-translate to push layer back/forward in 3D space (px). */
  depth?: number;
  className?: string;
  style?: CSSProperties;
  rotate?: boolean;
};

export function ParallaxLayer({ children, speed = 0.3, depth = 0, className, style, rotate = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [200 * speed, -200 * speed]);
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotate: rotate ? (rot as MotionValue<number>) : undefined,
        translateZ: depth,
        transformStyle: "preserve-3d",
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
