import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portrait from "../assets/manikandan.jpg";
import { profile } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

/**
 * Asymmetric editorial about section. Three columns, but offset rows.
 *  Left rail  — index number + section meta
 *  Center     — long-form story typography, oversized first letter
 *  Right rail — portrait + sidecar code annotations that float on scroll
 */
export function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Long-form copy reveal — mask-from-bottom, line by line
      const lines = gsap.utils.toArray<HTMLElement>(".about-line");
      lines.forEach((line) => {
        gsap.from(line, {
          yPercent: 100,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: line, start: "top 88%" },
        });
      });

      // Portrait parallax (very subtle)
      gsap.to(".about-portrait", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      // Sidecar code annotations drift in opposite direction
      gsap.to(".about-sidecar", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      // Index number scrubs as you scroll the section
      const num = document.querySelector<HTMLElement>(".about-index-num");
      if (num) {
        gsap.fromTo(
          num,
          { opacity: 0.15 },
          {
            opacity: 0.4,
            scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 30%", scrub: true },
          },
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative">
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-44">
        {/* Oversized section index, sits behind content */}
        <div className="about-index-num pointer-events-none absolute -top-6 md:-top-10 -left-2 md:-left-6 font-mono font-extrabold leading-none text-[18vw] md:text-[15vw] text-[var(--fg)]" style={{ opacity: 0.06 }}>
          01
        </div>

        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-20">
          {/* Left rail — meta */}
          <aside className="col-span-12 md:col-span-3 md:pt-32">
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--fg-dim)] mb-2">
              · 01 / about
            </div>
            <div className="font-mono text-xs leading-relaxed text-[var(--fg-dim)] space-y-1">
              <div>since &nbsp; <span className="text-[var(--fg)]">dec · 2022</span></div>
              <div>based &nbsp; <span className="text-[var(--fg)]">cuddalore, tn</span></div>
              <div>degree <span className="text-[var(--fg)]">b.tech ai &amp; ds</span></div>
              <div>gpa &nbsp;&nbsp;&nbsp; <span className="text-[var(--fg)]">8.25 / 10</span></div>
            </div>
          </aside>

          {/* Center — narrative */}
          <div className="col-span-12 md:col-span-6">
            <h2 className="font-mono text-[34px] sm:text-5xl md:text-[58px] leading-[0.95] tracking-tight">
              <span className="inline-block overflow-hidden align-bottom">
                <span className="about-line inline-block">i build software</span>
              </span>
              <br />
              <span className="inline-block overflow-hidden align-bottom">
                <span className="about-line inline-block">that <span className="grad-text">ships</span> — and</span>
              </span>
              <br />
              <span className="inline-block overflow-hidden align-bottom">
                <span className="about-line inline-block">interfaces that <em className="font-mono italic neon">stick</em>.</span>
              </span>
            </h2>

            <div className="mt-10 max-w-[52ch] text-[var(--fg-dim)] text-[15px] leading-[1.85] font-mono">
              <p>
                Two and a half years deep into the modern web. Day job is{" "}
                <span className="text-[var(--fg)]">React · Node · Hono · Prisma · Postgres</span>{" "}
                at RDX Digital, where I own admin dashboards, quotation systems, and ERP-grade business
                tooling. Off-hours, I&apos;m wiring up GSAP timelines, building AI agents on Gemini, and
                obsessing over scroll choreography.
              </p>
              <p className="mt-6">
                Coming up I had to choose between elegant UI and a hardened backend. I never picked.
                So I sit in the middle — typed APIs, fast paint times, animations that don&apos;t feel
                like decoration.
              </p>
            </div>

            {/* Manifesto strip — three principles, hairline only */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)]">
              {[
                ["ship", "production over prototype, always."],
                ["shape", "typed end-to-end. zod at the seams."],
                ["sense", "motion serves story, not the other way."],
              ].map(([k, v]) => (
                <div key={k} className="bg-[var(--bg)] p-5">
                  <div className="font-mono text-[10px] tracking-[0.35em] uppercase neon">{k}</div>
                  <div className="font-mono text-sm text-[var(--fg)] mt-2">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right rail — portrait + sidecar */}
          <aside className="col-span-12 md:col-span-3 md:pt-12 relative">
            <div className="about-portrait relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
                <img
                  src={portrait}
                  alt={profile.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: "grayscale(1) contrast(1.08) brightness(0.95)" }}
                />
                {/* scanline + tint */}
                <div
                  aria-hidden
                  className="absolute inset-0 mix-blend-screen pointer-events-none"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent 0 2px, color-mix(in srgb, var(--accent) 22%, transparent) 2px 3px)",
                    opacity: 0.18,
                  }}
                />
                <div className="absolute inset-0 ring-1 ring-[var(--line)]" />
              </div>
              {/* corner crops */}
              <Corner pos="tl" />
              <Corner pos="tr" />
              <Corner pos="bl" />
              <Corner pos="br" />

              {/* meta strip */}
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--fg-dim)]">
                <span>subject · M-01</span>
                <span className="neon">● live</span>
              </div>
            </div>

            {/* Sidecar code annotation */}
            <div className="about-sidecar mt-10 border-l border-[var(--accent)] pl-4 font-mono text-[11px] leading-relaxed text-[var(--fg-dim)]">
              <div className="neon text-[10px] tracking-[0.3em] uppercase mb-2">// annotation</div>
              <p className="text-[var(--fg)]">
                if (problem.depth === "deep") {"{"}<br />
                &nbsp;&nbsp;return manikandan.solve(problem);<br />
                {"}"}
              </p>
              <p className="mt-4">— production guarantee.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const cls: Record<typeof pos, string> = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  };
  return (
    <span
      aria-hidden
      className={`absolute h-3 w-3 ${cls[pos]} border-[var(--accent)]`}
    />
  );
}
