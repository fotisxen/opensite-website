// app/insights/page.tsx
// Drop this file at: app/insights/page.tsx
// It replaces your existing InsightsPage component entirely.
// The hardcoded articles array is gone — data now comes from Contentful.

import { InsightsClient } from "@/components/InsightsClient";
import { getAllArticles } from "@/lib/contentful";

export const metadata = {
  title: "Insights",
  description:
    "Strategic insights on web development, SEO, e-commerce, and business growth.",
};

export default async function InsightsPage() {
  const articles = await getAllArticles();
  return <InsightsClient articles={articles} />;
}
