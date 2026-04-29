import { cn } from "@/lib/utils";

type FitLevel = "high" | "medium" | "low";

const STYLES: Record<FitLevel, { chip: string; dot: string; label: string }> = {
  high: {
    chip: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30",
    dot: "bg-emerald-500",
    label: "High fit",
  },
  medium: {
    chip: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30",
    dot: "bg-amber-500",
    label: "Medium fit",
  },
  low: {
    chip: "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:ring-rose-500/30",
    dot: "bg-rose-500",
    label: "Low fit",
  },
};

export function FitChip({
  level,
  percent,
  className,
}: {
  level: FitLevel;
  percent?: number;
  className?: string;
}) {
  const style = STYLES[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tabular",
        style.chip,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
      {percent !== undefined ? `${percent}% — ${style.label}` : style.label}
    </span>
  );
}
