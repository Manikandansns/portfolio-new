import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      className="relative flex h-8 w-14 items-center rounded-full glow-border p-1"
      aria-label="Toggle theme"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`grid h-6 w-6 place-items-center rounded-full ${dark ? "ml-0" : "ml-6"}`}
        style={{
          background: dark
            ? "linear-gradient(135deg, var(--accent), var(--accent-2))"
            : "linear-gradient(135deg, var(--accent-3), var(--accent-2))",
          boxShadow: "0 0 16px color-mix(in srgb, var(--accent) 50%, transparent)",
        }}
      >
        {dark ? <Moon size={12} color="#000" /> : <Sun size={12} color="#000" />}
      </motion.span>
    </button>
  );
}
