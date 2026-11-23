import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { siteConfig, whatsappEnquiryHref } from "@/lib/site.config";

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9c0 1.75.46 3.46 1.34 4.96L2 22l5.3-1.39a9.9 9.9 0 0 0 4.74 1.21h.01a9.9 9.9 0 0 0 9.9-9.9A9.9 9.9 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.39 8.25 8.25 0 1 1 8.25 8.25zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.21.88 2.39 1.01 2.55.12.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.18 1.13.16 1.55.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z" />
    </svg>
  );
}

// Frame of the English ad landing pages (Cyprus): a slim header and a short
// footer. No site menu, so an ad visitor stays on the page.
//
// The header CTA is WhatsApp, not the phone: the number is Greek (+30) and a
// visitor in Cyprus reads a foreign number as "not from here, will cost me to
// call". WhatsApp is free, normal in Cyprus, and hides the country prefix.
export default function EnglishLandingFrame({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en" className="flex min-h-screen flex-col bg-background text-on-surface">
      <header className="sticky top-0 z-40 border-b border-surface-border bg-surface-container-lowest/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-container-max items-center justify-between gap-4 px-4 md:px-margin-desktop">
          <span className="shrink-0 font-headline-sm text-headline-sm font-bold text-text-primary">OpenSite</span>
          <a
            href={whatsappEnquiryHref("en")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-primary-container px-3 font-label-md text-label-md text-white transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] sm:px-4"
          >
            <WhatsAppIcon />
            WhatsApp
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
