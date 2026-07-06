// app/insights/[slug]/page.tsx

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { getAllArticles } from "@/lib/contentful";

async function getArticleBySlug(slug: string) {
  const spaceId = process.env.CONTENTFUL_SPACE_ID!;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;

  const url =
    `https://cdn.contentful.com/spaces/${spaceId}/entries` +
    `?content_type=blogPost&fields.slug=${slug}&include=1&access_token=${accessToken}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) return null;

  const data = await res.json();

  if (!data.items?.length) return null;

  const item = data.items[0];
  const fields = item.fields;

  const imageAsset = data.includes?.Asset?.find(
    (a: any) => a.sys.id === fields.coverImage?.sys?.id,
  );

  return {
    title: fields.title as string,
    slug: fields.slug as string,
    category: fields.category as string,
    readTime: fields.readTime as string,
    date: fields.date as string,
    excerpt: fields.excerpt as string,
    coverImage: imageAsset ? `https:${imageAsset.fields.file.url}` : null,
    bodyHtml: fields.body ? documentToHtmlString(fields.body) : "",
  };
}

export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-background pt-2">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link
          href="/insights"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <span className="material-symbols-outlined text-base">
            arrow_back
          </span>
          Back to Insights
        </Link>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {article.category}
          </span>
          <span className="text-xs text-text-secondary">
            {article.readTime}
          </span>
          <span className="text-xs text-text-secondary">•</span>
          <span className="text-xs text-text-secondary">{article.date}</span>
        </div>

        <h1 className="mb-6 font-display-lg text-4xl font-bold leading-tight text-text-primary md:text-5xl">
          {article.title}
        </h1>

        <p className="text-lg text-text-secondary">{article.excerpt}</p>
      </section>

      {/* Cover image */}
      {article.coverImage && (
        <section className="mx-auto mb-16 max-w-4xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-surface-border">
            <Image
              src={article.coverImage}
              alt={article.title}
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Body */}
      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-text-primary
            prose-p:text-text-secondary prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-text-primary
            prose-code:rounded prose-code:bg-surface-container-low prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
            prose-blockquote:border-primary prose-blockquote:text-text-secondary
            prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />

        {/* CTA */}
        <div className="mt-20 rounded-2xl bg-primary-container p-10 text-white">
          <h3 className="mb-3 text-2xl font-bold">
            Want results like this for your business?
          </h3>
          <p className="mb-6 opacity-80">
            Book a free 15-minute call and we&apos;ll show you exactly where
            you&apos;re leaving growth on the table.
          </p>
          <Link
            href="/book-a-call/"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-primary-container transition-all hover:scale-105"
          >
            Book a Free Call
            <span className="material-symbols-outlined text-[18px]">
              phone_in_talk
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
