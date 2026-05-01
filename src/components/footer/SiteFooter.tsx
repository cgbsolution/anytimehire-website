import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    items: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Create a JD", href: "/demo/create-jd" },
      { label: "Score candidates", href: "/demo/evaluate" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Trust center", href: "#" },
      { label: "DPA", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-950">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/logo.svg"
              alt="AnytimeHire"
              width={650}
              height={168}
              className="h-8 w-auto dark:brightness-0 dark:invert"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-600 dark:text-ink-400">
              AI-led interviews that surface the right candidates — without the
              bias, the backlog, or the back-and-forth.
            </p>
            <a
              href="mailto:info@anytimehire.ai"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-700 dark:text-ink-300 dark:hover:text-brand-300"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30">
                <Mail className="h-4 w-4" />
              </span>
              info@anytimehire.ai
            </a>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-700 transition-colors hover:text-ink-900 dark:text-ink-300 dark:hover:text-ink-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink-200 pt-6 text-xs text-ink-500 dark:border-ink-800 dark:text-ink-400 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} AnytimeHire. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-ink-900 dark:hover:text-ink-50">LinkedIn</Link>
            <Link href="#" className="hover:text-ink-900 dark:hover:text-ink-50">X</Link>
            <Link href="#" className="hover:text-ink-900 dark:hover:text-ink-50">Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
