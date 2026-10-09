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
      {/* Icon font: only the main site needs it. On the landing pages it was a
          render-blocking request that delayed the headline by about 0.9 s. */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        precedence="default"
      />
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <StickyBookCall />
    </>
  );
}
