// app/case-studies/[slug]/page.tsx

import { CaseStudyDetailPage } from "@/components/pages/CaseStudyDetailPage";
import { caseStudies } from "@/lib/case-studies";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CaseStudyDetailPage slug={slug} />;
}
