"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { isAdminPath, isGreekFramePath } from "@/lib/routes";
import {
  captureAttribution,
  getConsent,
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
    text: "Χρησιμοποιούμε cookies για να μετράμε πόσο αποδίδουν οι διαφημίσεις μας. Μπορείς να τα δεχτείς ή να τα απορρίψεις.",
    accept: "Αποδοχή",
    decline: "Απόρριψη",
    policy: "Πολιτική απορρήτου",
  },
  en: {
    text: "We use cookies to measure how our ads perform. You can accept or decline.",
    accept: "Accept",
    decline: "Decline",
    policy: "Privacy policy",
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

  useEffect(() => {
    captureAttribution();
    const consent = getConsent();
    if (consent === "granted") loadTags();
    else if (consent === null && !isAdminPath(window.location.pathname)) openConsentBanner();
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
      role="dialog"
      aria-label="Cookies"
      className="fixed inset-x-0 bottom-0 z-[10000] border-t border-surface-border bg-surface-container-lowest/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-container-max flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body-sm text-body-sm text-text-secondary">
          {copy.text}{" "}
          <Link href="/privacy-policy/" className="whitespace-nowrap text-primary underline">
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
