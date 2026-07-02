"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 w-full nav-blur border-b border-surface-border shadow-sm"
    >
      <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-mobile md:px-margin-desktop">
        <Link
          href="/"
          className="font-headline-sm text-headline-sm font-bold text-text-primary transition-opacity hover:opacity-80"
        >
          OpenSite
        </Link>

        <nav className="hidden items-center gap-stack-lg md:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body-md text-body-md transition-colors ${
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

        <Link
          href="/contact/"
          className="rounded-lg bg-primary-container px-6 py-3 font-label-md text-white transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95"
        >
          Get Free Consultation
        </Link>
      </div>
    </motion.header>
  );
}
