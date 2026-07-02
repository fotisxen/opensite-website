import Link from "next/link";

const footerLinks = {
  Services: [
    { href: "/services/", label: "Web Development" },
    { href: "/services/", label: "UI/UX Design" },
    { href: "/services/", label: "SEO Strategy" },
  ],
  Company: [
    { href: "/about/", label: "About Us" },
    { href: "/case-studies/", label: "Case Studies" },
    { href: "/contact/", label: "Contact Us" },
  ],
  Legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="w-full border-t border-surface-border bg-surface-container-lowest py-stack-lg">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-margin-mobile md:grid-cols-4 md:px-margin-desktop">
        <div>
          <div className="mb-4 font-headline-sm text-headline-sm font-bold text-text-primary">
            OpenSite
          </div>
          <p className="font-body-sm text-body-sm text-text-secondary">
            Building digital engines that drive real business growth across the
            globe.
          </p>
        </div>

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

      <div className="mx-auto mt-12 flex max-w-container-max flex-col items-center justify-between gap-4 border-t border-surface-border px-margin-mobile pt-8 md:flex-row md:px-margin-desktop">
        <p className="font-body-sm text-body-sm text-text-secondary">
          © {new Date().getFullYear()} OpenSite Digital Agency. All rights
          reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-text-secondary transition-colors hover:text-primary"
            aria-label="Website"
          >
            <span className="material-symbols-outlined">public</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
