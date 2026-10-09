"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { englishCounterpart, greekCounterpart } from "@/lib/routes";

// Language toggle shown as a flag plus the language code, like a translation
// switch. It links to the same page in the other language when there is one,
// otherwise to the home page of that language.
function GreekFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 27 18" aria-hidden="true" className="shrink-0 rounded-[2px]">
      <rect width="27" height="18" fill="#0d5eaf" />
      <g fill="#fff">
        <rect y="2" width="27" height="2" />
        <rect y="6" width="27" height="2" />
        <rect y="10" width="27" height="2" />
        <rect y="14" width="27" height="2" />
        <rect width="10" height="10" fill="#0d5eaf" />
        <rect x="4" width="2" height="10" />
        <rect y="4" width="10" height="2" />
      </g>
    </svg>
  );
}

function UkFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 60 40" aria-hidden="true" className="shrink-0 rounded-[2px]">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#c8102e" strokeWidth="3" />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13" />
      <path d="M30 0v40M0 20h60" stroke="#c8102e" strokeWidth="8" />
    </svg>
  );
}

export default function LanguageSwitch({
  to,
  className = "",
}: {
  to: "el" | "en";
  className?: string;
}) {
  const pathname = usePathname();
  const greek = to === "el";
  const href = greek ? greekCounterpart(pathname) : englishCounterpart(pathname);

  return (
    <Link
      href={href}
      hrefLang={to}
      lang={to}
      aria-label={greek ? "Ελληνικά" : "English"}
      title={greek ? "Ελληνικά" : "English"}
      className={`inline-flex min-h-[44px] items-center gap-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-text-primary ${className}`}
    >
      {greek ? <GreekFlag /> : <UkFlag />}
      {greek ? "EL" : "EN"}
    </Link>
  );
}
