import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xTo = gsap.quickTo(ring.current, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(ring.current, "y", { duration: 0.35, ease: "power3.out" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3.out" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, .magnetic")) {
        gsap.to(ring.current, { scale: 1.8, borderColor: "var(--accent-3)", duration: 0.3 });
      } else {
        gsap.to(ring.current, { scale: 1, borderColor: "var(--accent)", duration: 0.3 });
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference"
        style={{ borderColor: "var(--accent)", boxShadow: "0 0 18px color-mix(in srgb, var(--accent) 50%, transparent)" }}
      />
      <div
        ref={dot}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "var(--accent)" }}
      />
    </>
  );
}
