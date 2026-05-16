import { useEffect, useState } from "react";

/**
 * A fixed-position laptop bezel that fades in once the LaptopIntro's zoom
 * phase completes, then stays for the rest of the page so every subsequent
 * section reads as "content being browsed inside the laptop".
 *
 * Why this is a fixed overlay instead of pinning the 3D laptop forever:
 *   - The 3D laptop is meaningful only during the intro choreography.
 *   - For the long tail (About → Contact) we just need the FRAME — a
 *     thin chassis around the viewport — so the page content reads as
 *     displayed inside a laptop browser.
 *
 * Scroll detection note: we use `window.scrollY` (NOT
 * `getBoundingClientRect().top`) because the LaptopIntro section is
 * pinned by ScrollTrigger — while pinned, its `rect.top` stays at 0
 * regardless of how far the user has scrolled. `scrollY` keeps climbing
 * past the pin so we can detect "we're near the end of the pin".
 */
export function LaptopFrameOverlay() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const intro = document.getElementById("home");
      if (!intro) return;
      const sectionHeight = intro.offsetHeight;
      const sectionStart = intro.offsetTop;
      const scrollY =
        window.scrollY || document.documentElement.scrollTop || 0;
      const scrolledPast = scrollY - sectionStart;

      // The intro pin is `+=500%` (5× viewport height). The zoom phase
      // runs in the last ~14% of the pin = scrolledPast in [4.3×, 5.0×]
      // section heights. Fade the overlay in across that window so it
      // crossfades with the 3D laptop's peak-zoom state.
      const fadeStart = sectionHeight * 4.3;
      const fadeEnd = sectionHeight * 4.95;

      let next = 0;
      if (scrolledPast >= fadeEnd) next = 1;
      else if (scrolledPast > fadeStart)
        next = (scrolledPast - fadeStart) / (fadeEnd - fadeStart);

      setOpacity(next);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Lenis dispatches plain `scroll` events on window, so this hook
    // works whether smooth-scroll is on or off.
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bezel thicknesses — picked to match the 3D laptop's bezel proportion
  // at peak zoom so the handoff reads as one continuous frame.
  const T = 34; // top bezel (carries notch)
  const B = 48; // bottom bezel (carries chin label)
  const S = 20; // side bezels
  const CORNER = 18; // inner-corner radius

  const BEZEL_BG =
    "linear-gradient(180deg, #11141a 0%, #07090c 45%, #11141a 100%)";
  const INNER_EDGE = "1px solid rgba(255, 255, 255, 0.08)";

  if (opacity <= 0.001) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 60, opacity, transition: "opacity 100ms linear" }}
    >
      {/* TOP bezel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: `${T}px`,
          background: BEZEL_BG,
          borderBottom: INNER_EDGE,
          boxShadow:
            "0 6px 18px rgba(0,0,0,0.65), inset 0 -1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Camera notch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "110px",
            height: "20px",
            background: "#03060a",
            border: INNER_EDGE,
            borderTop: 0,
            borderRadius: "0 0 14px 14px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#1c2024",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          />
        </div>
        {/* Status pill, top-right (mimics the boot HUD on the 3D laptop) */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(0, 255, 156, 0.7)",
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#00ff9c",
              boxShadow: "0 0 6px #00ff9c",
            }}
          />
          manikandan.info · live
        </div>
      </div>

      {/* BOTTOM bezel with chin label */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: `${B}px`,
          background: BEZEL_BG,
          borderTop: INNER_EDGE,
          boxShadow:
            "0 -6px 18px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "11px",
            letterSpacing: "0.55em",
            textTransform: "lowercase",
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
          }}
        >
          manikandan
        </span>
      </div>

      {/* LEFT bezel */}
      <div
        style={{
          position: "absolute",
          top: `${T}px`,
          bottom: `${B}px`,
          left: 0,
          width: `${S}px`,
          background: BEZEL_BG,
          borderRight: INNER_EDGE,
          boxShadow: "3px 0 14px rgba(0,0,0,0.55)",
        }}
      />

      {/* RIGHT bezel */}
      <div
        style={{
          position: "absolute",
          top: `${T}px`,
          bottom: `${B}px`,
          right: 0,
          width: `${S}px`,
          background: BEZEL_BG,
          borderLeft: INNER_EDGE,
          boxShadow: "-3px 0 14px rgba(0,0,0,0.55)",
        }}
      />

      {/* Screen-area inner glow + thin neon trim — sells the "powered-on
         laptop screen" feel even though the inside is the actual page */}
      <div
        style={{
          position: "absolute",
          top: `${T}px`,
          bottom: `${B}px`,
          left: `${S}px`,
          right: `${S}px`,
          boxShadow:
            "inset 0 0 100px rgba(0, 255, 156, 0.06), inset 0 0 0 1px rgba(0, 255, 156, 0.10)",
          borderRadius: `${CORNER}px`,
          pointerEvents: "none",
        }}
      />

      {/* Corner masks: paint over the four inner corners of the bezel so
         the screen edges read as rounded like a real laptop display. */}
      <CornerMask pos="tl" T={T} B={B} S={S} R={CORNER} />
      <CornerMask pos="tr" T={T} B={B} S={S} R={CORNER} />
      <CornerMask pos="bl" T={T} B={B} S={S} R={CORNER} />
      <CornerMask pos="br" T={T} B={B} S={S} R={CORNER} />
    </div>
  );
}

function CornerMask({
  pos,
  T,
  B,
  S,
  R,
}: {
  pos: "tl" | "tr" | "bl" | "br";
  T: number;
  B: number;
  S: number;
  R: number;
}) {
  const top = pos.startsWith("t");
  const left = pos.endsWith("l");
  // Anchor the radial-gradient at the OUTER corner of the small square,
  // i.e. the corner pointing AWAY from the inner screen.
  const cx = left ? "100%" : "0%";
  const cy = top ? "100%" : "0%";
  const mask = `radial-gradient(circle at ${cx} ${cy}, transparent ${R}px, #000 ${R + 1}px)`;
  return (
    <div
      style={{
        position: "absolute",
        width: R,
        height: R,
        top: top ? T : undefined,
        bottom: !top ? B : undefined,
        left: left ? S : undefined,
        right: !left ? S : undefined,
        background:
          "linear-gradient(180deg, #11141a 0%, #07090c 50%, #11141a 100%)",
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
