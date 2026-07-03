"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/services/", label: "Services" },
  { href: "/case-studies/", label: "Case Studies" },
  { href: "/about/", label: "About" },
  { href: "/insights/", label: "Insights" },
  { href: "/contact/", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  const normalized = href.replace(/\/$/, "");
  if (normalized === "") return pathname === "/";
  return pathname.startsWith(normalized);
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 z-50 w-full nav-blur border-b border-surface-border shadow-sm"
      >
        {/*
          3-column flex layout:
          [left: logo]  [center: nav, absolutely centered]  [right: CTA or hamburger]
          Each side is flex-1 so the nav stays truly centered
          and the right-side element is always flush to the right edge of the padding.
        */}
        <div className="mx-auto flex h-20 w-full max-w-container-max items-center px-4 sm:px-6 xl:px-10">

          {/* LEFT — logo, flex-1 so it takes up the left third */}
          <div className="flex flex-1 items-center">
            <Link
              href="/"
              className="shrink-0 font-headline-sm text-headline-sm font-bold text-text-primary transition-opacity hover:opacity-80"
            >
              OpenSite
            </Link>
          </div>

          {/* CENTER — desktop nav, only on xl+ */}
          <nav className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap font-body-md text-body-md transition-colors ${
                    active
                      ? "border-b-2 border-primary pb-1 font-bold text-primary"
                      : "text-on-surface-variant hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT — CTA on desktop, hamburger on mobile; flex-1 + justify-end keeps it flush right */}
          <div className="flex flex-1 items-center justify-end">
            {/* Desktop CTA — only on xl+ */}
            <Link
              href="/book-a-call"
              className="hidden shrink-0 rounded-lg bg-primary-container px-5 py-2.5 font-label-md text-white transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95 xl:inline-flex"
            >
              Book a Free Call
            </Link>

            {/* Mobile hamburger — hidden on xl+, -mr-1 aligns it visually with the padding edge */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="relative -mr-1 flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-md transition-colors hover:bg-surface-border xl:hidden"
            >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-0.5 w-5 origin-center bg-text-primary"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-5 bg-text-primary"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-0.5 w-5 origin-center bg-text-primary"
            />
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm xl:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 right-0 top-20 z-40 border-b border-surface-border bg-[rgba(11,18,32,0.8)] backdrop-blur-md shadow-lg xl:hidden"
            >
              <nav className="flex flex-col px-4 py-6 sm:px-6">
                {navLinks.map((link, i) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center border-b border-surface-border py-4 font-body-md text-body-md transition-colors ${
                          active
                            ? "font-bold text-primary"
                            : "text-on-surface-variant hover:text-text-primary"
                        }`}
                      >
                        {active && (
                          <span className="mr-3 h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.05, duration: 0.2 }}
                  className="mt-6"
                >
                  <Link
                    href="/book-a-call"
                    className="flex w-full items-center justify-center rounded-lg bg-primary-container px-6 py-3 font-label-md text-white transition-all hover:opacity-90 active:scale-95"
                  >
                    Book a Free Call
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}