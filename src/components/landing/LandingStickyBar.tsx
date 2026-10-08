"use client";

import { useEffect, useState } from "react";
import { focusLeadForm, LEAD_FORM_ID } from "@/lib/leadForm";
import { phoneHref } from "@/lib/site.config";
import { useBannerOpen } from "@/lib/tracking";

// Mobile-only bar pinned to the bottom of the landing pages. It appears
// only once the form has scrolled out of view, and never while the cookie
// banner is open.
export default function LandingStickyBar({ requestLabel }: { requestLabel: string }) {
  const [formVisible, setFormVisible] = useState(true);
  const bannerOpen = useBannerOpen();

  useEffect(() => {
    const form = document.getElementById(LEAD_FORM_ID);
    if (!form) return;
    const io = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting));
    io.observe(form);
    return () => io.disconnect();
  }, []);

  if (formVisible || bannerOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-surface-border bg-surface-container-lowest/95 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      <div className="flex h-14 items-center gap-3">
        <a
          href={phoneHref}
          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-surface-border bg-surface-container-high font-label-md text-label-md text-text-primary"
        >
          Κάλεσε
        </a>
        <button
          type="button"
          onClick={focusLeadForm}
          className="flex h-11 flex-1 items-center justify-center rounded-xl bg-primary-container font-label-md text-label-md text-white"
        >
          {requestLabel}
        </button>
      </div>
    </div>
  );
}
