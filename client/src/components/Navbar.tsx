import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "terminal", label: "Terminal" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > last);
      last = y;
      // active section
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 200 && r.bottom >= 200) {
          setActive(l.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <div className="glass glow-border mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2">
        <a href="#home" className="flex items-center gap-2 font-mono text-sm">
          <span className="grid h-7 w-7 place-items-center rounded-md text-xs font-bold neon" style={{ background: "color-mix(in srgb, var(--accent) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)" }}>
            M
          </span>
          <span className="hidden sm:inline tracking-[0.25em] uppercase text-xs text-[var(--fg-dim)]">
            manikandan<span className="neon">.exe</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1 text-xs font-mono uppercase tracking-[0.18em]">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="relative px-3 py-2 rounded-full transition-colors"
              style={{ color: active === l.id ? "var(--accent)" : "var(--fg-dim)" }}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "color-mix(in srgb, var(--accent) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)" }}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid h-8 w-8 place-items-center rounded-md glow-border"
            aria-label="menu"
          >
            <span className="font-mono neon text-xs">≡</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-auto mt-2 max-w-6xl glass glow-border rounded-2xl p-3"
          >
            <div className="flex flex-col">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 font-mono text-xs uppercase tracking-widest"
                  style={{ color: active === l.id ? "var(--accent)" : "var(--fg-dim)" }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
