import { useEffect, useRef, useState } from "react";
import { profile, skills, projects } from "../data/portfolio";

type Line = { kind: "in" | "out" | "err" | "title"; text: string };

const BANNER = `
  __  __    _    _   _ ___ _  __    _    _   _ ____    _    _   _
 |  \\/  |  / \\  | \\ | |_ _| |/ /   / \\  | \\ | |  _ \\  / \\  | \\ | |
 | |\\/| | / _ \\ |  \\| || || ' /   / _ \\ |  \\| | | | |/ _ \\ |  \\| |
 | |  | |/ ___ \\| |\\  || || . \\  / ___ \\| |\\  | |_| / ___ \\| |\\  |
 |_|  |_/_/   \\_\\_| \\_|___|_|\\_\\/_/   \\_\\_| \\_|____/_/   \\_\\_| \\_|
       fullstack.exe  ·  type 'help' to list commands
`;

const HELP = `
available commands:
  help        show this menu
  about       who am I
  skills      stack overload
  projects    selected deployments
  contact     reach out
  resume      download CV
  clear       wipe terminal
  whoami      print user
  sudo        try it 😉
`;

function buildOutput(cmd: string): Line[] {
  const c = cmd.trim().toLowerCase();
  if (!c) return [];
  if (c === "help") return [{ kind: "out", text: HELP }];
  if (c === "whoami") return [{ kind: "out", text: `guest@${profile.handle}` }];
  if (c === "clear") return [{ kind: "out", text: "__CLEAR__" }];
  if (c === "about")
    return [
      { kind: "out", text: `${profile.name} — ${profile.roles[0]}` },
      { kind: "out", text: profile.tagline },
      { kind: "out", text: `📍 ${profile.location}   ✉ ${profile.email}` },
    ];
  if (c === "skills")
    return Object.entries(skills).map(([k, v]) => ({
      kind: "out",
      text: `${k.padEnd(10)} ${v.join(", ")}`,
    }));
  if (c === "projects")
    return projects.map((p) => ({ kind: "out", text: `• ${p.title.padEnd(36)} [${p.tag}]` }));
  if (c === "contact")
    return [
      { kind: "out", text: `email   : ${profile.email}` },
      { kind: "out", text: `phone   : ${profile.phone}` },
      { kind: "out", text: `github  : ${profile.github}` },
      { kind: "out", text: `linkedin: ${profile.linkedin}` },
    ];
  if (c === "resume")
    return [{ kind: "out", text: "opening resume.pdf ..." }, { kind: "out", text: "__RESUME__" }];
  if (c.startsWith("sudo"))
    return [{ kind: "err", text: "[sudo] permission denied: nice try, hacker 😎" }];
  if (c === "ls")
    return [{ kind: "out", text: "about/  skills/  projects/  contact/  resume.pdf" }];
  return [{ kind: "err", text: `command not found: ${cmd} — try 'help'` }];
}

export function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { kind: "title", text: BANNER },
    { kind: "out", text: "[boot] tip: try `help`, `about`, `projects`, `skills`, `contact`, `resume`." },
  ]);
  const [value, setValue] = useState("");
  const [recall, setRecall] = useState<string[]>([]);
  const [rIdx, setRIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const submit = (raw: string) => {
    const out = buildOutput(raw);
    if (out.some((l) => l.text === "__CLEAR__")) {
      setHistory([]);
      return;
    }
    const resume = out.some((l) => l.text === "__RESUME__");
    const filtered = out.filter((l) => l.text !== "__RESUME__");
    setHistory((h) => [...h, { kind: "in", text: raw }, ...filtered]);
    if (resume) window.open(profile.resumeUrl, "_blank");
    if (raw.trim()) setRecall((r) => [raw, ...r].slice(0, 30));
    setRIdx(-1);
  };

  return (
    <section id="terminal" className="relative">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="section">
        <span className="section-label">// shell.live</span>
        <h2 className="font-mono text-3xl md:text-5xl font-bold mt-4 mb-3 balance">
          interactive <span className="grad-text">terminal</span>
        </h2>
        <p className="text-[var(--fg-dim)] mb-8 max-w-xl">
          Poke around the way a real hacker would. Type <span className="neon font-mono">help</span> and hit enter.
        </p>

        <div className="glass glow-border rounded-xl overflow-hidden" onClick={() => inputRef.current?.focus()}>
          <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--fg-dim)]">
              guest@manikandan.exe — bash — 120x36
            </span>
          </div>
          <div
            ref={bodyRef}
            className="font-mono text-sm leading-relaxed p-4 max-h-[460px] min-h-[360px] overflow-y-auto"
          >
            {history.map((l, i) => {
              if (l.kind === "title")
                return (
                  <pre key={i} className="text-[var(--accent)] whitespace-pre text-[10px] sm:text-xs leading-tight">
                    {l.text}
                  </pre>
                );
              if (l.kind === "in")
                return (
                  <div key={i}>
                    <span className="neon">guest@manikandan</span>
                    <span className="text-[var(--fg-dim)]">:~$ </span>
                    <span>{l.text}</span>
                  </div>
                );
              if (l.kind === "err")
                return <div key={i} style={{ color: "#ff6b6b" }}>{l.text}</div>;
              return <pre key={i} className="whitespace-pre-wrap text-[var(--fg-dim)]">{l.text}</pre>;
            })}
            <div className="flex items-center">
              <span className="neon">guest@manikandan</span>
              <span className="text-[var(--fg-dim)]">:~$&nbsp;</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submit(value);
                    setValue("");
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    const ni = Math.min(recall.length - 1, rIdx + 1);
                    setRIdx(ni);
                    if (recall[ni] != null) setValue(recall[ni]);
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    const ni = Math.max(-1, rIdx - 1);
                    setRIdx(ni);
                    setValue(ni === -1 ? "" : recall[ni] ?? "");
                  }
                }}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent outline-none text-[var(--fg)] font-mono"
              />
              <span className="blink neon">█</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
