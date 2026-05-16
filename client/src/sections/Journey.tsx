import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Journey rendered as a deployment history — like `git log --graph --oneline`
 * combined with a CI pipeline. Each entry is a commit with a sha, a branch,
 * a status pill, and the work it represents.
 */
type Entry = {
  sha: string;
  branch: "main" | "experiments" | "education" | "intern";
  status: "deployed" | "active" | "shipped" | "archived" | "graduated";
  date: string;
  title: string;
  org: string;
  body: string;
  tags: string[];
};

const LOG: Entry[] = [
  {
    sha: "a91f3c2",
    branch: "main",
    status: "active",
    date: "2025-05",
    title: "Full Stack Engineer · RDX Digital Technologies",
    org: "react · node · postgres · prisma · typescript",
    body: "Owning admin dashboards, quotation systems, and ERP-grade business workflows. Shopify customisations, ISEW and Rajdeep quotation software, and reusable component architecture under agile delivery.",
    tags: ["react", "prisma", "postgres", "typescript", "shopify"],
  },
  {
    sha: "7e2a5b8",
    branch: "intern",
    status: "shipped",
    date: "2024-09 → 2025-04",
    title: ".NET Developer Intern · Wise Work",
    org: "blazor · asp.net · mudblazor",
    body: "Shipped Web APIs and component-driven UI. Wrote unit + UI tests with xUnit, bUnit, Playwright. Code review, sprint planning, documentation.",
    tags: ["blazor", "asp.net", "playwright"],
  },
  {
    sha: "1d4b6c0",
    branch: "main",
    status: "deployed",
    date: "2023-03 → 2023-10",
    title: "Web Developer · Freelancers' League",
    org: "react · node · ux ownership",
    body: "Led frontend + backend on multiple client projects. Lifted engagement through optimised UI/UX and tighter performance budgets.",
    tags: ["react", "node", "ui/ux"],
  },
  {
    sha: "c0a93f1",
    branch: "main",
    status: "deployed",
    date: "2022-12 → now",
    title: "Freelance Full Stack Developer",
    org: "self-employed",
    body: "Shipping production MERN / TS apps end-to-end. Reusable component systems, animated dashboards, portfolio platforms, full project lifecycle ownership.",
    tags: ["mern", "freelance", "ownership"],
  },
  {
    sha: "0001000",
    branch: "education",
    status: "graduated",
    date: "2021 — 2025",
    title: "B.Tech · Artificial Intelligence & Data Science",
    org: "sns college of engineering, coimbatore — gpa 8.25",
    body: "Foundations in ML, math, systems. Side-quested into web while academia gave me intelligent-systems instincts I now bake into product.",
    tags: ["ai", "data-science", "math"],
  },
];

const branchColor: Record<Entry["branch"], string> = {
  main: "var(--accent)",
  experiments: "var(--accent-3)",
  education: "var(--accent-2)",
  intern: "var(--accent-3)",
};
const statusColor: Record<Entry["status"], string> = {
  active: "var(--accent)",
  deployed: "var(--accent-2)",
  shipped: "var(--accent-2)",
  archived: "#888",
  graduated: "var(--accent-3)",
};

export function Journey() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".log-row");
      rows.forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          y: 24,
          duration: 0.75,
          delay: i * 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 86%" },
        });
      });

      const line = ref.current?.querySelector(".graph-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          },
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={ref} className="relative">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-40">
        <div className="flex items-end justify-between border-b border-[var(--line)] pb-6 mb-12">
          <div>
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--fg-dim)]">
              · 03 / deployment history
            </div>
            <h2 className="font-mono text-[34px] sm:text-5xl md:text-[58px] leading-[0.95] mt-3 tracking-tight">
              git log — <span className="grad-text">--graph --oneline</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--fg-dim)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            HEAD → main
          </div>
        </div>

        <div className="relative">
          {/* Graph rail */}
          <div className="absolute left-[14px] md:left-[22px] top-3 bottom-3 w-px bg-[var(--line)]">
            <div
              className="graph-line absolute inset-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, var(--accent), var(--accent-2), var(--accent-3))",
                boxShadow: "0 0 8px var(--accent)",
              }}
            />
          </div>

          <ul className="space-y-10 pl-10 md:pl-16">
            {LOG.map((e) => (
              <li key={e.sha} className="log-row relative">
                {/* commit node */}
                <span
                  className="absolute -left-[40px] md:-left-[58px] top-1 grid h-4 w-4 place-items-center rounded-full"
                  style={{
                    background: "var(--bg)",
                    border: `2px solid ${branchColor[e.branch]}`,
                    boxShadow: `0 0 14px ${branchColor[e.branch]}`,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: branchColor[e.branch] }}
                  />
                </span>

                {/* commit header line */}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[12px]">
                  <span
                    className="neon"
                    style={{ color: branchColor[e.branch] }}
                  >
                    {e.sha}
                  </span>
                  <span className="text-[var(--fg-dim)]">
                    ({e.branch})
                  </span>
                  <span
                    className="px-1.5 py-px text-[9px] tracking-[0.25em] uppercase"
                    style={{
                      color: statusColor[e.status],
                      border: `1px solid color-mix(in srgb, ${statusColor[e.status]} 50%, transparent)`,
                    }}
                  >
                    {e.status}
                  </span>
                  <span className="text-[var(--fg-dim)] ml-auto">
                    {e.date}
                  </span>
                </div>

                {/* commit subject */}
                <h3 className="mt-2 font-mono text-[18px] sm:text-[22px] leading-snug text-[var(--fg)] tracking-tight">
                  {e.title}
                </h3>
                <div className="font-mono text-[11px] text-[var(--fg-dim)] tracking-wider mt-0.5">
                  {e.org}
                </div>

                {/* commit body */}
                <p className="mt-3 max-w-[68ch] text-[14px] leading-[1.75] text-[var(--fg-dim)] font-mono">
                  {e.body}
                </p>

                {/* tags */}
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-[var(--fg-dim)]">
                  {e.tags.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 ml-10 md:ml-16 font-mono text-[12px] text-[var(--fg-dim)] flex items-center gap-2">
          <span className="neon">$</span>
          <span>
            git log finished · <span className="text-[var(--fg)]">{LOG.length}</span> entries · ready
            for next commit
            <span className="blink">_</span>
          </span>
        </div>
      </div>
    </section>
  );
}
