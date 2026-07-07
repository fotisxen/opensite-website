// app/case-studies/[slug]/page.tsx

import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { CaseStudyDetailPage } from "@/components/pages/CaseStudyDetailPage";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);

  if (!cs) return {};

  return {
    title: `${cs.title} Case Study | OpenSite`,
    description: cs.subtitle,
    openGraph: {
      title: `${cs.title} Case Study | OpenSite`,
      description: cs.subtitle,
      images: [cs.image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CaseStudyDetailPage slug={slug} />;
}
