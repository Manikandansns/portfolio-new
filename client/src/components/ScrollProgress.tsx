import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        background: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))",
        boxShadow: "0 0 12px var(--accent)",
      }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
    />
  );
}
