"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { StickyBookCall } from "@/components/StickyBookCall";
import { isGreekFramePath } from "@/lib/routes";

// The landing pages and the thank-you page draw their own minimal frame
// (see LandingFrame), so the main menu, site footer, sticky button and
// page transition must not render there. A visitor from an ad has two
// options, the form or the phone; every other link is a reason to leave.
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
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <StickyBookCall />
    </>
  );
}
