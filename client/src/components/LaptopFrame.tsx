import { forwardRef, type ReactNode } from "react";

export type LaptopRefs = {
  stage: HTMLDivElement | null;
  laptop: HTMLDivElement | null;
  lid: HTMLDivElement | null;
  deck: HTMLDivElement | null;
  screen: HTMLDivElement | null;
  bezel: HTMLDivElement | null;
  shell: HTMLDivElement | null;
  power: HTMLDivElement | null;
  glow: HTMLDivElement | null;
};

type Props = {
  children: ReactNode;
  openProgress?: number; // 0 to 1
};

export const LaptopFrame = forwardRef<LaptopRefs, Props>(
  ({ children, openProgress = 0 }, ref) => {
    const p = Math.max(0, Math.min(1, openProgress));

    // Keep BOTH shell and bezel at full opacity. The swap between "you see
    // the silver shell" and "you see the screen content" is handled entirely
    // by backface-visibility on the two faces — they're 180° apart in lid-
    // local space, so as the lid rotates past 90° one gets culled and the
    // other becomes face-visible. Using opacity crossfade in addition to
    // backface-culling was creating a transparent window in the middle of
    // the opening (both faces partially transparent, neither fully covering).
    void p; // p still useful for future tweaks; suppress unused warning
    const shellOpacity = 1;
    const screenOpacity = 1;

    const setRef =
      (key: keyof LaptopRefs) => (el: HTMLDivElement | null) => {
        if (ref && "current" in ref && ref.current) {
          ref.current[key] = el;
        }
      };

    return (
      <div
        ref={setRef("stage")}
        className="laptop-stage relative mx-auto"
        style={
          {
            perspective: "2400px",
            perspectiveOrigin: "50% 50%",
            // Compact stage. The lid's free edge sticks ~sin(open_angle) of
            // the lid's height above the hinge after rotation, so a smaller
            // stage keeps the open lid comfortably inside the viewport.
            width: "min(720px, 62vw)",
            aspectRatio: "16 / 10.5",
            // Theme variables — Apple-silver dark theme
            "--laptop-shell-1": "#e2e5e8",
            "--laptop-shell-2": "#bcc0c5",
            "--laptop-shell-3": "#8a8e94",
            "--laptop-shell-edge": "#3d4045",
            "--laptop-shell-hi": "rgba(255,255,255,0.65)",
            "--laptop-deck-1": "#d8dbdf",
            "--laptop-deck-2": "#a9adb2",
            "--laptop-deck-3": "#74787d",
            "--laptop-deck-edge": "#2a2c30",
            "--laptop-bezel": "#08080a",
            "--laptop-bezel-edge": "#000",
            "--laptop-key-cap-1": "#2a2c30",
            "--laptop-key-cap-2": "#0e1012",
            "--laptop-key-cap-edge": "#000",
            "--laptop-key-label": "rgba(255,255,255,0.55)",
            "--laptop-key-label-faint": "rgba(255,255,255,0.22)",
            "--laptop-trackpad-1": "#c4c8cc",
            "--laptop-trackpad-2": "#9499a0",
            "--accent": "#00ff9c",
          } as React.CSSProperties
        }
      >
        {/* Floor Glow */}
        <div
          ref={setRef("glow")}
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-2%] h-16 w-[78%] rounded-[50%]"
          style={{
            background:
              "radial-gradient(closest-side, var(--accent), transparent 70%)",
            filter: "blur(36px)",
            opacity: 0,
          }}
        />
        {/* Floor specular line */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-[62%] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--laptop-shell-2) 75%, transparent), transparent)",
            filter: "blur(6px)",
            opacity: 0.45,
          }}
        />

        <div
          ref={setRef("laptop")}
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "50% 80%",
          }}
        >
          {/* ===================== DECK ===================== */}
          <div
            ref={setRef("deck")}
            className="absolute inset-0"
            style={{
              borderRadius: "16px 16px 22px 22px",
              background:
                "linear-gradient(180deg, var(--laptop-deck-1) 0%, var(--laptop-deck-2) 55%, var(--laptop-deck-3) 100%)",
              border: "1px solid var(--laptop-deck-edge)",
              boxShadow:
                "inset 0 2px 0 var(--laptop-shell-hi), inset 0 -3px 8px rgba(0,0,0,0.35), 0 30px 70px -12px rgba(0,0,0,0.55)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Hinge groove */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 top-0 h-[7px] w-[44%] rounded-b-md"
              style={{
                background:
                  "linear-gradient(180deg, #050709 0%, #1a1c1f 100%)",
                boxShadow:
                  "inset 0 2px 3px rgba(0,0,0,0.75), 0 1px 0 rgba(255,255,255,0.08)",
              }}
            />

            {/* Speaker grilles */} 
            <Grilles />

            {/* Keyboard well — subtle inset shadow under the keys */}
            <div
              aria-hidden
              className="absolute"
              style={{
                left: "8%",
                right: "8%",
                top: "12%",
                bottom: "36%",
                borderRadius: "4px",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.06))",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.25)",
                opacity: Math.min(1, p * 2),
              }}
            />

            {/* Keyboard */}
            <div style={{ opacity: Math.min(1, p * 2) }}>
              <Keyboard />
            </div>

            {/* Trackpad */}
            <Trackpad opacity={Math.min(1, p * 2)} />

            {/* Front wedge bevel */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-2 pointer-events-none"
              style={{
                borderRadius: "0 0 22px 22px",
                background:
                  "linear-gradient(180deg, transparent, rgba(0,0,0,0.45))",
              }}
            />
          </div>

          {/* ===================== LID ===================== */}
          <div
            ref={setRef("lid")}
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "50% 0%",
              // Open angle 108°. Combined with the parent's tilt (~38°) the
              // lid plane reads as upright facing the camera — looks like
              // a properly-open laptop instead of half-cracked.
              transform: `translateZ(2px) rotateX(${p * 108}deg)`,
              willChange: "transform",
            }}
          >
            {/* ---- SHELL (silver outer cover) ---- */}
            <div
              ref={setRef("shell")}
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: "16px 16px 22px 22px",
                background:
                  "linear-gradient(155deg, var(--laptop-shell-1) 0%, var(--laptop-shell-2) 50%, var(--laptop-shell-3) 100%)",
                border: "1px solid var(--laptop-shell-edge)",
                boxShadow:
                  "inset 0 2px 0 var(--laptop-shell-hi), inset 0 -3px 10px rgba(0,0,0,0.35), 0 30px 60px -22px rgba(0,0,0,0.55)",
                backfaceVisibility: "hidden",
                opacity: shellOpacity,
              }}
            >
              {/* Brushed-aluminum diagonal sheen */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(118deg, transparent 35%, var(--laptop-shell-hi) 47%, transparent 60%)",
                  mixBlendMode: "screen",
                  opacity: 0.35,
                }}
              />
              {/* Soft center glow */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[55%] w-[60%] rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, var(--laptop-shell-hi), transparent 70%)",
                  opacity: 0.18,
                  filter: "blur(28px)",
                }}
              />
              {/* Fine vertical brushed grain */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, transparent 0 1.5px, rgba(0,0,0,0.025) 1.5px 2.5px)",
                  mixBlendMode: "multiply",
                  opacity: 0.5,
                }}
              />
              {/* Front-edge shadow */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(0,0,0,0.4))",
                }}
              />
            </div>

            {/* ---- BEZEL + SCREEN ---- */}
            <div
              ref={setRef("bezel")}
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: "16px 16px 6px 6px",
                background: "var(--laptop-bezel)",
                border: "1px solid var(--laptop-bezel-edge)",
                padding: "10px 10px 14px 10px",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.04), 0 25px 55px -22px rgba(0,255,156,0.18)",
                backfaceVisibility: "hidden",
                // rotateX(180) does three things at once:
                //   1. Puts the bezel's drawn face on the BACK side of the
                //      lid plane (face direction -Z in lid-local). When the
                //      lid swings open via positive rotateX, this face ends
                //      up pointing toward the camera.
                //   2. Flips the content vertically. The lid pivots around
                //      its top edge (the hinge), so the lid's HTML bottom
                //      (free edge) lands at the world top after opening —
                //      this pre-flip compensates so the camera notch reads
                //      at the top of the screen and the chin label reads at
                //      the bottom (next to the keyboard), like a real
                //      laptop. Children inside render right-side-up too.
                //   3. Doesn't mirror horizontally (rotateX leaves X alone),
                //      so text stays readable.
                transform: "rotateX(180deg)",
                opacity: screenOpacity,
              }}
            >
              {/* Camera notch */}
              <div
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 top-0 h-[8px] w-[76px] rounded-b-lg z-20"
                style={{
                  background: "#03060a",
                  border: "1px solid rgba(255,255,255,0.04)",
                  borderTop: 0,
                }}
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[3.5px] w-[3.5px] rounded-full bg-[#1c2024]" />
              </div>

              {/* Chin label */}
              <div
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 bottom-[3px] font-mono z-20"
                style={{
                  color: "rgba(255,255,255,0.22)",
                  fontSize: "clamp(6px, 0.6vw, 9px)",
                  letterSpacing: "0.5em",
                }}
              >
                manikandan
              </div>

              {/* Screen */}
              <div
                ref={setRef("screen")}
                className="relative w-full h-full overflow-hidden rounded-[5px]"
                style={{
                  background: "#02050a",
                  boxShadow:
                    "inset 0 0 60px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              >
                {children}

                {/* Scanlines */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-screen opacity-[0.05]"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.5) 2px 3px)",
                  }}
                />
                {/* Vignette */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.55) 100%)",
                  }}
                />
                {/* Diagonal reflection sweep */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.4) 40%, transparent 50%)",
                    opacity: 0.04,
                  }}
                />
                {/* Power-on flash overlay */}
                <div
                  ref={setRef("power")}
                  className="absolute inset-0 pointer-events-none z-50"
                  style={{
                    background:
                      "radial-gradient(closest-side at 50% 60%, color-mix(in srgb, var(--accent) 70%, transparent), transparent 75%)",
                    opacity: 0,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

/* ============================ KEYBOARD ============================ */

type KeyDef = [label: string, span?: number, faint?: boolean];

const ROWS: KeyDef[][] = [
  [
    ["esc", 1, true], ["F1", 1, true], ["F2", 1, true], ["F3", 1, true],
    ["F4", 1, true], ["F5", 1, true], ["F6", 1, true], ["F7", 1, true],
    ["F8", 1, true], ["F9", 1, true], ["F10", 1, true], ["F11", 1, true],
    ["F12", 1, true], ["⏻", 1, true],
  ],
  [
    ["~", 1], ["1", 1], ["2", 1], ["3", 1], ["4", 1], ["5", 1], ["6", 1],
    ["7", 1], ["8", 1], ["9", 1], ["0", 1], ["-", 1], ["=", 1], ["⌫", 1],
  ],
  [
    ["⇥", 1], ["Q", 1], ["W", 1], ["E", 1], ["R", 1], ["T", 1], ["Y", 1],
    ["U", 1], ["I", 1], ["O", 1], ["P", 1], ["[", 1], ["]", 1], ["\\", 1],
  ],
  [
    ["⇪", 2], ["A", 1], ["S", 1], ["D", 1], ["F", 1], ["G", 1], ["H", 1],
    ["J", 1], ["K", 1], ["L", 1], [";", 1], ["'", 1], ["⏎", 1],
  ],
  [
    ["⇧", 2], ["Z", 1], ["X", 1], ["C", 1], ["V", 1], ["B", 1], ["N", 1],
    ["M", 1], [",", 1], [".", 1], ["/", 1], ["⇧", 2],
  ],
  [
    ["ctrl", 1], ["fn", 1], ["opt", 1], ["⌘", 1], ["", 6], ["⌘", 1],
    ["opt", 1], ["◀", 1], ["▶", 1],
  ],
];

function Keyboard() {
  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        left: "8%",
        right: "8%",
        top: "12%",
        bottom: "36%",
        display: "grid",
        gridTemplateRows: "0.55fr 1fr 1fr 1fr 1fr 1fr",
        rowGap: "3px",
      }}
    >
      {ROWS.map((row, ri) => (
        <div
          key={ri}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(14, 1fr)",
            columnGap: "3px",
          }}
        >
          {row.map(([label, span = 1, faint = false], ki) => (
            <Key key={`${ri}-${ki}`} label={label} span={span} faint={faint} />
          ))}
        </div>
      ))}
    </div>
  );
}

function Key({
  span = 1,
  label,
  faint = false,
}: {
  span?: number;
  label?: string;
  faint?: boolean;
}) {
  return (
    <div
      style={{
        gridColumn: `span ${span}`,
        background:
          "linear-gradient(180deg, var(--laptop-key-cap-1) 0%, var(--laptop-key-cap-2) 100%)",
        borderRadius: "3.5px",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.65), 0 1px 0 rgba(0,0,0,0.5)",
        border: "1px solid var(--laptop-key-cap-edge)",
        display: "grid",
        placeItems: "center",
        minHeight: 0,
      }}
    >
      {label && (
        <span
          style={{
            fontFamily:
              "var(--font-mono, ui-monospace, 'JetBrains Mono', monospace)",
            fontSize: "clamp(5px, 0.55vw, 8px)",
            color: faint
              ? "var(--laptop-key-label-faint)"
              : "var(--laptop-key-label)",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function Trackpad({ opacity }: { opacity: number }) {
  return (
    <div
      aria-hidden
      className="absolute left-1/2 -translate-x-1/2"
      style={{
        bottom: "7%",
        height: "22%",
        width: "34%",
        borderRadius: "8px",
        background:
          "linear-gradient(180deg, var(--laptop-trackpad-1), var(--laptop-trackpad-2))",
        border: "1px solid var(--laptop-shell-edge)",
        boxShadow:
          "inset 0 1px 0 var(--laptop-shell-hi), inset 0 -2px 4px rgba(0,0,0,0.18), 0 1px 0 rgba(0,0,0,0.2)",
        opacity,
      }}
    />
  );
}

function Grilles() {
  const base: React.CSSProperties = {
    top: "12%",
    bottom: "36%",
    width: "5%",
    background:
      "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.55) 0.7px, transparent 1.3px)",
    backgroundSize: "5px 5px",
    opacity: 0.55,
    borderRadius: "3px",
  };
  return (
    <>
      <div className="absolute left-[2.5%]" style={base} />
      <div className="absolute right-[2.5%]" style={base} />
    </>
  );
}
