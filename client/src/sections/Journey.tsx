import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".j-item", {
        opacity: 0,
        x: -40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.6,
            },
          },
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="relative">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div ref={ref} className="section">
        <span className="section-label">// timeline.log</span>
        <h2 className="font-mono text-3xl md:text-5xl font-bold mt-4 mb-12 balance">
          the <span className="grad-text">journey</span> so far
        </h2>

        <div className="relative pl-6 md:pl-10">
          {/* Animated line */}
          <div className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-[var(--line)]">
            <div
              ref={lineRef}
              className="h-full w-px"
              style={{ background: "linear-gradient(180deg, var(--accent), var(--accent-3))", boxShadow: "0 0 10px var(--accent)" }}
            />
          </div>

          <div className="space-y-8">
            {journey.map((j) => (
              <div key={j.title} className="j-item relative">
                <div className="absolute -left-6 md:-left-9 top-2 grid h-4 w-4 place-items-center rounded-full" style={{ background: "var(--bg)", border: "2px solid var(--accent)", boxShadow: "0 0 12px var(--accent)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                </div>
                <div className="glass glow-border rounded-xl p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase px-2 py-0.5 rounded-full" style={{ background: "color-mix(in srgb, var(--accent-3) 12%, transparent)", color: "var(--accent-3)", border: "1px solid color-mix(in srgb, var(--accent-3) 30%, transparent)" }}>
                      {j.tag}
                    </span>
                    <span className="font-mono text-xs neon">{j.year}</span>
                  </div>
                  <h3 className="font-mono text-lg md:text-xl text-[var(--fg)]">{j.title}</h3>
                  <div className="font-mono text-xs text-[var(--fg-dim)] mb-2">{j.org}</div>
                  <p className="text-sm text-[var(--fg-dim)] balance">{j.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
