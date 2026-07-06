import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How OpenSite collects, uses, and protects your personal data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `When you use our website or contact us, we may collect the following information:
    
• Name and email address (when you fill out a contact or booking form)
• Phone number (if provided)
• Business name and project details (shared voluntarily)
• Usage data such as pages visited, time on site, and browser type (via analytics tools)
• IP address and device information`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Respond to your inquiries and project requests
• Schedule and confirm calls or meetings
• Send you relevant updates about your project
• Improve our website and services
• Comply with legal obligations

We do not sell, rent, or share your personal data with third parties for marketing purposes.`,
  },
  {
    title: "3. Legal Basis for Processing (GDPR)",
    content: `If you are located in the European Economic Area (EEA), our legal basis for collecting and using your personal information is:

• Contractual necessity — to fulfil a service you have requested
• Legitimate interests — to improve our services and communicate with you
• Consent — where you have explicitly agreed to receive communications`,
  },
  {
    title: "4. Data Retention",
    content: `We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Contact form submissions are retained for up to 2 years. You may request deletion of your data at any time.`,
  },
  {
    title: "5. Cookies",
    content: `Our website may use cookies to improve your browsing experience. These include:

• Essential cookies — required for the site to function
• Analytics cookies — to understand how visitors use the site (e.g. Google Analytics)

You can disable cookies at any time through your browser settings.`,
  },
  {
    title: "6. Third-Party Services",
    content: `We use trusted third-party tools to operate our website and deliver services, including:

• Google Analytics (website analytics)
• EmailJS / Formsubmit (form submissions)
• Hostinger (website hosting)

These services have their own privacy policies and we encourage you to review them.`,
  },
  {
    title: "7. Your Rights",
    content: `Under GDPR and applicable Greek/EU law, you have the right to:

• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your data ("right to be forgotten")
• Object to or restrict processing of your data
• Request a copy of your data in a portable format

To exercise any of these rights, contact us at info@opensite.gr.`,
  },
  {
    title: "8. Data Security",
    content: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure. However, no method of transmission over the internet is 100% secure.`,
  },
  {
    title: "9. Contact Us",
    content: `If you have any questions about this Privacy Policy or how we handle your data, please contact us:

OpenSite Digital Agency
Email: info@opensite.gr
Website: opensite.gr
Location: Athens, Greece`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-secondary">
            Legal
          </p>
          <h1 className="mb-4 text-4xl font-bold text-text-primary">
            Privacy Policy
          </h1>
          <p className="text-text-secondary">Last updated: July 2025</p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            At OpenSite, we are committed to protecting your privacy. This
            policy explains what data we collect, how we use it, and your rights
            regarding your personal information.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-[16px] border border-surface-border bg-surface-card p-8"
            >
              <h2 className="mb-4 text-lg font-semibold text-text-primary">
                {section.title}
              </h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-text-secondary">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 rounded-[16px] border border-primary-container/20 bg-primary-container/5 p-6 text-center">
          <p className="text-sm text-text-secondary">
            Questions about your data?{" "}
            <Link
              href="/contact/"
              className="font-medium text-text-primary underline underline-offset-2 hover:text-primary-container transition-colors"
            >
              Contact us
            </Link>{" "}
            and we&apos;ll respond within 2 business days.
          </p>
        </div>
      </div>
    </main>
  );
}
