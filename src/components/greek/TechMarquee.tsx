const TECH = [
  "Next.js",
  "React",
  "Webflow",
  "Supabase",
  "SharePoint",
  "SPFx",
  "Electron",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
];

// Endless strip of the tools we build with. The list is doubled so the loop
// has no visible seam.
export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-surface-border bg-surface-container-lowest py-5" aria-label="Τεχνολογίες">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-container-lowest to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-container-lowest to-transparent" />
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-headline-sm text-headline-sm font-semibold text-text-secondary/70">
        {[...TECH, ...TECH].map((t, i) => (
          <span key={i} aria-hidden={i >= TECH.length ? "true" : undefined}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
