import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Tilt3D } from "./Tilt3D";

const BOOT = [
  "$ initializing developer profile...",
  "$ loading fullstack systems...",
  "$ injecting neon... ok",
  "$ access granted.",
  "$ welcome to manikandan.exe",
];

const CODE = `function build(idea) {
  while (idea.alive) {
    const ui   = react(idea);
    const api  = node(ui);
    const data = postgres(api);
    deploy({ ui, api, data });
  }
  return "shipped 🚀";
}`;

/**
 * A cyberpunk developer rig that lives in real 3D space:
 *   • Stand
 *   • Monitor with live boot terminal
 *   • Floating code panel pushed forward in Z
 *   • Floating stack chips behind in Z
 * Mouse drives rotateX/Y; preserve-3d keeps the depth real.
 */
export function DevRig3D() {
  const [bootIdx, setBootIdx] = useState(0);

  useEffect(() => {
    if (bootIdx >= BOOT.length) return;
    const t = setTimeout(() => setBootIdx((i) => i + 1), 380);
    return () => clearTimeout(t);
  }, [bootIdx]);

  return (
    <div className="relative w-full" style={{ perspective: 1400 }}>
      <Tilt3D max={10} scale={1.02} className="relative">
        <div className="relative w-full" style={{ transformStyle: "preserve-3d" }}>
          {/* BACK LAYER — drifting stack chips */}
          <div className="pointer-events-none absolute -top-8 -left-6 -right-6" style={{ transform: "translateZ(-120px)" }}>
            <Chip text="React 19" color="var(--accent-2)" style={{ top: "-20px", left: "8%" }} delay={0} />
            <Chip text="TypeScript" color="var(--accent)" style={{ top: "30px", right: "6%" }} delay={1.4} />
            <Chip text="PostgreSQL" color="var(--accent-3)" style={{ top: "190px", left: "-4%" }} delay={2.6} />
            <Chip text="Prisma ORM" color="var(--accent-2)" style={{ bottom: "-10px", right: "-4%" }} delay={1.8} />
          </div>

          {/* MONITOR */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="glass glow-border rounded-2xl shadow-2xl relative"
            style={{
              transform: "translateZ(20px)",
              boxShadow:
                "0 30px 80px -20px rgba(0,255,156,0.25), 0 10px 30px -10px rgba(177,75,255,0.25)",
            }}
          >
            {/* monitor top bar */}
            <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg-dim)]">
                ~/manikandan — zsh — 80x24
              </span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            </div>
            {/* screen content */}
            <div className="relative p-4 font-mono text-sm min-h-[240px]">
              <div aria-hidden className="absolute inset-0 grid-overlay opacity-30" />
              <div className="relative space-y-1">
                {BOOT.slice(0, bootIdx).map((l, i) => (
                  <div
                    key={i}
                    className={
                      l.includes("granted") || l.includes("welcome") ? "neon" : "text-[var(--fg-dim)]"
                    }
                  >
                    {l}
                  </div>
                ))}
                {bootIdx < BOOT.length && (
                  <div className="text-[var(--accent)]">
                    {BOOT[bootIdx]}
                    <span className="blink">_</span>
                  </div>
                )}
              </div>
            </div>

            {/* screen glow underneath */}
            <div
              aria-hidden
              className="absolute -bottom-6 left-6 right-6 h-6 rounded-full blur-2xl"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))",
                opacity: 0.55,
                transform: "translateZ(-40px)",
              }}
            />
          </motion.div>

          {/* monitor stand */}
          <div
            aria-hidden
            className="mx-auto mt-3 h-3 w-28 rounded-b-md"
            style={{
              background: "linear-gradient(180deg, var(--bg-soft), transparent)",
              border: "1px solid var(--line)",
              borderTop: "none",
              transform: "translateZ(10px)",
            }}
          />
          <div
            aria-hidden
            className="mx-auto h-1 w-44 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 35%, transparent), transparent)",
              transform: "translateZ(5px)",
            }}
          />

          {/* FRONT LAYER — floating code panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute -bottom-12 -right-6 w-[78%] glass glow-border rounded-xl p-3 hidden sm:block"
            style={{
              transform: "translateZ(80px) rotateY(-6deg)",
              boxShadow: "0 18px 40px -15px rgba(0,229,255,0.35)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] neon-cyan">
                build.ts
              </span>
              <span className="ml-auto font-mono text-[10px] text-[var(--fg-dim)]">⌘B · run</span>
            </div>
            <pre className="font-mono text-[11px] leading-relaxed text-[var(--fg)] whitespace-pre">
{CODE}
            </pre>
          </motion.div>

          {/* tiny floating widget */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{ delay: 1.2, duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-8 -right-4 glass glow-border rounded-lg p-2 font-mono text-[10px] hidden md:flex items-center gap-2"
            style={{ transform: "translateZ(110px)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="neon">uptime 99.98%</span>
          </motion.div>
        </div>
      </Tilt3D>
    </div>
  );
}

function Chip({
  text,
  color,
  style,
  delay,
}: {
  text: string;
  color: string;
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute glass rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
      style={{
        ...style,
        color,
        border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
        background: `color-mix(in srgb, ${color} 8%, transparent)`,
      }}
      animate={{ y: [0, -10, 0], opacity: [0.55, 0.95, 0.55] }}
      transition={{ duration: 5 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {text}
    </motion.div>
  );
}
