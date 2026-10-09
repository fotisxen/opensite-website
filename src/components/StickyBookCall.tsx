"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isAdminPath, isGreekFramePath } from "@/lib/routes";
import { useBannerOpen } from "@/lib/tracking";
import Icon from "@/components/Icon";

const SHOW_AFTER_PX = 600;
const EXCLUDED = ["/book-a-call", "/contact"];

export function StickyBookCall() {
  const pathname = usePathname();
  const bannerOpen = useBannerOpen();
  const [scrolled, setScrolled] = useState(false);

  // Only after the visitor has read a screen or so, so it never covers the
  // first thing they see.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const path = (pathname ?? "").replace(/\/+$/, "");
  if (
    !scrolled ||
    bannerOpen ||
    EXCLUDED.includes(path) ||
    isGreekFramePath(pathname) ||
    isAdminPath(pathname)
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 xl:hidden">
      <span className="absolute inset-0 animate-ping rounded-full bg-primary-container opacity-30" />
      <Link
        href="/book-a-call/"
        className="relative flex items-center gap-2 rounded-full bg-primary-container px-6 py-3 font-label-md text-white shadow-lg shadow-primary-container/30 transition-all hover:scale-105 hover:opacity-95 active:scale-95"
      >
        <Icon name="phone_in_talk" className="text-[18px]" />
        Let&apos;s Talk, Book a Free Call
      </Link>
    </div>
  );
}
