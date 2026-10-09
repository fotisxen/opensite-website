import type { Metadata } from "next";
import LegalContent from "@/components/legal/LegalContent";
import { privacyDoc } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What personal data opensite.gr collects, why, where it goes and what rights you have.",
  alternates: {
    canonical: "https://opensite.gr/privacy-policy/",
    languages: {
      en: "https://opensite.gr/privacy-policy/",
      el: "https://opensite.gr/el/politiki-aporritou/",
    },
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background pb-24 pt-28">
      <div className="mx-auto max-w-4xl px-6">
        <LegalContent doc={privacyDoc("en")} />
      </div>
    </main>
  );
}
