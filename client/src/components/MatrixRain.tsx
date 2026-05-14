import { useEffect, useRef } from "react";

export function MatrixRain({ opacity = 0.18 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const chars = "01アカサタナハマヤラワABCDEF<>{};=#$".split("");
    let drops: number[] = [];
    const fontSize = 14;

    const resize = () => {
      c.width = c.offsetWidth * devicePixelRatio;
      c.height = c.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      const cols = Math.ceil(c.offsetWidth / fontSize);
      drops = new Array(cols).fill(1);
    };
    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const draw = (t: number) => {
      if (t - last > 55) {
        last = t;
        ctx.fillStyle = "rgba(5,8,10,0.08)";
        ctx.fillRect(0, 0, c.offsetWidth, c.offsetHeight);
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          ctx.fillStyle = Math.random() > 0.975 ? "#b14bff" : "#00ff9c";
          ctx.fillText(text, x, y);
          if (y > c.offsetHeight && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
    />
  );
}
