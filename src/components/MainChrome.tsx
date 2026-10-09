"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PageTransition } from "@/components/motion/PageTransition";
import { StickyBookCall } from "@/components/StickyBookCall";

// Menu, footer, sticky button and page transition of the main site. Loaded as
// a separate chunk (see SiteChrome) so the landing pages never download it
// or the animation library it pulls in.
export default function MainChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <StickyBookCall />
    </>
  );
}
