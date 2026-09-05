"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSafeLocalStorage = (key: string): string | null => {
  try {
    if (typeof window !== "undefined" && "localStorage" in window) {
      return window.localStorage.getItem(key);
    }
  } catch (_) {
    return null;
  }
  return null;
};

const setSafeLocalStorage = (key: string, value: string) => {
  try {
    if (typeof window !== "undefined" && "localStorage" in window) {
      window.localStorage.setItem(key, value);
    }
  } catch (_) {}
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = getSafeLocalStorage("theme") as Theme | null;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setThemeState(savedTheme);
    } else {
      setThemeState("system");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    const applyTheme = () => {
      let activeTheme: "light" | "dark" = "dark";

      if (theme === "system") {
        try {
          const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          activeTheme = systemPrefersDark ? "dark" : "light";
        } catch (_) {
          activeTheme = "dark";
        }
      } else {
        activeTheme = theme === "dark" ? "dark" : "light";
      }

      setResolvedTheme(activeTheme);

      if (activeTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();

    if (theme === "system") {
      try {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => applyTheme();
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } catch (_) {}
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setSafeLocalStorage("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
