import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const BADGES = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Hono",
  "Prisma",
  "PostgreSQL",
  "Tailwind",
  "GSAP",
  "Motion",
  "Docker",
  "MongoDB",
];

/**
 * Three rings of tech badges orbiting around a central core,
 * tilted ~60° on X to read as a 3D ring system. Each ring
 * counter-rotates and the whole rig rotates with scroll.
 */
export function OrbitalSkills() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start end", "end start"] });
  const tiltY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const lift = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const rings = [
    { r: 110, count: 6, dur: 28, dir: 1, ofs: 0, items: BADGES.slice(0, 6) },
    { r: 175, count: 6, dur: 36, dir: -1, ofs: 30, items: BADGES.slice(6, 12) },
  ];

  return (
    <div
      ref={wrap}
      className="relative mx-auto aspect-square w-[min(440px,90%)]"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateY: tiltY,
          y: lift,
          rotateX: 58,
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0"
      >
        {/* Equator glow disc */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 400,
            height: 400,
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Ring tracks */}
        {rings.map((ring) => (
          <div
            key={ring.r}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: ring.r * 2,
              height: ring.r * 2,
              borderColor: "color-mix(in srgb, var(--accent) 25%, transparent)",
              boxShadow:
                "0 0 30px color-mix(in srgb, var(--accent) 18%, transparent)",
            }}
          />
        ))}

        {/* Rotating badges per ring */}
        {rings.map((ring) => (
          <motion.div
            key={`spin-${ring.r}`}
            className="absolute left-1/2 top-1/2"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotate: 360 * ring.dir }}
            transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
          >
            {ring.items.map((b, i) => {
              const angle = (i / ring.items.length) * Math.PI * 2 + (ring.ofs * Math.PI) / 180;
              const x = Math.cos(angle) * ring.r;
              const y = Math.sin(angle) * ring.r;
              return (
                <motion.div
                  key={b}
                  className="absolute glass glow-border rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
                  style={{
                    left: x,
                    top: y,
                    transform: "translate(-50%, -50%) rotateX(-58deg)",
                    color: "var(--accent)",
                    whiteSpace: "nowrap",
                  }}
                  animate={{ rotate: -360 * ring.dir }}
                  transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
                >
                  {b}
                </motion.div>
              );
            })}
          </motion.div>
        ))}

        {/* Central core */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full"
          style={{
            width: 80,
            height: 80,
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 35%, transparent), color-mix(in srgb, var(--accent-3) 18%, transparent))",
            border: "1px solid color-mix(in srgb, var(--accent) 40%, transparent)",
            boxShadow: "0 0 40px color-mix(in srgb, var(--accent) 50%, transparent)",
            transform: "translate(-50%, -50%) rotateX(-58deg)",
          }}
        >
          <span className="font-mono text-xs neon">stack</span>
        </div>
      </motion.div>
    </div>
  );
}
