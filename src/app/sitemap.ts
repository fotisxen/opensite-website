// app/sitemap.ts

import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { getAllArticles } from "@/lib/contentful";

const BASE_URL = "https://opensite.gr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "case-studies", "insights", "book-a-call","contact", "about"].map(
    (route) => ({
      url: `${BASE_URL}/${route ? route + "/" : ""}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  );

  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${BASE_URL}/case-studies/${cs.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articles = await getAllArticles();
  const articleRoutes = articles.map((article) => ({
    url: `${BASE_URL}/insights/${article.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...articleRoutes];
}
