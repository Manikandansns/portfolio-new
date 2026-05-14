import { useRef, type ReactNode, type HTMLAttributes } from "react";
import { gsap } from "gsap";

type Props = HTMLAttributes<HTMLDivElement> & { children: ReactNode; strength?: number };

export function MagneticButton({ children, strength = 0.35, className = "", ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.35, ease: "power3.out" });
  };
  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`magnetic inline-block ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
