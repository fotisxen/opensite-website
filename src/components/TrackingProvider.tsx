"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { isAdminPath, isGreekFramePath } from "@/lib/routes";
import { siteConfig } from "@/lib/site.config";
import {
  captureAttribution,
  getConsent,
  initCookieless,
  loadTags,
  openConsentBanner,
  setBannerOpen,
  setConsent,
  trackCall,
  trackChat,
  useBannerOpen,
} from "@/lib/tracking";

const COPY = {
  el: {
    text: siteConfig.tracking.clarityId
      ? "Με τη συγκατάθεσή σας, η Google, η Meta και η Microsoft βάζουν cookies για τη μέτρηση των διαφημίσεών μας και για το πώς χρησιμοποιείται η σελίδα."
      : "Με τη συγκατάθεσή σας, η Google και η Meta βάζουν cookies για τη μέτρηση και την προβολή των διαφημίσεών μας.",
    // Short form for phones: the full sentence took three lines and the banner
    // then covered the form's own button. Same meaning, same link.
    textShort: "Cookies για τη μέτρηση των διαφημίσεών μας.",
    accept: "Αποδοχή",
    decline: "Απόρριψη",
    policy: "Λεπτομέρειες",
    href: "/el/politiki-aporritou/#cookies",
  },
  en: {
    text: siteConfig.tracking.clarityId
      ? "With your consent, Google, Meta and Microsoft set cookies to measure our ads and how this page is used."
      : "With your consent, Google and Meta set cookies to measure and show our ads.",
    textShort: "Cookies to measure our ads.",
    accept: "Accept",
    decline: "Decline",
    policy: "Details",
    href: "/privacy-policy/#cookies",
  },
} as const;

// Same size and same visual weight on purpose: declining must be exactly as
// easy as accepting.
const buttonClass =
  "min-h-[44px] flex-1 rounded-xl border border-surface-border bg-surface-container-high px-5 py-2.5 font-label-md text-text-primary transition-colors hover:border-primary sm:flex-none";

// Mounted once in the root layout, so it runs on every page. It owns:
// consent banner, tag loading after consent, source capture, and the
// site-wide click tracking for phone and chat links.
export default function TrackingProvider() {
  const pathname = usePathname();
  const open = useBannerOpen();
  const admin = isAdminPath(pathname);
  const copy = isGreekFramePath(pathname) ? COPY.el : COPY.en;
  const bannerRef = useRef<HTMLDivElement>(null);

  // The page gets bottom padding equal to the banner height (see globals.css),
  // so the banner never covers the last links of any page.
  useEffect(() => {
    const root = document.documentElement;
    const el = bannerRef.current;
    if (!open || admin || !el) {
      root.style.removeProperty("--banner-h");
      return;
    }
    const set = () => root.style.setProperty("--banner-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--banner-h");
    };
  }, [open, admin, pathname]);

  useEffect(() => {
    captureAttribution();
    const consent = getConsent();
    if (consent === "granted") loadTags();
    else if (!isAdminPath(window.location.pathname)) {
      initCookieless();
      if (consent === null) openConsentBanner();
    }
  }, []);

  useEffect(() => {
    if (admin) setBannerOpen(false);
  }, [admin]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href) return;
      if (href.startsWith("tel:")) trackCall();
      else if (href.startsWith("viber:") || href.includes("wa.me")) trackChat();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (admin || !open) return null;

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-label="Cookies"
      className="fixed inset-x-0 bottom-0 z-[10000] border-t border-surface-border bg-surface-container-lowest/95 px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:py-3 sm:pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto flex max-w-container-max flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="font-body-sm text-body-sm text-text-secondary">
          {/* Phones get the short line, so the banner stays about one button
              tall and never sits over the lead form's own button. */}
          <span className="sm:hidden">{copy.textShort}</span>
          <span className="hidden sm:inline">{copy.text}</span>{" "}
          <Link href={copy.href} className="whitespace-nowrap text-primary underline">
            {copy.policy}
          </Link>
        </p>
        <div className="flex gap-3">
          <button type="button" className={buttonClass} onClick={() => setConsent("denied")}>
            {copy.decline}
          </button>
          <button type="button" className={buttonClass} onClick={() => setConsent("granted")}>
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
