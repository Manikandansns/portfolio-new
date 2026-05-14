import { motion } from "motion/react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { skills, proficiency } from "../data/portfolio";

const CATEGORIES = Object.keys(skills) as (keyof typeof skills)[];

export function Skills() {
  const ref = useGsapReveal<HTMLDivElement>({ selector: ".reveal", stagger: 0.06 });
  const marquee = [...Object.values(skills).flat(), ...Object.values(skills).flat()];

  return (
    <section id="skills" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div ref={ref} className="section">
        <div className="reveal"><span className="section-label">// skills.matrix</span></div>
        <h2 className="reveal font-mono text-3xl md:text-5xl font-bold mt-4 mb-10 balance">
          stack <span className="grad-text">overload</span>
        </h2>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          {/* Category grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => (
              <div key={cat} className="reveal glass glow-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm neon">{cat}</span>
                  <span className="font-mono text-[10px] text-[var(--fg-dim)] uppercase tracking-widest">
                    {skills[cat].length} items
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills[cat].map((s) => (
                    <span
                      key={s}
                      className="font-mono text-xs px-2.5 py-1 rounded-md transition-all hover:-translate-y-0.5"
                      style={{
                        background: "color-mix(in srgb, var(--accent) 8%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)",
                        color: "var(--accent)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Proficiency bars */}
          <div className="reveal glass glow-border rounded-xl p-6">
            <div className="font-mono text-xs text-[var(--fg-dim)] mb-4">// proficiency.cfg</div>
            <div className="space-y-4">
              {proficiency.map((p) => (
                <div key={p.name}>
                  <div className="flex justify-between font-mono text-xs mb-1">
                    <span className="text-[var(--fg)]">{p.name}</span>
                    <span className="neon">{p.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3))",
                        boxShadow: "0 0 10px color-mix(in srgb, var(--accent) 40%, transparent)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="reveal mt-12 overflow-hidden mask-fade py-4 border-y border-[var(--line)]">
          <div className="marquee font-mono text-xl md:text-2xl uppercase tracking-widest">
            {marquee.map((s, i) => (
              <span key={i} className="flex items-center gap-3 text-[var(--fg-dim)]">
                <span className="neon">◆</span> {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
