import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { hasCompanyIdentity } from "@/lib/legal";
import { phoneHref, siteConfig } from "@/lib/site.config";

// Minimal frame for the landing and thank-you pages: logo without a link,
// the phone number, and a small footer. No main menu, no newsletter.
export default function LandingFrame({
  children,
  withStickyPadding = false,
}: {
  children: React.ReactNode;
  withStickyPadding?: boolean;
}) {
  return (
    <div
      lang="el"
      // Sora has no Greek glyphs, so Greek headings use the body font (Inter).
      style={{ ["--font-display" as string]: "var(--font-body)" }}
      className="min-h-screen bg-background text-on-surface"
    >
      <header className="border-b border-surface-border bg-surface-container-lowest">
        <div className="mx-auto flex h-14 max-w-container-max items-center justify-between px-4 md:px-margin-desktop">
          <span className="font-headline-sm text-headline-sm font-bold text-text-primary">OpenSite</span>
          <a
            href={phoneHref}
            className="inline-flex min-h-[44px] items-center gap-2 font-label-md text-label-md text-text-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-primary">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
            </svg>
            {siteConfig.phone.display}
          </a>
        </div>
      </header>

      <main lang="el" className={withStickyPadding ? "pb-20 md:pb-0" : ""}>
        {children}
      </main>

      <footer className="border-t border-surface-border bg-surface-container-lowest">
        <div className="mx-auto flex max-w-container-max flex-col gap-3 px-4 py-6 font-body-sm text-body-sm text-text-secondary md:flex-row md:items-center md:justify-between md:px-margin-desktop">
          <p>© 2026 OpenSite, Θεσσαλονίκη</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-text-primary">
              {siteConfig.email}
            </a>
            <Link href="/el/politiki-aporritou/" className="hover:text-text-primary">
              Πολιτική απορρήτου
            </Link>
            <Link href="/el/oroi-chrisis/" className="hover:text-text-primary">
              Όροι χρήσης
            </Link>
            {hasCompanyIdentity && (
              <Link href="/el/oroi-chrisis/#stoicheia" className="hover:text-text-primary">
                Στοιχεία επιχείρησης
              </Link>
            )}
            <CookieSettingsLink label="Ρυθμίσεις cookies" className="hover:text-text-primary" />
          </p>
        </div>
      </footer>
    </div>
  );
}
