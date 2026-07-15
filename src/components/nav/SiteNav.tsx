"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#product", label: "Product" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/demo", label: "Demo" },
  {
    href: "/lp/ai-recruitment-software",
    label: "Free Credits",
    icon: Sparkles,
    accent: true,
  },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          {LINKS.map((link) => {
            const Icon = link.icon;
            if (link.accent) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-200 transition-colors hover:bg-brand-100 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30 dark:hover:bg-brand-500/25"
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="https://app.anytimehire.ai/"
            className="hidden rounded-full px-3.5 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50 sm:inline-flex"
          >
            Login
          </Link>
          <ModeToggle />
          <LinkButton href="/demo" size="sm">
            Start demo
          </LinkButton>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[color:var(--color-surface)] border-b border-ink-200/60 dark:border-ink-800/60 backdrop-blur-xl">
          <div className="container-page py-4">
            <nav className="flex flex-col gap-2">
              {LINKS.map((link) => {
                const Icon = link.icon;
                if (link.accent) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-200 transition-colors hover:bg-brand-100 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30 dark:hover:bg-brand-500/25"
                    >
                      {Icon && <Icon className="h-3.5 w-3.5" />}
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full px-3.5 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50"
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="https://app.anytimehire.ai/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full px-3.5 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50"
              >
                Login
              </Link>
              <LinkButton
                href="/demo"
                size="sm"
                className="w-full justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start demo
              </LinkButton>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
