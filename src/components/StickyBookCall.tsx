"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyBookCall() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 xl:hidden">
      <span className="absolute inset-0 animate-ping rounded-full bg-primary-container opacity-30" />
      <Link
        href="/book-a-call"
        className="relative flex items-center gap-2 rounded-full bg-primary-container px-6 py-3 font-label-md text-white shadow-lg shadow-primary-container/30 transition-all hover:scale-105 hover:opacity-95 active:scale-95"
      >
        <span className="material-symbols-outlined text-[18px]">
          phone_in_talk
        </span>
        Let&apos;s Talk — Book a Free Call
      </Link>
    </div>
  );
}
