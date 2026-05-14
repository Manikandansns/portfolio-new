import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ArrowDown, Mail, Terminal as TerminalIcon } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MatrixRain } from "../components/MatrixRain";
import { MagneticButton } from "../components/MagneticButton";
import { profile } from "../data/portfolio";

const BOOT = [
  "$ initializing developer profile...",
  "$ loading fullstack systems...",
  "$ injecting neon... ok",
  "$ access granted.",
  "$ welcome to manikandan.exe",
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [bootIdx, setBootIdx] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    if (bootIdx >= BOOT.length) return;
    const t = setTimeout(() => setBootIdx((i) => i + 1), 380);
    return () => clearTimeout(t);
  }, [bootIdx]);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % profile.roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    const g = glowRef.current;
    if (!el || !g) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 30;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 30;
      gsap.to(g, { x, y, duration: 0.6, ease: "power3.out" });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute inset-0 opacity-40">
        <MatrixRain opacity={0.2} />
      </div>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 35%, transparent), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Floating code snippets */}
      <FloatingSnippets />

      <div className="relative section pt-40 md:pt-48">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6"
        >
          <span className="section-label">
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            online · accepting freelance ops
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <div className="font-mono text-[var(--accent)] text-xs tracking-widest mb-3">
              <span>root@manikandan</span>
              <span className="text-[var(--fg-dim)]">:~$</span>
              <span className="ml-2 blink">_</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-mono text-5xl sm:text-7xl md:text-8xl font-extrabold leading-[0.92] tracking-tight balance"
            >
              <span className="grad-text">MANI</span>
              <br />
              <span className="text-[var(--fg)]">KANDAN</span>
              <span className="neon">.</span>
              <span className="neon-cyan">exe</span>
            </motion.h1>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-mono text-sm text-[var(--fg-dim)]">{">"}</span>
              <motion.div
                key={roleIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-base sm:text-xl neon"
              >
                {profile.roles[roleIdx]}
                <span className="blink">█</span>
              </motion.div>
            </div>

            <p className="mt-6 max-w-xl text-[var(--fg-dim)] balance">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <a href="#projects" className="btn-neon">
                  <TerminalIcon size={14} /> view projects
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="#contact" className="btn-neon alt">
                  <Mail size={14} /> hire_me()
                </a>
              </MagneticButton>
              <div className="flex gap-2 ml-2">
                <IconLink href={profile.github}><FaGithub size={16} /></IconLink>
                <IconLink href={profile.linkedin}><FaLinkedin size={16} /></IconLink>
                <IconLink href={`mailto:${profile.email}`}><Mail size={16} /></IconLink>
              </div>
            </div>
          </div>

          <BootTerminal lines={BOOT.slice(0, bootIdx)} current={BOOT[bootIdx]} />
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono text-[var(--fg-dim)]"
      >
        <span className="tracking-[0.3em] uppercase">scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}

function IconLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="grid h-9 w-9 place-items-center rounded-md glow-border transition-colors hover:text-[var(--accent)]"
      style={{ color: "var(--fg-dim)" }}
    >
      {children}
    </a>
  );
}

function BootTerminal({ lines, current }: { lines: string[]; current?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.4 }}
      className="glass glow-border rounded-xl p-1 shadow-2xl"
    >
      <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg-dim)]">
          ~/manikandan — zsh — 80x24
        </span>
      </div>
      <div className="p-4 font-mono text-sm space-y-1 min-h-[220px]">
        {lines.map((l, i) => (
          <div key={i} className={l.includes("granted") || l.includes("welcome") ? "neon" : "text-[var(--fg-dim)]"}>
            {l}
          </div>
        ))}
        {current && (
          <div className="text-[var(--accent)]">
            {current}
            <span className="blink">_</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const SNIPPETS = [
  "const dev = { stack: ['MERN','Next','Prisma'] }",
  "while (alive) build()",
  "git push --force-with-lease",
  "async fn deploy() -> Result<()>",
  "SELECT * FROM dreams WHERE shipped = true",
  "if (problem) solve(it)",
];

function FloatingSnippets() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {SNIPPETS.map((s, i) => (
        <motion.div
          key={s}
          className="absolute font-mono text-xs"
          style={{
            top: `${10 + ((i * 17) % 80)}%`,
            left: `${5 + ((i * 31) % 90)}%`,
            color: i % 2 ? "var(--accent-3)" : "var(--accent-2)",
            opacity: 0.35,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          {s}
        </motion.div>
      ))}
    </div>
  );
}
