"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
};

const STORAGE_KEY = "anytimehire.theme";

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function systemPrefersDark() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyThemeClass(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    "light",
  );

  React.useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "system";
    setThemeState(stored);
    const resolved = stored === "system" ? (systemPrefersDark() ? "dark" : "light") : stored;
    setResolvedTheme(resolved);
    applyThemeClass(resolved);
  }, []);

  React.useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const next = mql.matches ? "dark" : "light";
      setResolvedTheme(next);
      applyThemeClass(next);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    const resolved = next === "system" ? (systemPrefersDark() ? "dark" : "light") : next;
    setResolvedTheme(resolved);
    applyThemeClass(resolved);
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: "system" as Theme,
      resolvedTheme: "light" as const,
      setTheme: () => {},
    };
  }
  return ctx;
}

export const THEME_INIT_SCRIPT = `
(function(){try{
  var k='${STORAGE_KEY}';
  var s=localStorage.getItem(k);
  var d=s==='dark'||((!s||s==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);
  var r=document.documentElement;
  if(d){r.classList.add('dark');r.style.colorScheme='dark';}
  else{r.style.colorScheme='light';}
}catch(e){}})();
`;
