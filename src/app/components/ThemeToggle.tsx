"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      window.localStorage.getItem("theme-preference")) as Theme | null;
    const initial: Theme =
      stored ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme-preference", next);
  };

  if (!theme) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-md border border-foreground/20 px-3 py-1.5 text-sm hover:bg-foreground/5"
      style={{ outlineColor: "var(--accent)" }}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
