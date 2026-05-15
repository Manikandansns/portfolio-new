import { motion } from "motion/react";
import { Cpu, Database, Rocket, Sparkles } from "lucide-react";
import { useGsapReveal } from "../hooks/useGsapReveal";
import { Tilt3D } from "../components/Tilt3D";
import { ParallaxLayer } from "../components/ParallaxLayer";
import { profile, stats } from "../data/portfolio";
import portrait from "../assets/manikandan.jpg";

const HIGHLIGHTS = [
  { icon: Rocket, label: "Scalable SPAs", text: "MERN/Next apps tuned for speed and DX." },
  { icon: Database, label: "Robust Backends", text: "Node, Hono, Express, Prisma, REST + auth." },
  { icon: Cpu, label: "AI Integrations", text: "Gemini-powered agents and automation." },
  { icon: Sparkles, label: "Cinematic UI", text: "GSAP + Motion micro-interactions." },
];

export function About() {
  const ref = useGsapReveal<HTMLDivElement>({ selector: ".reveal", y: 50, stagger: 0.12 });

  return (
    <section id="about" className="relative">
      <div className="absolute inset-0 grid-overlay opacity-50" />
      <div ref={ref} className="section relative">
        <div className="reveal mb-6"><span className="section-label">// about</span></div>
        <h2 className="reveal font-mono text-3xl md:text-5xl font-bold mb-4 balance">
          building <span className="grad-text">scalable systems</span>
          <br /> with cinematic interfaces.
        </h2>
        <p className="reveal max-w-2xl text-[var(--fg-dim)] mb-12 balance">
          I'm Manikandan — a Full Stack engineer and AI & Data Science student at SNS College of
          Engineering. I architect ERP systems, SaaS platforms, dashboards, booking systems and
          AI-driven tools. I obsess over clean code, fast UIs, and shipping things that matter.
        </p>

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-10 items-start">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="reveal relative"
          >
            <ParallaxLayer speed={0.25}>
              <Tilt3D max={12} scale={1.04} className="rounded-2xl">
                <div className="glow-border glass rounded-2xl p-2 relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 25%, transparent), transparent 70%)" }} />
                  <img
                    src={portrait}
                    alt={profile.name}
                    className="w-full rounded-xl object-cover aspect-[4/5] grayscale contrast-110"
                    style={{ filter: "grayscale(1) contrast(1.1) brightness(1.05)" }}
                  />
                  {/* scanline overlay */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, transparent 0 2px, color-mix(in srgb, var(--accent) 10%, transparent) 2px 3px)",
                      mixBlendMode: "screen",
                      opacity: 0.35,
                    }}
                  />
                  {/* floating HUD chips on top of portrait, pushed forward in Z */}
                  <div className="absolute top-3 left-3 glass rounded-md px-2 py-1 font-mono text-[10px] tracking-widest" style={{ transform: "translateZ(40px)", color: "var(--accent)", border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)" }}>
                    <span className="blink">●</span> rec
                  </div>
                  <div className="absolute top-3 right-3 glass rounded-md px-2 py-1 font-mono text-[10px] tracking-widest" style={{ transform: "translateZ(40px)", color: "var(--accent-3)" }}>
                    id://M-01
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 glass rounded-md px-3 py-2 font-mono text-xs flex items-center justify-between" style={{ transform: "translateZ(50px)" }}>
                    <span className="neon">● online</span>
                    <span className="text-[var(--fg-dim)]">{profile.location}</span>
                  </div>
                </div>
              </Tilt3D>
            </ParallaxLayer>
            {/* Stat strip — drifts at a different speed for parallax */}
            <ParallaxLayer speed={-0.15}>
              <div className="reveal mt-4 grid grid-cols-2 gap-2">
                {stats.map((s) => (
                  <div key={s.label} className="glass glow-border rounded-lg p-3">
                    <div className="font-mono text-2xl neon">{s.value}</div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-dim)]">{s.label}</div>
                  </div>
                ))}
              </div>
            </ParallaxLayer>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="reveal glass glow-border rounded-xl p-5 group transition-transform hover:-translate-y-1">
                <div
                  className="grid h-10 w-10 place-items-center rounded-md mb-3"
                  style={{ background: "color-mix(in srgb, var(--accent) 10%, transparent)", color: "var(--accent)", border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)" }}
                >
                  <h.icon size={18} />
                </div>
                <div className="font-mono text-sm neon">{h.label}</div>
                <p className="text-sm text-[var(--fg-dim)] mt-1">{h.text}</p>
              </div>
            ))}

            <div className="reveal glass glow-border rounded-xl p-5 sm:col-span-2 font-mono text-xs">
              <div className="text-[var(--fg-dim)] mb-2">// personal_info.json</div>
              <pre className="text-[var(--fg)] whitespace-pre-wrap leading-relaxed">
{`{
  "name":     "Manikandan B",
  "degree":   "B.Tech AI & Data Science (GPA 8.25)",
  "based_in": "Cuddalore, Tamil Nadu",
  "email":    "${profile.email}",
  "phone":    "${profile.phone}",
  "open_to":  ["freelance", "fulltime", "collabs"]
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
