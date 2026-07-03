import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of OpenSite's services and website.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the OpenSite website (opensite.gr) or engaging our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.

These terms apply to all visitors, clients, and anyone who accesses or uses our services.`,
  },
  {
    title: "2. Services",
    content: `OpenSite provides digital services including but not limited to:

• Website design and development
• E-commerce solutions
• Mobile application development
• SEO strategy and optimisation
• UI/UX design

The scope, timeline, and cost of each project are agreed upon individually through a formal proposal and contract prior to commencing work.`,
  },
  {
    title: "3. Client Responsibilities",
    content: `As a client, you agree to:

• Provide accurate and complete information required for the project
• Respond to requests for feedback or approvals in a timely manner
• Supply all necessary assets, content, and access credentials when requested
• Make payments according to the agreed schedule
• Not use our deliverables for any unlawful or unethical purpose`,
  },
  {
    title: "4. Payment Terms",
    content: `Payment terms are outlined in the individual project proposal. Generally:

• A deposit is required before work begins (typically 30–50% of project value)
• Remaining payments are milestone-based or due upon project completion
• Late payments may result in work being paused until outstanding amounts are settled
• All prices are in EUR unless otherwise stated

Invoices are issued electronically and are due within 14 days of issue.`,
  },
  {
    title: "5. Intellectual Property",
    content: `Upon receipt of full payment, the client owns all custom deliverables created specifically for their project (designs, code, content).

OpenSite retains the right to:
• Display the work in our portfolio and case studies
• Use general methodologies, frameworks, and know-how developed during the project

Third-party assets (fonts, stock photos, plugins) remain subject to their respective licences.`,
  },
  {
    title: "6. Confidentiality",
    content: `Both parties agree to keep confidential any sensitive business information shared during the project. OpenSite will not disclose your proprietary information to third parties without your written consent, except where required by law.`,
  },
  {
    title: "7. Revisions and Changes",
    content: `Each project includes a defined number of revision rounds as stated in the proposal. Additional revisions or changes to the agreed scope may incur extra charges, which will be communicated and agreed upon before proceeding.

Significant scope changes may require a revised proposal and timeline.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `OpenSite is not liable for:

• Any indirect, incidental, or consequential damages arising from use of our services
• Loss of revenue, data, or business opportunities
• Issues caused by third-party services, plugins, or platforms
• Delays caused by the client's failure to provide required materials or approvals

Our total liability shall not exceed the amount paid for the specific service in question.`,
  },
  {
    title: "9. Warranties and Disclaimers",
    content: `We strive to deliver high-quality work and warrant that our services will be performed with reasonable skill and care. However, we do not guarantee specific business outcomes such as search ranking positions, conversion rates, or revenue growth, as these depend on many external factors.

The website is provided "as is" without warranties of any kind.`,
  },
  {
    title: "10. Termination",
    content: `Either party may terminate a project engagement with written notice. In the event of termination:

• Work completed to date will be invoiced and must be paid
• Any deposit paid is non-refundable unless OpenSite is unable to commence the agreed work
• Deliverables will only be transferred upon receipt of all outstanding payments`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms of Service are governed by the laws of Greece and the European Union. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Athens, Greece.`,
  },
  {
    title: "12. Changes to These Terms",
    content: `We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated date. Continued use of our website or services after changes are posted constitutes acceptance of the revised terms.`,
  },
  {
    title: "13. Contact",
    content: `For questions about these Terms of Service, please contact us:

OpenSite Digital Agency
Email: info@opensite.gr
Website: opensite.gr
Location: Athens, Greece`,
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-secondary">
            Legal
          </p>
          <h1 className="mb-4 text-4xl font-bold text-text-primary">
            Terms of Service
          </h1>
          <p className="text-text-secondary">
            Last updated: July 2025
          </p>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Please read these terms carefully before using our services. By
            engaging OpenSite, you agree to the following terms and conditions.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
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
            Have questions about our terms?{" "}
            <Link
              href="/contact/"
              className="font-medium text-text-primary underline underline-offset-2 hover:text-primary-container transition-colors"
            >
              Get in touch
            </Link>{" "}
            and we'll be happy to clarify.
          </p>
        </div>
      </div>
    </main>
  );
}