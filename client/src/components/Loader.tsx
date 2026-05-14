import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINES = [
  "> booting kernel...",
  "> mounting /dev/manikandan",
  "> loading fullstack systems...",
  "> compiling neural net...",
  "> handshake [secure]",
  "> access granted.",
];

export function Loader() {
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= LINES.length) {
      const t = setTimeout(() => setDone(true), 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 280);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: "var(--bg)" }}
        >
          <div className="absolute inset-0 grid-overlay opacity-50" />
          <div className="relative w-[min(560px,90vw)] font-mono text-sm">
            <div className="mb-4 flex items-center gap-2 text-[var(--accent)]">
              <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
              <span className="tracking-[0.3em] uppercase text-xs">manikandan.exe</span>
            </div>
            <div className="glass glow-border rounded-lg p-5">
              {LINES.slice(0, step).map((l, i) => (
                <div
                  key={i}
                  className={
                    l.includes("granted")
                      ? "neon"
                      : "text-[var(--fg-dim)]"
                  }
                >
                  {l}
                </div>
              ))}
              {step < LINES.length && (
                <div className="text-[var(--accent)]">
                  {LINES[step]}
                  <span className="blink">_</span>
                </div>
              )}
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(Math.min(step, LINES.length) / LINES.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                  style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-3))" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
