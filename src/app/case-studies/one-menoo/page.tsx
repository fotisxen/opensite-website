import type { Metadata } from "next";
import { CaseStudyDetailPage } from "@/components/pages/CaseStudyDetailPage";

export const metadata: Metadata = {
  title: "One Menoo Case Study",
};

export default function Page() {
  return <CaseStudyDetailPage />;
}
