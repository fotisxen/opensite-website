"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { isGreekFramePath } from "@/lib/routes";

const MainChrome = dynamic(() => import("@/components/MainChrome"));

// Greek pages (the /el/ site, the landing pages and the thank-you page) draw
// their own Greek menu and footer (see GreekFrame), so the English main
// chrome must not render there. The main chrome is a separate chunk, so those
// pages also ship less JavaScript.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (isGreekFramePath(pathname)) {
    return (
      <>
        <SmoothScroll />
        {children}
      </>
    );
  }

  return (
    <>
      <SmoothScroll />
      <MainChrome>{children}</MainChrome>
    </>
  );
}
