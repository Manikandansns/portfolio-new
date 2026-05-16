import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const HINTS = [
  ["~", "manikandansns05@gmail.com"],
  ["call", "+91 7010534355"],
  ["loc", "Cuddalore, Tamil Nadu"],
  ["github", "/manikandan"],
  ["linkedin", "/in/manikandan-b"],
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState<"idle" | "ready" | "sent">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cc-line", {
        opacity: 0,
        y: 18,
        duration: 0.8,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body =
      `Hi Manikandan,%0D%0A%0D%0A${encodeURIComponent(String(data.get("message") || ""))}` +
      `%0D%0A%0D%0A— ${encodeURIComponent(String(data.get("name") || ""))} (${encodeURIComponent(String(data.get("email") || ""))})`;
    const subject = encodeURIComponent(String(data.get("subject") || "Hello from your portfolio"));
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStage("sent");
  };

  return (
    <section id="contact" ref={ref} className="relative">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-32 md:py-40">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-12">
          {/* Left rail — meta + statement */}
          <div className="col-span-12 md:col-span-5">
            <div className="cc-line font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--fg-dim)]">
              · 05 / open channel
            </div>
            <h2 className="cc-line font-mono text-[34px] sm:text-5xl md:text-[58px] leading-[0.95] mt-3 tracking-tight">
              type a message.
              <br />
              <span className="grad-text">i&apos;ll reply.</span>
            </h2>

            <p className="cc-line mt-8 font-mono text-[14px] leading-[1.85] text-[var(--fg-dim)] max-w-[40ch]">
              Freelance, full-time, weird ideas — all open. Best ping is email; phone works if you
              prefer voice. I&apos;m in IST (UTC+5:30) and usually online evenings.
            </p>

            <dl className="cc-line mt-10 font-mono text-[12px] divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {HINTS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[80px_1fr] py-2.5">
                  <dt className="text-[var(--fg-dim)] tracking-[0.25em] uppercase text-[10px] flex items-center">
                    {k}
                  </dt>
                  <dd className="text-[var(--fg)]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — command-line composer */}
          <div className="col-span-12 md:col-span-7 md:pl-8 md:border-l md:border-[var(--line)]">
            <div className="cc-line font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--fg-dim)] mb-4">
              ./compose.sh — opens local mail client
            </div>

            <form onSubmit={onSubmit} className="cc-line font-mono text-[14px] space-y-5">
              <Prompt label="from" example="your name">
                <input
                  name="name"
                  required
                  placeholder="ada lovelace"
                  className="cli-input"
                  onFocus={() => setStage("ready")}
                />
              </Prompt>
              <Prompt label="reply-to" example="your email">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="ada@analytical.engine"
                  className="cli-input"
                />
              </Prompt>
              <Prompt label="subject" example="what's this about">
                <input
                  name="subject"
                  placeholder="project / role / collab"
                  className="cli-input"
                />
              </Prompt>
              <Prompt label="body" example="the actual message" multiline>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="tell me what you're building, what's broken, what's possible…"
                  className="cli-input resize-none"
                />
              </Prompt>

              {/* status + submit row */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--fg-dim)]">
                  status:{" "}
                  <span
                    className={
                      stage === "sent"
                        ? "neon"
                        : stage === "ready"
                          ? "text-[var(--accent-2)]"
                          : "text-[var(--fg-dim)]"
                    }
                  >
                    {stage === "sent" ? "✓ dispatched" : stage === "ready" ? "● composing" : "○ idle"}
                  </span>
                </span>
                <button
                  type="submit"
                  className="ml-auto group inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.3em] uppercase neon px-4 py-2.5 border border-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] transition-colors"
                >
                  send {"·>"}
                  <span className="blink">_</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom signature */}
        <div className="mt-24 pt-6 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[var(--fg-dim)]">
          <span>
            manikandan b · {new Date().getFullYear()} · handcrafted in{" "}
            <span className="text-[var(--fg)]">react · gsap · lenis</span>
          </span>
          <span className="neon">
            end of transmission <span className="blink">_</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function Prompt({
  label,
  example,
  children,
  multiline,
}: {
  label: string;
  example: string;
  children: React.ReactNode;
  multiline?: boolean;
}) {
  return (
    <label className={`block ${multiline ? "" : ""}`}>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase neon">
          {label}
        </span>
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--fg-dim)]">
          // {example}
        </span>
      </div>
      <div className="border-b border-[var(--line)] focus-within:border-[var(--accent)] transition-colors">
        {children}
      </div>
    </label>
  );
}
