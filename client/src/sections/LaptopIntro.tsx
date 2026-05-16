import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LaptopFrame, type LaptopRefs } from "../components/LaptopFrame";
import { ScreenContent } from "../components/ScreenContent";
import { About } from "./About";
import { Skills } from "./Skills";
import { Journey } from "./Journey";
import { Projects } from "./Projects";
import { Terminal } from "./Terminal";
import { Contact } from "./Contact";

gsap.registerPlugin(ScrollTrigger);

/**
 * The entire portfolio renders INSIDE the laptop's screen, inside the
 * Brave-style browser, after the "manikandan-info" search loads. The
 * laptop frame stays permanently visible (full viewport size); scrolling
 * translates the inner-portfolio container UP so the sections scroll past
 * inside the browser's page body — like browsing manikandan.info on a
 * laptop.
 *
 * Phases (timeline progress p):
 *   0.00 – 0.02   ambient room fades in
 *   0.02 – 0.10   lid opens, parent tilts, laptop positions
 *   0.10 – 0.20   POST + shell + browser opens + "manikandan-info" types
 *                 + loading bar — at end, real portfolio fades in INSIDE
 *                 the browser page body (replacing the mockup)
 *   0.20 – 0.25   zoom — laptop scales so the WHOLE laptop frame fits
 *                 inside the viewport (Math.min so bezel/deck remain
 *                 visible as the "device" framing the content)
 *   0.25 – 1.00   inner-scroll — laptop is FIXED at its zoomed pose.
 *                 The inner portfolio container translates up so the
 *                 sections scroll past inside the browser page body.
 */
export function LaptopIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const laptopRefs = useRef<LaptopRefs>({} as LaptopRefs);
  const captionRef = useRef<HTMLSpanElement>(null);
  const innerScrollRef = useRef<HTMLDivElement>(null);

  const [openProgress, setOpenProgress] = useState(0);
  const [screenProgress, setScreenProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const r = laptopRefs.current;
      if (!r.laptop || !sectionRef.current) return;

      gsap.set(r.laptop, {
        rotateX: 0,
        rotateY: 0,
        scale: 0.72,
        x: 0,
        y: 180,
      });
      gsap.set(r.power, { opacity: 0 });
      gsap.set(r.glow, { opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1600%",
        scrub: 0.7,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (st) => {
          const p = st.progress;

          // --- Phase A: laptop opens (0.02 → 0.10) ---
          const open = clamp01((p - 0.02) / (0.10 - 0.02));
          setOpenProgress(open);

          const tilt = ease(open) * 60;
          const yOff = 180 + ease(open) * (160 - 180);
          const sc = 0.72 + ease(open) * (0.76 - 0.72);

          // --- Phase B: ScreenContent runs (0.10 → 0.20) ---
          // ScreenContent goes through stages: BIOS → shell → browser
          // opens → manikandan-info types → loading. We map the linear
          // intro slice onto ScreenContent's 0..1 progress so the
          // portfolio fade-in (at progress 0.75 inside ScreenContent)
          // happens right at the end of the intro slice.
          const screen = clamp01((p - 0.10) / (0.20 - 0.10));
          setScreenProgress(screen);

          if (r.power) {
            const flash =
              p >= 0.09 && p <= 0.12 ? 1 - Math.abs(p - 0.105) / 0.015 : 0;
            r.power.style.opacity = String(Math.max(0, flash * 0.7));
          }
          if (r.glow) r.glow.style.opacity = String(Math.min(0.4, open * 0.55));

          // --- Phase C: zoom (0.20 → 0.25) ---
          // Use Math.MIN so the WHOLE laptop frame (bezel + lid + deck)
          // stays visible inside the viewport. The user sees the laptop
          // as a framing device with the portfolio scrolling inside its
          // screen. (Math.max would crop the laptop and lose the frame.)
          const zoom = clamp01((p - 0.20) / (0.25 - 0.20));

          let baseScale = sc;
          let baseX = 0;
          let baseY = yOff;
          if (zoom > 0 && r.screen) {
            const sRect = r.screen.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            // Width-priority fill: scale the laptop until its SCREEN spans
            // the viewport width edge-to-edge. The deck/bezel may extend
            // off the top + bottom of the viewport at full zoom — that's
            // intentional, the screen is what the user is "looking at".
            const fillScale = vw / Math.max(1, sRect.width);
            void vh;

            const z = ease(zoom);
            baseScale = sc + (sc * fillScale - sc) * z;
            baseX = (vw / 2 - (sRect.left + sRect.width / 2)) * z;
            baseY = yOff + (vh / 2 - (sRect.top + sRect.height / 2) - yOff) * z;

            if (r.glow) r.glow.style.opacity = String(0.4 * (1 - z));
          } else {
            if (r.deck) r.deck.style.opacity = "1";
          }

          gsap.set(r.laptop, {
            rotateX: tilt,
            rotateY: 0,
            scale: baseScale,
            x: baseX,
            y: baseY,
          });

          // --- Phase D: inner portfolio scroll (0.25 → 1.00) ---
          // Translate the inner container upward inside the browser page
          // body. The container's height grows beyond the body (because
          // it has six sections in it); we slide it up so each section
          // scrolls into view in turn.
          if (innerScrollRef.current) {
            const innerHeight = innerScrollRef.current.scrollHeight;
            // The browser page body is the screen rect minus chrome
            // (~64px). Use the screen rect directly since that's a close
            // approximation and recomputes per-frame.
            const bodyHeight = Math.max(
              200,
              (r.screen?.getBoundingClientRect().height ?? 600) - 64,
            );
            const maxScroll = Math.max(0, innerHeight - bodyHeight);
            const innerP = clamp01((p - 0.25) / (1.0 - 0.25));
            innerScrollRef.current.style.transform = `translate3d(0, ${
              -innerP * maxScroll
            }px, 0)`;
          }

          if (captionRef.current) {
            captionRef.current.textContent = captionFor(p);
            const parent = captionRef.current.parentElement;
            if (parent) parent.style.opacity = String(Math.max(0, 1 - zoom));
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Ambient back-glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(closest-side at 50% 35%, color-mix(in srgb, var(--accent, #00ff9c) 12%, transparent), transparent 70%)",
            opacity: 0.5,
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Stage — the laptop. The real portfolio is passed as children of
         ScreenContent, which routes it through to the Browser's page-body
         render path. After the loading bar fills, the real sections
         appear inside the browser, replacing the static mockup. */}
      <div className="absolute inset-0 grid place-items-center px-4">
        <LaptopFrame ref={laptopRefs} openProgress={openProgress}>
          <ScreenContent progress={screenProgress}>
            <div
              ref={innerScrollRef}
              style={{ willChange: "transform", width: "100%" }}
            >
              <About />
              <Skills />
              <Journey />
              <Projects />
              <Terminal />
              <Contact />
            </div>
          </ScreenContent>
        </LaptopFrame>
      </div>

      {/* HUD caption (fades as the zoom completes) */}
      <div className="absolute left-6 bottom-8 z-20 flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase font-mono">
        <span
          className="h-1.5 w-1.5 rounded-full animate-pulse"
          style={{ background: "var(--accent, #00ff9c)" }}
        />
        <span style={{ color: "rgba(255,255,255,0.4)" }}>
          <span
            ref={captionRef}
            style={{
              color: "var(--accent, #00ff9c)",
              textShadow:
                "0 0 8px color-mix(in srgb, var(--accent, #00ff9c) 50%, transparent)",
            }}
          >
            phase_01 · macbook · closed
          </span>
        </span>
      </div>
    </section>
  );
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function captionFor(p: number): string {
  if (p < 0.02) return "phase_01 · macbook · closed";
  if (p < 0.10) return "phase_02 · lid · opening";
  if (p < 0.12) return "phase_03 · POST · self-test";
  if (p < 0.14) return "phase_04 · shell · session";
  if (p < 0.17) return "phase_05 · brave · launching";
  if (p < 0.19) return "phase_06 · query · manikandan-info";
  if (p < 0.20) return "phase_07 · loading · manikandan.info";
  if (p < 0.25) return "phase_08 · zoom · entering";
  return "phase_09 · browsing · manikandan.info";
}
