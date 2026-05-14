import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { MagneticButton } from "../components/MagneticButton";
import { projects, type Project } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const accentMap = {
  green: "var(--accent)",
  cyan: "var(--accent-2)",
  purple: "var(--accent-3)",
} as const;

export function Projects() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const t = track.current;
      const w = wrap.current;
      if (!t || !w) return;
      // Only enable horizontal scroll on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const total = t.scrollWidth - window.innerWidth + 80;
        const tween = gsap.to(t, {
          x: -total,
          ease: "none",
          scrollTrigger: {
            trigger: w,
            start: "top top",
            end: () => `+=${total}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="section pb-0">
        <span className="section-label">// projects.dir</span>
        <h2 className="font-mono text-3xl md:text-5xl font-bold mt-4 mb-3 balance">
          selected <span className="grad-text">deployments</span>
        </h2>
        <p className="text-[var(--fg-dim)] max-w-xl mb-8">
          A snapshot of production builds — booking platforms, ERPs, AI tools, and dashboards.
        </p>
      </div>

      <div ref={wrap} className="relative">
        <div ref={track} className="flex gap-6 px-6 lg:flex-row lg:flex-nowrap flex-col lg:px-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const c = accentMap[project.accent];
  return (
    <MagneticButton strength={0.08} className="lg:w-[560px] w-full shrink-0">
      <article
        className="glass glow-border rounded-2xl p-6 lg:p-8 h-full lg:h-[60vh] flex flex-col justify-between relative overflow-hidden group"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-500 group-hover:opacity-50"
          style={{
            background: `radial-gradient(closest-side at 80% 0%, color-mix(in srgb, ${c} 40%, transparent), transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <span
              className="font-mono text-[10px] tracking-[0.25em] uppercase px-2 py-0.5 rounded-full"
              style={{ color: c, border: `1px solid color-mix(in srgb, ${c} 35%, transparent)`, background: `color-mix(in srgb, ${c} 10%, transparent)` }}
            >
              {project.tag}
            </span>
            <span className="font-mono text-xs text-[var(--fg-dim)]">
              {String(index + 1).padStart(2, "0")} / {String(6).padStart(2, "0")}
            </span>
          </div>

          <h3 className="font-mono text-2xl lg:text-3xl font-bold leading-tight mb-3 balance">
            {project.title}
          </h3>
          <p className="text-[var(--fg-dim)] mb-6 balance">{project.blurb}</p>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[11px] px-2 py-0.5 rounded-md"
                style={{ background: "color-mix(in srgb, var(--fg) 5%, transparent)", border: "1px solid var(--line)", color: "var(--fg-dim)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-between mt-8">
          <div className="flex gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-neon">
                <FaGithub size={14} /> code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-neon alt">
                <ArrowUpRight size={14} /> live
              </a>
            )}
            {!project.github && !project.live && (
              <span className="font-mono text-xs text-[var(--fg-dim)]">
                <span className="blink">●</span> private engagement
              </span>
            )}
          </div>
          <div
            aria-hidden
            className="font-mono text-5xl lg:text-7xl font-extrabold opacity-10"
            style={{ color: c }}
          >
            //
          </div>
        </div>
      </article>
    </MagneticButton>
  );
}
