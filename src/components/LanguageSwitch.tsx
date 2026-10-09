import Link from "next/link";
import { LANDING_PATHS } from "@/lib/routes";

// Language toggle: the site is in English, the Greek version is the Greek
// web design page. Shown as a flag plus the language code, like a translation
// switch, instead of a menu item.
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

export default function LanguageSwitch({ className = "" }: { className?: string }) {
  return (
    <Link
      href={`${LANDING_PATHS[0]}/`}
      hrefLang="el"
      lang="el"
      aria-label="Ελληνικά"
      title="Ελληνικά"
      className={`inline-flex min-h-[44px] items-center gap-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-text-primary ${className}`}
    >
      <GreekFlag />
      EL
    </Link>
  );
}
