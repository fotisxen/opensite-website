"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import type { Article } from "@/lib/contentful";
import Icon from "@/components/Icon";

const categories = [
  "All Articles",
  "Web Development",
  "E-commerce",
  "SEO",
  "Business Growth",
];

const PAGE_SIZE = 3;

const PLACEHOLDER =
  "/insights-placeholder.svg";

interface Props {
  articles: Article[];
}

export function InsightsClient({ articles }: Props) {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered =
    activeCategory === "All Articles"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilter = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const [featured, ...rest] = visible;

  return (
    <>
      <section className="relative mx-auto mt-12 mb-20 max-w-container-max px-margin-mobile max-md:overflow-x-clip md:px-margin-desktop">
        <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <FadeIn className="max-w-3xl">
          <span className="mb-stack-md inline-block rounded-full bg-primary/10 px-3 py-1 font-label-sm text-label-sm text-primary">
            The Knowledge Hub
          </span>
          <h1 className="mb-stack-lg font-display-lg text-display-lg leading-[1.1]">
            Strategic Insights for Modern{" "}
            <span className="text-primary">Growth.</span>
          </h1>
          <p className="max-w-2xl font-body-lg text-body-lg text-text-secondary">
            Deep dives into technology, conversion optimization, and brand
            scaling strategies. Curated by our team of developers, designers,
            and growth experts.
          </p>
        </FadeIn>
      </section>

      {/* Filter bar */}
      <section className="mx-auto mb-12 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn className="flex flex-wrap items-center gap-4 border-b border-surface-border pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleFilter(cat)}
              className={`rounded-full px-6 py-2 font-label-md text-label-md transition-all ${
                activeCategory === cat
                  ? "bg-primary-container text-white"
                  : "bg-surface-container text-text-secondary hover:bg-surface-container-high hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeIn>
      </section>

      {/* Articles grid */}
      <section className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        {articles.length === 0 ? (
          <FadeIn>
            <div className="py-24 text-center text-text-secondary">
              No articles published yet, check back soon.
            </div>
          </FadeIn>
        ) : visible.length === 0 ? (
          <FadeIn>
            <div className="py-24 text-center text-text-secondary">
              No articles in this category yet.
            </div>
          </FadeIn>
        ) : (
          <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
            {featured && (
              <StaggerItem className="group overflow-hidden rounded-xl border border-surface-border bg-surface-card transition-all duration-300 hover:border-primary lg:col-span-2">
                <Link
                  href={`/insights/${featured.slug}/`}
                  className="flex h-full flex-col md:flex-row"
                >
                  <div className="relative overflow-hidden md:w-1/2">
                    <Image
                      src={featured.coverImage ?? PLACEHOLDER}
                      alt={featured.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`rounded px-3 py-1 font-label-sm text-label-sm shadow-lg ${featured.categoryClass}`}
                      >
                        {featured.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-stack-lg md:w-1/2">
                    <div>
                      <div className="mb-4 flex items-center gap-2 font-label-sm text-label-sm text-text-secondary">
                        <Icon name="schedule" className="text-[16px]" />
                        <span>{featured.readTime}</span>
                        <span className="mx-2">•</span>
                        <span>{featured.date}</span>
                      </div>
                      <h3 className="mb-stack-md font-headline-md text-headline-md text-text-primary transition-colors group-hover:text-primary">
                        {featured.title}
                      </h3>
                      <p className="line-clamp-3 font-body-md text-text-secondary">
                        {featured.excerpt}
                      </p>
                    </div>
                    <span className="group/btn mt-8 flex items-center gap-2 font-label-md text-primary">
                      Read Article
                      <Icon name="arrow_forward" className="transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            )}

            {rest.map((article) => (
              <StaggerItem
                key={article.slug}
                className="group overflow-hidden rounded-xl border border-surface-border bg-surface-card transition-all duration-300 hover:border-primary"
              >
                <Link href={`/insights/${article.slug}/`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.coverImage ?? PLACEHOLDER}
                      alt={article.title}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-stack-lg">
                    <div className="mb-4 flex items-center justify-between">
                      <span
                        className={`font-label-sm text-label-sm ${article.categoryTextClass}`}
                      >
                        {article.category}
                      </span>
                      <span className="font-label-sm text-label-sm text-text-secondary">
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="mb-stack-md font-headline-sm text-headline-sm text-text-primary transition-colors group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mb-stack-lg font-body-sm text-body-sm text-text-secondary">
                      {article.excerpt}
                    </p>
                    <span className="group/btn flex items-center gap-2 font-label-md text-primary">
                      Read Full Story
                      <Icon name="arrow_forward" className="transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {hasMore && (
          <FadeIn className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
              className="flex items-center gap-2 rounded-xl border border-surface-border px-8 py-4 font-label-md text-text-primary transition-all hover:bg-surface-container"
            >
              Load More Articles
              <Icon name="expand_more" />
            </button>
          </FadeIn>
        )}
      </section>

    </>
  );
}
