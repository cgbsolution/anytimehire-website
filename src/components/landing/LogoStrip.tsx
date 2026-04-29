const COMPANIES = [
  "Northwind",
  "Lumen Labs",
  "Arcwave",
  "Parabola",
  "Strata.io",
  "Helio",
];

export function LogoStrip() {
  return (
    <section className="border-y border-ink-200/80 bg-white/60 py-8 dark:border-ink-800/80 dark:bg-ink-900/40">
      <div className="container-page">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
          Trusted by modern talent teams
        </p>
        <div className="mt-5 grid grid-cols-2 gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
          {COMPANIES.map((c) => (
            <div
              key={c}
              className="flex items-center justify-center font-display text-lg font-semibold tracking-tight text-ink-700 dark:text-ink-300"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
