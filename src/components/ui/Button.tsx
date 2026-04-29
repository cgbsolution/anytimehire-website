import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-[0_1px_2px_rgba(16,24,40,0.06),0_0_0_1px_rgba(70,95,255,0.5)_inset] hover:shadow-[0_8px_24px_-6px_rgba(70,95,255,0.45)]",
  secondary:
    "bg-white text-ink-900 ring-1 ring-ink-200 hover:ring-ink-300 hover:bg-ink-50 dark:bg-ink-900 dark:text-ink-50 dark:ring-ink-800 dark:hover:bg-ink-800 dark:hover:ring-ink-700",
  ghost:
    "text-ink-700 hover:text-ink-900 hover:bg-ink-100 dark:text-ink-300 dark:hover:text-ink-50 dark:hover:bg-ink-800",
  dark: "bg-ink-900 text-white hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)] disabled:opacity-50 disabled:cursor-not-allowed";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}

type LinkButtonProps = React.ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function LinkButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}
