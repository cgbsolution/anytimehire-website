"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type Theme } from "./ThemeProvider";

const OPTIONS: { value: Theme; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ModeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const Icon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-label="Toggle theme"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition-colors",
          "hover:bg-ink-100 hover:text-ink-900",
          "dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40",
        )}
      >
        {mounted ? (
          <Icon className="h-[18px] w-[18px]" />
        ) : (
          <Sun className="h-[18px] w-[18px]" />
        )}
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute right-0 top-[calc(100%+6px)] z-50 min-w-[160px] overflow-hidden rounded-xl p-1",
            "border border-ink-200 bg-white shadow-[0_12px_32px_-12px_rgba(16,24,40,0.18)]",
            "dark:border-ink-800 dark:bg-ink-900 dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]",
          )}
        >
          {OPTIONS.map((opt) => {
            const active = theme === opt.value;
            const OptIcon = opt.icon;
            return (
              <button
                key={opt.value}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setTheme(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                  "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
                  "dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50",
                )}
              >
                <OptIcon className="h-4 w-4" />
                <span className="flex-1 text-left">{opt.label}</span>
                {active && <Check className="h-3.5 w-3.5 text-brand-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
