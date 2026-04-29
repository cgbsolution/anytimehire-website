"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ModeToggle } from "@/components/theme/ModeToggle";

export function DemoBanner({ stepLabel }: { stepLabel?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/80 backdrop-blur-xl dark:border-ink-800 dark:bg-ink-900/80">
      <div className="container-page flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-ink-600 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to site
          </Link>
          <span className="h-4 w-px bg-ink-200 dark:bg-ink-800" />
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="AnytimeHire"
              width={650}
              height={168}
              className="h-6 w-auto dark:brightness-0 dark:invert"
            />
          </Link>
          {stepLabel && (
            <span className="hidden items-center gap-2 text-xs text-ink-500 dark:text-ink-400 sm:flex">
              <span className="h-3 w-px bg-ink-200 dark:bg-ink-800" />
              {stepLabel}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30">
            <Sparkles className="h-3 w-3" /> Scripted demo
          </span>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
