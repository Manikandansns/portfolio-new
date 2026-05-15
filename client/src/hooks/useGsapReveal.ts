import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Reveal on first scroll-into-view. Uses IntersectionObserver instead of
 * ScrollTrigger so it cannot be desynced by Lenis or by sibling pinned
 * sections that change layout after mount.
 */
export function useGsapReveal<T extends HTMLElement>(opts?: {
  y?: number;
  stagger?: number;
  selector?: string;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = (
      opts?.selector ? el.querySelectorAll(opts.selector) : [el]
    ) as ArrayLike<Element>;
    if (!targets.length) return;

    // No animation if user prefers reduced motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: opts?.y ?? 40, willChange: "transform,opacity" });

    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !played) {
            played = true;
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: opts?.stagger ?? 0.08,
              clearProps: "willChange",
            });
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: "opacity,y,transform,willChange" });
    };
  }, [opts?.y, opts?.stagger, opts?.selector]);

  return ref;
}
