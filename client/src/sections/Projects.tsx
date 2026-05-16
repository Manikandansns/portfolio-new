import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Case = {
  no: string;
  title: string;
  client: string;
  role: string;
  year: string;
  stack: string[];
  problem: string;
  solution: string;
  metric: { value: string; label: string }[];
  accent: string;
  link?: string;
};

const CASES: Case[] = [
  {
    no: "C-01",
    title: "ISEW Enterprise Suite",
    client: "RDX Digital · ISEW",
    role: "Full Stack",
    year: "2025",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "TanStack Query"],
    problem:
      "Internal teams ran ops out of spreadsheets — slow approvals, brittle audit trails, no shared truth.",
    solution:
      "Built a typed-end-to-end suite of admin dashboards, RBAC-aware workflows, and a quotation engine with a clean review/approve loop and PDF export.",
    metric: [
      { value: "4×", label: "faster ops cycle" },
      { value: "12+", label: "internal modules" },
      { value: "100%", label: "type coverage" },
    ],
    accent: "var(--accent)",
  },
  {
    no: "C-02",
    title: "Rajdeep Quotation Software",
    client: "RDX Digital · Rajdeep",
    role: "Full Stack",
    year: "2025",
    stack: ["React", "Prisma", "PostgreSQL", "TypeScript", "TanStack Query"],
    problem:
      "Sales teams needed a quotation tool that handled line-item logic, approval chains, and exportable artefacts.",
    solution:
      "Designed a normalised PostgreSQL schema, typed APIs, and a UX that turns a multi-step sales workflow into one focused screen.",
    metric: [
      { value: "70%", label: "fewer revision cycles" },
      { value: "1s", label: "PDF export" },
      { value: "RBAC", label: "auth model" },
    ],
    accent: "var(--accent-2)",
  },
  {
    no: "C-03",
    title: "ERP Mechanical Management",
    client: "Workshop client · Freelance",
    role: "Sole engineer",
    year: "2024",
    stack: ["Next.js", "Prisma", "PostgreSQL", "TypeScript"],
    problem:
      "A mechanical workshop tracking orders, inventory, and billing through paper and ad-hoc Excel.",
    solution:
      "Stood up a full ERP — orders, inventory, invoices, role-based access, audit logs, and PDF artefacts. Boring, reliable, and theirs.",
    metric: [
      { value: "Zero", label: "lost orders post-launch" },
      { value: "8", label: "ops roles modelled" },
      { value: "PDF", label: "billing pipeline" },
    ],
    accent: "var(--accent-3)",
  },
  {
    no: "C-04",
    title: "GSUN Marine Service Portal",
    client: "GSUN Marine",
    role: "Full Stack",
    year: "2024",
    stack: ["MERN", "Cloudinary", "EmailJS"],
    problem:
      "A marine services company needed a presence + an admin to maintain catalogue, gallery, and leads.",
    solution:
      "Shipped a service portfolio with Cloudinary uploads through Multer, EmailJS client integration, and a thin admin that the client actually uses.",
    metric: [
      { value: "Self-serve", label: "content updates" },
      { value: "1-tap", label: "lead routing" },
      { value: "Static-fast", label: "page paint" },
    ],
    accent: "var(--accent-2)",
  },
  {
    no: "C-05",
    title: "Nutrition & Fitness Recommender",
    client: "Capstone · AI side-project",
    role: "Full Stack + AI",
    year: "2024",
    stack: ["React", "Gemini API", "Node.js", "DuckDuckGo"],
    problem:
      "Generic fitness apps don't translate to local food prices, ingredients, or imagery.",
    solution:
      "BMI / body-fat calculators wired into Gemini for recipe recommendations, with cost estimates and automated DuckDuckGo image fetches — practical, regional, and visual.",
    metric: [
      { value: "Gemini", label: "agent in the loop" },
      { value: "Local", label: "cost estimation" },
      { value: "Auto", label: "image automation" },
    ],
    accent: "var(--accent)",
  },
  {
    no: "C-06",
    title: "Guest Room Booking System",
    client: "Hospitality client · Freelance",
    role: "Full Stack",
    year: "2023",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    problem:
      "Manual reservation logs, double-bookings, and no calendar view.",
    solution:
      "End-to-end booking flow with auth, availability calendar, admin dashboard, and email confirmations. Quiet, dependable.",
    metric: [
      { value: "0", label: "double bookings" },
      { value: "Email", label: "confirmation pipeline" },
      { value: "Mobile", label: "first" },
    ],
    accent: "var(--accent-3)",
  },
];

export function Projects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".case-block").forEach((block) => {
        const num = block.querySelector(".case-num");
        const title = block.querySelector(".case-title");
        const body = block.querySelector(".case-body");

        gsap.from(num, {
          xPercent: -8,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: block, start: "top 80%" },
        });
        gsap.from(title, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          delay: 0.05,
          ease: "expo.out",
          scrollTrigger: { trigger: block, start: "top 80%" },
        });
        gsap.from(body, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          delay: 0.15,
          ease: "expo.out",
          scrollTrigger: { trigger: block, start: "top 80%" },
        });

        // Per-block parallax — left rail drifts up
        const left = block.querySelector(".case-left");
        if (left) {
          gsap.to(left, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: block, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={ref} className="relative">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-40">
        <div className="flex items-end justify-between border-b border-[var(--line)] pb-6 mb-20">
          <div>
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--fg-dim)]">
              · 04 / case studies
            </div>
            <h2 className="font-mono text-[34px] sm:text-5xl md:text-[58px] leading-[0.95] mt-3 tracking-tight">
              what i&apos;ve <span className="grad-text">shipped</span>.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--fg-dim)]">
            <span>{CASES.length} entries</span>
            <span className="h-1 w-1 rounded-full bg-[var(--fg-dim)]" />
            <span>2022 — 2025</span>
          </div>
        </div>

        <div className="space-y-32 md:space-y-44">
          {CASES.map((c, i) => (
            <CaseBlock key={c.no} c={c} mirror={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseBlock({ c, mirror }: { c: Case; mirror: boolean }) {
  return (
    <article className="case-block grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-8 relative">
      {/* Giant ghost number */}
      <div
        className={`case-num pointer-events-none absolute -top-14 md:-top-20 font-mono font-extrabold leading-none text-[20vw] md:text-[14vw] ${mirror ? "right-0" : "left-0"}`}
        style={{ color: c.accent, opacity: 0.07 }}
      >
        {c.no}
      </div>

      {/* Left rail meta */}
      <aside className={`case-left col-span-12 md:col-span-3 ${mirror ? "md:order-3" : ""}`}>
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--fg-dim)] mb-2">
          {c.no}
        </div>
        <div className="font-mono text-[12px] text-[var(--fg-dim)] leading-relaxed space-y-1">
          <Row k="client" v={c.client} />
          <Row k="role" v={c.role} />
          <Row k="year" v={c.year} />
        </div>

        {/* mini visualizer — abstract code "preview" tile */}
        <div className="mt-6 hidden md:block">
          <CodeTile accent={c.accent} no={c.no} />
        </div>
      </aside>

      {/* Center — title + story */}
      <div className={`col-span-12 md:col-span-6 ${mirror ? "md:order-2" : ""}`}>
        <h3 className="case-title font-mono text-[28px] sm:text-[40px] md:text-[48px] leading-[1.02] tracking-tight">
          {c.title}
        </h3>

        <div className="case-body mt-6 space-y-6 font-mono text-[14px] leading-[1.85] text-[var(--fg-dim)] max-w-[60ch]">
          <p>
            <span className="neon text-[10px] tracking-[0.3em] uppercase block mb-1">
              the problem
            </span>
            <span className="text-[var(--fg)]">{c.problem}</span>
          </p>
          <p>
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-1" style={{ color: c.accent }}>
              what i shipped
            </span>
            {c.solution}
          </p>
        </div>

        {/* tag rail */}
        <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-[var(--fg-dim)]">
          {c.stack.map((t, i) => (
            <span key={t}>
              {t}
              {i < c.stack.length - 1 && <span className="ml-4 opacity-40">/</span>}
            </span>
          ))}
        </div>

        {c.link && (
          <a
            href={c.link}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.2em] uppercase neon group"
          >
            view case
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
      </div>

      {/* Right rail — metrics */}
      <aside className={`col-span-12 md:col-span-3 ${mirror ? "md:order-1" : ""}`}>
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--fg-dim)] mb-4">
          / outcomes
        </div>
        <div className="space-y-5 border-l border-[var(--line)] pl-4">
          {c.metric.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-3xl md:text-4xl tracking-tight" style={{ color: c.accent }}>
                {m.value}
              </div>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--fg-dim)] mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </article>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <span className="inline-block w-14 text-[var(--fg-dim)]">{k}</span>
      <span className="text-[var(--fg)]">{v}</span>
    </div>
  );
}

/** Abstract "preview" block — diagonal code lines made of hairline rules. */
function CodeTile({ accent, no }: { accent: string; no: string }) {
  return (
    <div className="relative aspect-[5/3] border border-[var(--line)] overflow-hidden" style={{ background: "rgba(255,255,255,0.012)" }}>
      <div className="absolute inset-0 grid-overlay opacity-50" />
      <div className="absolute top-2 left-2 right-2 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--line)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--line)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--line)]" />
        <span className="ml-auto font-mono text-[9px] tracking-[0.25em] uppercase text-[var(--fg-dim)]">
          {no.toLowerCase()}.tsx
        </span>
      </div>
      <div className="absolute inset-x-3 top-7 space-y-1.5">
        {[60, 80, 40, 70, 55, 75, 45].map((w, i) => (
          <div
            key={i}
            className="h-[3px]"
            style={{
              width: `${w}%`,
              background: i % 3 === 0 ? accent : "var(--line)",
              opacity: i % 3 === 0 ? 0.5 : 1,
            }}
          />
        ))}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }}
      />
    </div>
  );
}
