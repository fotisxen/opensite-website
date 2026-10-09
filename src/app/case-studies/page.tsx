// app/case-studies/page.tsx

import { CaseStudiesPage } from "@/components/pages/CaseStudiesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | OpenSite",
  alternates: { canonical: "https://opensite.gr/case-studies/", languages: { en: "https://opensite.gr/case-studies/", el: "https://opensite.gr/el/ergasies/" } },
  description:
    "See how OpenSite rebuilt slow, outdated sites into fast, conversion-focused platforms for hospitality, real estate, and marine tourism clients.",
};

export default function Page() {
  return <CaseStudiesPage />;
}
