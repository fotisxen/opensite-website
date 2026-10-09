import Link from "next/link";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import ContactButtons from "@/components/landing/ContactButtons";
import { GREEK_NAV } from "@/lib/greek";
import { hasCompanyIdentity } from "@/lib/legal";
import { siteConfig } from "@/lib/site.config";
import GreekNav from "./GreekNav";

// Frame of the Greek site (/el/...): Greek menu with the language switch,
// a short footer. Pages put themselves inside it, like the landing pages do
// with LandingFrame, so the English chrome never loads here.
export default function GreekFrame({ children }: { children: React.ReactNode }) {
  const { social } = siteConfig;
  return (
    <div
      lang="el"
      // Sora has no Greek glyphs, so Greek headings use the body font (Inter).
      style={{ ["--font-display" as string]: "var(--font-body)" }}
      className="min-h-screen bg-background text-on-surface"
    >
      <GreekNav />
      <main lang="el">{children}</main>

      <footer className="border-t border-surface-border bg-surface-container-lowest">
        <div className="mx-auto grid max-w-container-max gap-8 px-4 py-10 md:grid-cols-3 md:px-margin-desktop">
          <div>
            <p className="font-headline-sm text-headline-sm font-bold text-text-primary">OpenSite</p>
            <p className="mt-2 font-body-md text-body-md text-text-secondary">
              Στούντιο ανάπτυξης ιστοσελίδων στη Θεσσαλονίκη.
            </p>
          </div>

          <nav aria-label="Σελίδες">
            <ul className="space-y-1 font-body-md text-body-md text-text-secondary">
              {GREEK_NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-[32px] items-center hover:text-text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 font-body-md text-body-md text-text-secondary">
            <ContactButtons phoneLabel={siteConfig.phone.display} />
            <p>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-text-primary">
                {siteConfig.email}
              </a>
            </p>
            <p className="flex flex-wrap gap-x-4 gap-y-1">
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
                  Instagram
                </a>
              )}
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
                  Facebook
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary">
                  LinkedIn
                </a>
              )}
            </p>
          </div>
        </div>
        <div className="border-t border-surface-border">
          <div className="mx-auto flex max-w-container-max flex-col gap-2 px-4 py-4 font-body-sm text-body-sm text-text-secondary md:flex-row md:items-center md:justify-between md:px-margin-desktop">
            <p>© 2026 OpenSite, Θεσσαλονίκη</p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
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
        </div>
      </footer>
    </div>
  );
}
