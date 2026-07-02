import type { Metadata } from "next";
import { CaseStudiesPage } from "@/components/pages/CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies",
};

export default function Page() {
  return <CaseStudiesPage />;
}
