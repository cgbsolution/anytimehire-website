import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-600",
        "dark:border-ink-800 dark:bg-ink-900 dark:text-ink-300",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      {children}
    </div>
  );
}
