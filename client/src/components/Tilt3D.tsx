import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";

type Props = {
  children: ReactNode;
  max?: number;
  scale?: number;
  glare?: boolean;
  className?: string;
  style?: CSSProperties;
  perspective?: number;
};

export function Tilt3D({
  children,
  max = 14,
  scale = 1.03,
  glare = true,
  className = "",
  style,
  perspective = 1000,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = wrap.current;
    const i = inner.current;
    if (!el || !i) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    gsap.to(i, {
      rotateX: rx,
      rotateY: ry,
      scale,
      duration: 0.4,
      ease: "power3.out",
      transformPerspective: perspective,
    });
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.55,
        x: `${(px - 0.5) * 80}%`,
        y: `${(py - 0.5) * 80}%`,
        duration: 0.4,
      });
    }
  };

  const reset = () => {
    if (inner.current)
      gsap.to(inner.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    if (glareRef.current)
      gsap.to(glareRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div
      ref={wrap}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
      style={{ perspective, transformStyle: "preserve-3d", ...style }}
    >
      <div
        ref={inner}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
            style={{
              background:
                "radial-gradient(closest-side at center, rgba(255,255,255,0.18), transparent 65%)",
              mixBlendMode: "screen",
            }}
          />
        )}
      </div>
    </div>
  );
}
