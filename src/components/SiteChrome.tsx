"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { isGreekFramePath } from "@/lib/routes";

const MainChrome = dynamic(() => import("@/components/MainChrome"));

// The landing pages and the thank-you page draw their own minimal frame
// (see LandingFrame), so the main menu, site footer, sticky button and page
// transition must not render there. A visitor from an ad has two options,
// the form or the phone; every other link is a reason to leave. The main
// chrome is a separate chunk, so those pages also ship less JavaScript.
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
