"use client";

import Link from "next/link";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const footerLinks = {
  Services: [
    { href: "/web-development/", label: "Web Development" },
    { href: "/services/ui-ux-design/", label: "UI/UX Design" },
    { href: "/services/seo-strategy/", label: "SEO Strategy" },
  ],
  Company: [
    { href: "/about/", label: "About Us" },
    { href: "/case-studies/", label: "Case Studies" },
    { href: "/insights/", label: "Insights" },
    { href: "/contact/", label: "Contact Us" },
  ],
  Legal: [
    { href: "/privacy-policy/", label: "Privacy Policy" },
    { href: "/terms-of-service/", label: "Terms of Service" },
  ],
};

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/opensite-web-development",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/opensite.gr",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeState, setSubscribeState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeState("loading");

    try {
      // 1️⃣ Notify you (FormSubmit)
      const res = await fetch("https://formsubmit.co/ajax/info@opensite.gr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: `New newsletter subscriber: ${email}`,
          message: "New subscriber from insights page",
        }),
      });

      const data = await res.json();
      if (!res.ok || data.success === false || data.success === "false") {
        throw new Error(data.message || "FormSubmit rejected the request");
      }
      // 2️⃣ Add to Mailchimp (your backend)
      await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setSubscribeState("success");
      setEmail("");
    } catch {
      setSubscribeState("error");
    }
  };

  return (
    <footer className="w-full border-t border-surface-border bg-surface-container-lowest">
      {/* ── Subscribe strip ── */}
      <div className="border-b border-surface-border py-12">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            {/* Copy */}
            <div className="max-w-sm">
              <p className="mb-1 font-headline-sm text-headline-sm font-semibold text-text-primary">
                Stay Ahead of the <span className="text-primary">Curve.</span>
              </p>
              <p className="font-body-sm text-body-sm text-text-secondary">
                New articles, no fluff. Unsubscribe anytime.
              </p>
            </div>

            {/* Form */}
            <div className="w-full md:max-w-md">
              {subscribeState === "success" ? (
                <div className="flex items-center gap-3 rounded-xl bg-primary/10 px-6 py-4 text-primary">
                  <span className="material-symbols-outlined text-[20px]">
                    check_circle
                  </span>
                  <span className="font-label-md text-sm">
                    You&apos;re in! We&apos;ll notify you when new articles
                    drop.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    className="flex-grow rounded-xl border border-surface-border bg-background px-5 py-3 text-sm text-text-primary outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Your business email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    disabled={subscribeState === "loading"}
                    className="whitespace-nowrap rounded-xl bg-primary-container px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
                  >
                    {subscribeState === "loading" ? "…" : "Subscribe"}
                  </button>
                </form>
              )}
              {subscribeState === "error" && (
                <p className="mt-2 text-xs text-error">
                  Something went wrong — please try again.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main links ── */}
      <div className="py-stack-lg">
        <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-4 md:px-margin-desktop">
          {/* Brand */}
          <div>
            <div className="mb-4 font-headline-sm text-headline-sm font-bold text-text-primary">
              OpenSite
            </div>
            <p className="mb-6 font-body-sm text-body-sm text-text-secondary">
              Building digital engines that drive real business growth across
              the globe.
            </p>
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
      </div>

      {/* ── Bottom bar ── */}
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-4 border-t border-surface-border px-margin-mobile py-8 md:flex-row md:px-margin-desktop">
        <p className="font-body-sm text-body-sm text-text-secondary">
          © {new Date().getFullYear()} OpenSite Digital Agency. All rights
          reserved.
        </p>
        <Link
          href="/book-a-call/"
          className="font-body-sm text-body-sm text-text-secondary transition-colors hover:text-primary"
        >
          Book a Free Call →
        </Link>
      </div>
    </footer>
  );
}
