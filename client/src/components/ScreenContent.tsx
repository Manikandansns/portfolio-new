import { useEffect, useState } from "react";

/**
 * Cinematic screen sequence — driven by `progress` (0..1).
 *
 *  0.00 – 0.05  off, faint cursor
 *  0.05 – 0.25  BIOS post + boot lines
 *  0.25 – 0.40  shell — runs commands, last line is `$ open browser`
 *  0.40 – 0.55  browser window slides on, address bar focused
 *  0.55 – 0.75  user types "manikandan-info" + enter, loading bar
 *  0.75 – 1.00  portfolio page renders INSIDE the browser
 */

const BIOS = [
  "[ POST ] manikandan.exe workstation v4.7.2",
  "memory ...... 16,384 MB ........ ok",
  "storage ..... NVMe ............. ok",
  "network ..... eth0 link up ..... ok",
  "gpu ......... initialised ...... ok",
  "kernel ...... 6.7.2-manikandan .. ok",
  "[ READY ]",
];

const SHELL = [
  "$ whoami",
  "manikandan",
  "$ uname -sr",
  "manikandan-os 4.7.2",
  "$ stack --top",
  "react · node · hono · prisma · postgres · typescript",
  "$ open browser --new manikandan-info",
];

const SHELL_RESP_INDEXES = new Set([1, 3, 5]);

type Props = {
  progress: number;
  /** Real portfolio content. When provided, it renders INSIDE the browser
   *  page body once the loading bar completes — replaces the static
   *  mockup so the user sees the actual site loaded by Brave. */
  children?: React.ReactNode;
};

export function ScreenContent({ progress, children }: Props) {
  const stage: 0 | 1 | 2 | 3 | 4 | 5 =
    progress < 0.05 ? 0 :
    progress < 0.25 ? 1 :
    progress < 0.40 ? 2 :
    progress < 0.55 ? 3 :
    progress < 0.75 ? 4 :
    5;

  // local fade-in for browser chrome
  const browserShow = Math.max(0, Math.min(1, (progress - 0.40) / 0.10));
  // address bar typing progress
  const queryFull = "manikandan-info";
  const queryChars = Math.min(
    queryFull.length,
    Math.floor(((progress - 0.55) / 0.12) * queryFull.length),
  );
  const query = queryChars > 0 ? queryFull.slice(0, queryChars) : "";
  // loading bar
  const loading = Math.max(0, Math.min(1, (progress - 0.67) / 0.08));
  // portfolio render
  const portfolio = Math.max(0, Math.min(1, (progress - 0.75) / 0.10));

  return (
    <div className="absolute inset-0 font-mono text-[10px] sm:text-[11px] leading-[1.5]">
      {/* Backplate */}
      <div className="absolute inset-0" style={{ background: "#02050a" }} />

      {/* Pre-browser phases — terminal lives at root of screen */}
      {stage < 3 && (
        <TerminalLayer stage={stage} progress={progress} />
      )}

      {/* Browser window — appears once user "opens" it */}
      {stage >= 3 && (
        <Browser
          show={browserShow}
          query={query}
          loading={loading}
          portfolio={portfolio}
          stage={stage}
        >
          {children}
        </Browser>
      )}
    </div>
  );
}

/* ----------------------------- TERMINAL LAYER ----------------------------- */

function TerminalLayer({ stage, progress }: { stage: number; progress: number }) {
  // BIOS reveal index
  const biosShown =
    stage >= 1
      ? Math.min(BIOS.length, Math.floor(((progress - 0.05) / 0.18) * BIOS.length))
      : 0;
  // SHELL reveal index
  const shellShown =
    stage >= 2
      ? Math.min(SHELL.length, Math.floor(((progress - 0.25) / 0.13) * SHELL.length))
      : 0;

  return (
    <div className="absolute inset-0 p-3 sm:p-5 text-[var(--accent)] overflow-hidden">
      {/* Top mini chrome */}
      <div className="flex items-center justify-between text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-[var(--fg-dim)] mb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f56]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#27c93f]" />
          <span className="ml-2">zsh — manikandan@workstation — 124×40</span>
        </div>
        <span className="hidden sm:inline">tty/0</span>
      </div>

      {/* BIOS */}
      {stage >= 1 &&
        BIOS.slice(0, biosShown).map((l, i) => (
          <div key={i} className={l.includes("READY") ? "neon" : "opacity-65"}>
            {l}
          </div>
        ))}

      {/* SHELL */}
      {stage >= 2 && (
        <div className="mt-2">
          {SHELL.slice(0, shellShown).map((l, i) => {
            const isResp = SHELL_RESP_INDEXES.has(i);
            return (
              <div key={i} className={isResp ? "opacity-70" : "neon"}>
                {isResp ? l : (
                  <>
                    <span className="opacity-80">manikandan@workstation</span>
                    <span className="opacity-50">:~$</span>
                    <span className="ml-2">{l.replace(/^\$ /, "")}</span>
                  </>
                )}
              </div>
            );
          })}
          <span className="blink">█</span>
        </div>
      )}

      {/* Stage 0 — barely-there cursor */}
      {stage === 0 && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="opacity-30 text-[var(--fg-dim)]">
            <span className="blink">_</span>
          </span>
        </div>
      )}
    </div>
  );
}

/* --------------------------------- BROWSER -------------------------------- */

function Browser({
  show,
  query,
  loading,
  portfolio,
  stage,
  children,
}: {
  show: number;
  query: string;
  loading: number;
  portfolio: number;
  stage: number;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="absolute inset-0 p-2 sm:p-3"
      style={{
        opacity: show,
        transform: `translateY(${(1 - show) * 12}px) scale(${0.985 + show * 0.015})`,
        transformOrigin: "50% 60%",
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0c1116 0%, #06090c 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "6px",
          boxShadow: "0 30px 60px -25px rgba(0,255,156,0.18)",
        }}
      >
        {/* Browser title bar */}
        <div
          className="flex items-center gap-2 px-3 py-1.5"
          style={{ background: "#0a0e12", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
          <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
          <div className="ml-3 flex items-center gap-1 text-[8px] tracking-[0.2em] uppercase text-[var(--fg-dim)]">
            <Tab active label="manikandan — search" />
            <Tab label="new tab" />
            <span className="opacity-30">+</span>
          </div>
          <span className="ml-auto text-[8px] tracking-[0.2em] uppercase text-[var(--fg-dim)] hidden sm:inline">
            secure · https
          </span>
        </div>

        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ background: "#080c10", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
          <NavBtn>◀</NavBtn>
          <NavBtn>▶</NavBtn>
          <NavBtn>⟳</NavBtn>
          <div
            className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md"
            style={{
              background: "#040608",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow:
                stage >= 4 && query.length < "manikandan-info".length
                  ? "0 0 0 1px color-mix(in srgb, var(--accent) 35%, transparent)"
                  : "none",
            }}
          >
            <span className="text-[9px] text-[var(--accent)]">⌕</span>
            <span className="font-mono text-[10px] sm:text-[11px] text-[var(--fg)]">
              {query || (
                <span className="text-[var(--fg-dim)]">search or paste url</span>
              )}
              {stage >= 4 && stage < 5 && (
                <span className="blink ml-0.5">|</span>
              )}
            </span>
            <span className="ml-auto text-[8px] tracking-[0.2em] uppercase text-[var(--fg-dim)] hidden sm:inline">
              ⌘L
            </span>
          </div>
          <NavBtn>★</NavBtn>
          <NavBtn>⋯</NavBtn>
        </div>

        {/* Loading bar */}
        <div className="h-[2px] w-full bg-[#0a0d11]">
          <div
            className="h-full"
            style={{
              width: `${loading * 100}%`,
              background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
              boxShadow: "0 0 8px var(--accent)",
              transition: "width 60ms linear",
            }}
          />
        </div>

        {/* Page body */}
        <div className="relative overflow-hidden" style={{ height: "calc(100% - 64px)" }}>
          {/* Search-results preview (between typing and load) */}
          {stage === 4 && loading < 0.5 && (
            <SearchResults query={query} />
          )}

          {/* Portfolio site rendered inside browser. If REAL portfolio
             content was passed in via children, use that — otherwise fall
             back to the static PortfolioPage mockup. */}
          {stage >= 4 && loading >= 0.5 && (
            <div
              className="absolute inset-0"
              style={{
                opacity: Math.max(loading * 1.3 - 0.4, portfolio),
                transition: "opacity 120ms linear",
                background: "var(--bg, #04070a)",
                overflow: "hidden",
              }}
            >
              {children ?? <PortfolioPage opacity={1} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Tab({ active, label }: { active?: boolean; label: string }) {
  return (
    <span
      className="px-2 py-1 rounded-t-md whitespace-nowrap"
      style={{
        background: active ? "#080c10" : "transparent",
        border: active ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        borderBottom: "none",
        color: active ? "var(--fg)" : "var(--fg-dim)",
      }}
    >
      {label}
    </span>
  );
}

function NavBtn({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="grid place-items-center"
      style={{
        height: 22,
        width: 22,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.04)",
        borderRadius: 4,
        color: "var(--fg-dim)",
        fontSize: 10,
      }}
    >
      {children}
    </span>
  );
}

function SearchResults({ query }: { query: string }) {
  return (
    <div className="absolute inset-0 p-5 text-[var(--fg-dim)]">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-[14px] font-bold neon">⌕</span>
        <span className="font-mono text-[13px] text-[var(--fg)]">{query}</span>
      </div>
      <ul className="space-y-3 max-w-[80%]">
        {[
          {
            url: "manikandan.info → portfolio",
            title: "Manikandan B — Full Stack Engineer",
            snip: "react · node · hono · prisma · postgres · gsap · typescript ...",
          },
          {
            url: "github.com/manikandan",
            title: "manikandan · GitHub",
            snip: "23 repos · MERN, Next.js, Prisma, AI agents ...",
          },
          {
            url: "linkedin.com/in/manikandan-b",
            title: "Manikandan B · LinkedIn",
            snip: "RDX Digital · Full Stack Developer · Cuddalore, TN ...",
          },
        ].map((r, i) => (
          <li key={i}>
            <div
              className="font-mono text-[9px] tracking-[0.18em] uppercase"
              style={{ color: i === 0 ? "var(--accent)" : "var(--fg-dim)" }}
            >
              {r.url}
            </div>
            <div
              className="font-mono text-[12px]"
              style={{ color: i === 0 ? "var(--accent)" : "var(--fg)" }}
            >
              {r.title}
            </div>
            <div className="font-mono text-[10px] opacity-70">{r.snip}</div>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-3 left-5 font-mono text-[9px] tracking-[0.25em] uppercase neon">
        redirecting to manikandan.info <span className="blink">_</span>
      </div>
    </div>
  );
}

/* ------------------------- PORTFOLIO PAGE INSIDE ------------------------- */

function PortfolioPage({ opacity }: { opacity: number }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      className="absolute inset-0 px-4 sm:px-6 py-4 sm:py-5"
      style={{ opacity, transition: "opacity 120ms linear", background: "#04070a" }}
    >
      {/* Mini site header */}
      <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--fg-dim)]">
        <span className="flex items-center gap-2">
          <span className="grid place-items-center h-4 w-4 rounded-sm neon" style={{ background: "color-mix(in srgb, var(--accent) 14%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)" }}>M</span>
          manikandan<span className="neon">.info</span>
        </span>
        <nav className="hidden sm:flex gap-3 text-[var(--fg-dim)]">
          <span>about</span><span>skills</span><span>work</span><span className="neon">contact</span>
        </nav>
        <span className="hidden sm:inline">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>

      {/* Hero block */}
      <div className="mt-5 sm:mt-7">
        <div className="font-mono text-[8px] sm:text-[9px] tracking-[0.4em] uppercase neon opacity-80">
          // hello, world
        </div>
        <h2 className="mt-1 font-mono font-extrabold tracking-tight leading-[0.92] text-2xl sm:text-4xl">
          <span className="grad-text">MANI</span><span className="text-[var(--fg)]">KANDAN</span><span className="neon">_</span>
        </h2>
        <p className="mt-2 font-mono text-[10px] sm:text-[11px] text-[var(--fg-dim)] max-w-md">
          full stack engineer · react · node · hono · prisma · postgres
        </p>
      </div>

      {/* Metric tiles */}
      <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[9px] sm:text-[10px]">
        {[
          ["uptime", "3+ yrs"],
          ["builds", "25+"],
          ["status", "online"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="px-2 py-1.5"
            style={{ border: "1px solid var(--line)", background: "rgba(255,255,255,0.015)" }}
          >
            <div className="tracking-[0.25em] uppercase text-[var(--fg-dim)]">{k}</div>
            <div className="neon">{v}</div>
          </div>
        ))}
      </div>

      {/* "Window": top stack */}
      <div className="mt-3 sm:mt-4" style={{ border: "1px solid var(--line)" }}>
        <div className="flex items-center justify-between px-2 py-1 font-mono text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-[var(--fg-dim)]" style={{ borderBottom: "1px solid var(--line)" }}>
          <span>top — stack</span>
          <span className="neon">● live</span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 px-2 py-1.5 font-mono text-[9px] sm:text-[10px]">
          {[
            ["react", 92], ["node", 88], ["hono", 85], ["prisma", 86],
            ["postgres", 84], ["typescript", 93],
          ].map(([name, v]) => (
            <div key={name as string} className="flex items-center justify-between">
              <span className="text-[var(--fg)]">{name}</span>
              <span className="opacity-70">{v}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA prompt */}
      <div className="mt-3 font-mono text-[10px] sm:text-[11px]">
        <span className="neon">root@manikandan</span><span className="text-[var(--fg-dim)]">:~$</span>
        <span className="ml-2">scroll to enter portfolio</span>
        <span className="blink">_</span>
      </div>
    </div>
  );
}
