"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#product", label: "Product" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/demo", label: "Demo" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-ink-200/60 bg-[color:var(--color-surface)]/80 backdrop-blur-xl dark:border-ink-800/60"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="AnytimeHire home">
          <Image
            src="/logo.svg"
            alt="AnytimeHire"
            width={650}
            height={168}
            priority
            className="h-7 w-auto dark:brightness-0 dark:invert"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/login"
            className="hidden rounded-full px-3.5 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50 sm:inline-flex"
          >
            Login
          </Link>
          <ModeToggle />
          <LinkButton href="/demo" size="sm">
            Start demo
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
