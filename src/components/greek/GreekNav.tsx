"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageSwitch from "@/components/LanguageSwitch";
import { GREEK_NAV } from "@/lib/greek";
import { isLandingPath } from "@/lib/routes";
import { phoneHref, siteConfig } from "@/lib/site.config";

function isActive(pathname: string | null, href: string) {
  const p = (pathname ?? "").replace(/\/+$/, "");
  const h = href.replace(/\/+$/, "");
  return p === h || p.startsWith(`${h}/`);
}

// Header of the Greek site. Plain CSS, no animation library, and no icon
// font: the Greek pages stay light.
export default function GreekNav() {
  const pathname = usePathname();
  // Ad landing pages: the phone stays visible on phones too, and there is no
  // language switch, which would send an ad visitor to the English site.
  const landing = isLandingPath(pathname);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border bg-surface-container-lowest/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-container-max items-center justify-between gap-4 px-4 md:px-margin-desktop">
        <Link href="/el/" className="shrink-0 font-headline-sm text-headline-sm font-bold text-text-primary">
          OpenSite
        </Link>

        <nav aria-label="Κύριο μενού" className="hidden items-center gap-6 lg:flex">
          {GREEK_NAV.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap font-body-md text-body-md transition-colors ${
                  active
                    ? "border-b-2 border-primary pb-1 font-bold text-primary"
                    : "text-on-surface-variant hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {!landing && <LanguageSwitch to="en" />}
          <a
            href={phoneHref}
            className={`min-h-[44px] items-center rounded-xl bg-primary-container font-label-md text-label-md text-white transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] ${
              landing ? "inline-flex whitespace-nowrap px-3" : "hidden px-4 sm:inline-flex"
            }`}
          >
            {siteConfig.phone.display}
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="greek-mobile-menu"
            aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-text-primary lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="greek-mobile-menu" aria-label="Μενού κινητού" className="border-t border-surface-border bg-surface-container-lowest lg:hidden">
          <div className="mx-auto flex max-w-container-max flex-col px-4 py-2">
            {GREEK_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-[48px] items-center border-b border-surface-border font-body-md text-body-md text-text-primary"
              >
                {link.label}
              </Link>
            ))}
            <a href={phoneHref} className="mt-3 mb-2 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary-container font-label-md text-label-md text-white">
              Κάλεσε {siteConfig.phone.display}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
