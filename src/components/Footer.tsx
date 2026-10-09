"use client";

import Link from "next/link";
import { hasCompanyIdentity } from "@/lib/legal";
import { usePathname } from "next/navigation";
import ContactButtons from "@/components/landing/ContactButtons";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { siteConfig } from "@/lib/site.config";

// Your Mailchimp audience details
// const MAILCHIMP_URL =
//   "https://us10.list-manage.com/subscribe/post?u=1234567890abcdef&id=abcdef1234";

const footerLinks = {
  Services: [
    { href: "/services/web-development/", label: "Web Development" },
    { href: "/services/ui-ux-design/", label: "UI/UX Design" },
    { href: "/services/seo-strategy/", label: "SEO Strategy" },
    { href: "/services/crm/", label: "CRM Integration" },
  ],
  Company: [
    { href: "/about/", label: "About Us" },
    { href: "/case-studies/", label: "Case Studies" },
    { href: "/insights/", label: "Insights" },
    { href: "/contact/", label: "Contact Us" },
  ],
  Legal: [
    { href: "/privacy-policy/", label: "Privacy Policy" },
    { href: "/terms-of-service/", label: "Terms of Use" },
    // Only once the legal name is known: otherwise the block has nothing to show.
    ...(hasCompanyIdentity ? [{ href: "/terms-of-service/#company", label: "Company details" }] : []),
  ],
};

const socialsAll = [
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebook,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
];

// A link is only shown once its URL exists in the site config.
const socials = socialsAll.filter((s): s is typeof s & { href: string } => s.href !== null);

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="w-full border-t border-surface-border bg-surface-container-lowest py-stack-lg">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-4 md:px-margin-desktop">
        {/* Brand */}
        <div>
          <div className="mb-4 font-headline-sm text-headline-sm font-bold text-text-primary">
            OpenSite
          </div>
          <p className="mb-6 font-body-sm text-body-sm text-text-secondary">
            Building digital engines that drive real business growth across the
            globe.
          </p>
          <ContactButtons phoneLabel={`Call ${siteConfig.phone.display}`} className="mb-6" />
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-text-secondary transition-colors hover:text-primary"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-4 font-label-md text-text-primary">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body-sm text-body-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-12 flex max-w-container-max flex-col gap-6 border-t border-surface-border px-margin-mobile pt-8 md:px-margin-desktop">
        {/* Copyright row */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-surface-border pt-6 md:flex-row">
          <p className="font-body-sm text-body-sm text-text-secondary">
            © {new Date().getFullYear()} OpenSite Digital Agency. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <CookieSettingsLink className="font-body-sm text-body-sm text-text-secondary transition-colors hover:text-primary" />
            <Link
              href="/book-a-call/"
              className="font-body-sm text-body-sm text-text-secondary transition-colors hover:text-primary"
            >
              Book a Free Call →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
