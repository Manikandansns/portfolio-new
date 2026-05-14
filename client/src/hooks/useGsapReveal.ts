import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal<T extends HTMLElement>(opts?: { y?: number; stagger?: number; selector?: string }) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = opts?.selector ? el.querySelectorAll(opts.selector) : [el];
    const anim = gsap.from(targets, {
      opacity: 0,
      y: opts?.y ?? 40,
      duration: 0.9,
      ease: "power3.out",
      stagger: opts?.stagger ?? 0.08,
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
    });
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [opts?.y, opts?.stagger, opts?.selector]);
  return ref;
}
