import type { Metadata } from "next";
import LegalContent from "@/components/legal/LegalContent";
import { termsDoc } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using opensite.gr and the company details of OpenSite.",
  alternates: {
    canonical: "https://opensite.gr/terms-of-service/",
    languages: {
      en: "https://opensite.gr/terms-of-service/",
      el: "https://opensite.gr/el/oroi-chrisis/",
    },
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pb-24 pt-28">
      <div className="mx-auto max-w-3xl px-6">
        <LegalContent doc={termsDoc("en")} />
      </div>
    </main>
  );
}
