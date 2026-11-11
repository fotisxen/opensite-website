import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { phoneHref, siteConfig } from "@/lib/site.config";

const PHONE_INTL = "+30 698 449 6660";

// Frame of the English ad landing pages (Cyprus): a slim header with the
// phone and a short footer. No site menu, so an ad visitor stays on the page.
export default function EnglishLandingFrame({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" className="flex min-h-screen flex-col bg-background text-on-surface">
      <header className="sticky top-0 z-40 border-b border-surface-border bg-surface-container-lowest/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-container-max items-center justify-between gap-4 px-4 md:px-margin-desktop">
          <span className="shrink-0 font-headline-sm text-headline-sm font-bold text-text-primary">OpenSite</span>
          <a
            href={phoneHref}
            className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-xl bg-primary-container px-3 font-label-md text-label-md text-white transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] sm:px-4"
          >
            {PHONE_INTL}
          </a>
        </div>
      </header>

      <main lang="en" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-surface-border bg-surface-container-lowest">
        <div className="mx-auto flex max-w-container-max flex-col gap-2 px-4 py-6 font-body-sm text-body-sm text-text-secondary md:flex-row md:items-center md:justify-between md:px-margin-desktop">
          <p>
            © 2026 OpenSite · Thessaloniki, Greece ·{" "}
            <a href={`mailto:${siteConfig.email}`} className="hover:text-text-primary">
              {siteConfig.email}
            </a>
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/privacy-policy/" className="hover:text-text-primary">
              Privacy policy
            </Link>
            <Link href="/terms-of-service/" className="hover:text-text-primary">
              Terms
            </Link>
            <CookieSettingsLink label="Cookie settings" className="hover:text-text-primary" />
          </p>
        </div>
      </footer>
    </div>
  );
}
