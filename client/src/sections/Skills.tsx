import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { proficiency } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

/**
 * Skills as a "system monitor" — like `htop` for a developer.
 *  Left   — vertical category labels (rotated)
 *  Center — long horizontal capability bars with live-looking sparkline
 *  Right  — terminal output of `stack --top`
 */
type Cap = {
  group: "frontend" | "backend" | "data" | "devops" | "interest";
  name: string;
  pct: number;
  detail: string;
};

const CAPS: Cap[] = [
  { group: "frontend", name: "react · next", pct: 93, detail: "hooks, suspense, server components, rsc patterns" },
  { group: "frontend", name: "typescript", pct: 92, detail: "generics, conditional types, narrow inference" },
  { group: "frontend", name: "tailwind · sass", pct: 90, detail: "design tokens, container queries, prose" },
  { group: "frontend", name: "gsap · motion · lenis", pct: 86, detail: "scrolltrigger, timelines, fling physics" },
  { group: "backend", name: "node · hono · express", pct: 88, detail: "edge runtimes, middleware, streaming" },
  { group: "backend", name: "rest · auth · zod", pct: 86, detail: "jwt, session, schema-validated boundaries" },
  { group: "data", name: "postgres · prisma", pct: 86, detail: "migrations, indexes, transaction isolation" },
  { group: "data", name: "mongodb", pct: 78, detail: "aggregation, mongoose models, indexes" },
  { group: "data", name: "tanstack query", pct: 82, detail: "cache keys, optimistic ui, hydration" },
  { group: "devops", name: "docker · vite · bun", pct: 70, detail: "multi-stage builds, edge bundling" },
  { group: "devops", name: "git workflows", pct: 88, detail: "rebase, worktrees, ci pipelines" },
  { group: "interest", name: "ai · gemini api", pct: 72, detail: "agents, function calling, rag" },
  { group: "interest", name: "cybersec basics", pct: 60, detail: "owasp top 10, auth surfaces, hardening" },
];

const GROUPS: Array<[Cap["group"], string]> = [
  ["frontend", "frontend"],
  ["backend", "backend"],
  ["data", "data · state"],
  ["devops", "devops · tooling"],
  ["interest", "interests"],
];

export function Skills() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cap-bar").forEach((bar) => {
        const fill = bar.querySelector<HTMLElement>(".cap-fill");
        if (!fill) return;
        const target = Number(bar.dataset.pct ?? 50);
        gsap.fromTo(
          fill,
          { width: "0%" },
          {
            width: `${target}%`,
            ease: "expo.out",
            duration: 1.4,
            scrollTrigger: { trigger: bar, start: "top 88%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".cap-row").forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          delay: i * 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={ref} className="relative">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-40">
        {/* header strip */}
        <div className="flex items-end justify-between border-b border-[var(--line)] pb-6 mb-10">
          <div>
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--fg-dim)]">
              · 02 / capability matrix
            </div>
            <h2 className="font-mono text-[34px] sm:text-5xl md:text-[58px] leading-[0.95] mt-3 tracking-tight">
              the <span className="grad-text">stack</span>, in load.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--fg-dim)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="neon">top — stack</span>
            <span>·</span>
            <span>refresh 1s</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10">
          {/* Center — capability bars */}
          <div className="col-span-12 md:col-span-9 space-y-10">
            {GROUPS.map(([gKey, gLabel]) => (
              <div key={gKey}>
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-mono text-[10px] tracking-[0.35em] uppercase neon">
                    {gLabel}
                  </span>
                  <span className="flex-1 h-px bg-[var(--line)]" />
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--fg-dim)]">
                    {CAPS.filter((c) => c.group === gKey).length} procs
                  </span>
                </div>
                <ul className="divide-y divide-[var(--line)]">
                  {CAPS.filter((c) => c.group === gKey).map((c) => (
                    <li key={c.name} className="cap-row py-3 grid grid-cols-[1fr_auto] sm:grid-cols-[1.4fr_1.6fr_auto] gap-x-6 items-center">
                      <div>
                        <div className="font-mono text-[15px] text-[var(--fg)] tracking-tight">
                          {c.name}
                        </div>
                        <div className="font-mono text-[10px] text-[var(--fg-dim)] mt-0.5">
                          {c.detail}
                        </div>
                      </div>
                      <div className="cap-bar relative h-1 bg-[var(--line)] hidden sm:block" data-pct={c.pct}>
                        <div
                          className="cap-fill absolute inset-y-0 left-0"
                          style={{
                            width: "0%",
                            background:
                              "linear-gradient(90deg, var(--accent), var(--accent-2))",
                            boxShadow:
                              "0 0 8px color-mix(in srgb, var(--accent) 60%, transparent)",
                          }}
                        />
                        {/* tick markers */}
                        <span className="absolute -top-1 left-0 h-3 w-px bg-[var(--line)]" />
                        <span className="absolute -top-1 left-1/4 h-2 w-px bg-[var(--line)]" />
                        <span className="absolute -top-1 left-1/2 h-2 w-px bg-[var(--line)]" />
                        <span className="absolute -top-1 left-3/4 h-2 w-px bg-[var(--line)]" />
                        <span className="absolute -top-1 right-0 h-3 w-px bg-[var(--line)]" />
                      </div>
                      <span className="font-mono text-[12px] neon tabular-nums">
                        {c.pct.toString().padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right rail — terminal readout */}
          <aside className="col-span-12 md:col-span-3 md:pl-8 md:border-l md:border-[var(--line)] mt-12 md:mt-0">
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--fg-dim)] mb-3">
              ./top.sh
            </div>
            <pre className="font-mono text-[11px] leading-relaxed text-[var(--fg-dim)] whitespace-pre">
{`PID   STACK            CPU%
----- ---------------  ----
 ${proficiency
   .slice(0, 5)
   .map((p, i) =>
     `${String(1023 + i).padStart(5, " ")}  ${p.name.toLowerCase().padEnd(15, " ")}  ${String(p.value).padStart(3, " ")}`,
   )
   .join("\n ")}`}
            </pre>

            <div className="mt-8 font-mono text-[11px] leading-relaxed">
              <div className="neon text-[10px] tracking-[0.3em] uppercase mb-2">// note</div>
              <p className="text-[var(--fg-dim)]">
                numbers are a self-rating, not certification. real ground truth lives in the projects
                below.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
