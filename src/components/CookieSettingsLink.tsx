"use client";

import { openConsentBanner } from "@/lib/tracking";

export default function CookieSettingsLink({
  label = "Cookie settings",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button type="button" onClick={openConsentBanner} className={className}>
      {label}
    </button>
  );
}
