import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MagneticButton } from "../components/MagneticButton";
import { Tilt3D } from "../components/Tilt3D";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { profile } from "../data/portfolio";

export function Contact() {
  const ref = useGsapReveal<HTMLDivElement>({ selector: ".reveal", stagger: 0.08 });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `Hi Manikandan,%0D%0A%0D%0A${encodeURIComponent(String(data.get("message") || ""))}%0D%0A%0D%0A— ${encodeURIComponent(String(data.get("name") || ""))} (${encodeURIComponent(String(data.get("email") || ""))})`;
    const subject = encodeURIComponent(String(data.get("subject") || "Hello from your portfolio"));
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              background: i % 2 ? "var(--accent-3)" : "var(--accent)",
              boxShadow: "0 0 8px currentColor",
            }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div ref={ref} className="section">
        <div className="reveal"><span className="section-label">// transmit</span></div>
        <h2 className="reveal font-mono text-3xl md:text-5xl font-bold mt-4 mb-4 balance">
          let's <span className="grad-text">build something</span>
          <br /> the internet remembers.
        </h2>
        <p className="reveal text-[var(--fg-dim)] max-w-xl mb-12">
          Open to freelance, full-time, and collaboration. Drop a message — I reply fast.
        </p>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <Tilt3D max={6} scale={1.01} className="reveal">
          <form onSubmit={onSubmit} className="glass glow-border rounded-xl p-6 space-y-4" style={{ transformStyle: "preserve-3d" }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field name="name" label="name" placeholder="Your name" required />
              <Field name="email" label="email" type="email" placeholder="you@domain.com" required />
            </div>
            <Field name="subject" label="subject" placeholder="Project / role / idea" />
            <div>
              <label className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--fg-dim)]">// message</label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell me what you're building…"
                className="mt-1 w-full bg-transparent border border-[var(--line)] focus:border-[var(--accent)] rounded-lg px-3 py-2.5 outline-none font-mono text-sm transition-all"
                style={{ boxShadow: "inset 0 0 0 1px transparent" }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "inset 0 0 0 1px transparent")}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[var(--fg-dim)]">{sent ? "// dispatched ✓" : "// awaiting input"}</span>
              <MagneticButton>
                <button type="submit" className="btn-neon">
                  <Send size={14} /> transmit
                </button>
              </MagneticButton>
            </div>
          </form>
          </Tilt3D>

          <div className="space-y-3">
            <InfoLine icon={Mail} label="email" value={profile.email} href={`mailto:${profile.email}`} />
            <InfoLine icon={Phone} label="phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
            <InfoLine icon={MapPin} label="location" value={profile.location} />
            <InfoLine icon={FaGithub} label="github" value="@manikandan" href={profile.github} />
            <InfoLine icon={FaLinkedin} label="linkedin" value="manikandan-b" href={profile.linkedin} />
          </div>
        </div>

        <div className="reveal mt-14 pt-6 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[var(--fg-dim)]">
          <span>© {new Date().getFullYear()} manikandan.exe — built with React, GSAP, Lenis & ☕</span>
          <span className="neon">end_of_transmission // <span className="blink">_</span></span>
        </div>
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", placeholder, required }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--fg-dim)]">// {label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full bg-transparent border border-[var(--line)] focus:border-[var(--accent)] rounded-lg px-3 py-2.5 outline-none font-mono text-sm transition-all"
        onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent)")}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      />
    </div>
  );
}

function InfoLine({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const Cmp = href ? "a" : "div";
  return (
    <Cmp
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="glass glow-border rounded-xl p-4 flex items-center gap-4 group transition-transform hover:-translate-y-0.5"
    >
      <div className="grid h-10 w-10 place-items-center rounded-md" style={{ background: "color-mix(in srgb, var(--accent) 10%, transparent)", color: "var(--accent)", border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)" }}>
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--fg-dim)]">// {label}</div>
        <div className="font-mono text-sm text-[var(--fg)]">{value}</div>
      </div>
      <span className="font-mono text-xs neon opacity-0 group-hover:opacity-100 transition">↗</span>
    </Cmp>
  );
}
