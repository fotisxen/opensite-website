import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// TEMPORARY: same array as InsightsPage.tsx. Once you move to a CMS (see
// chat), this whole block gets replaced by a fetch() call instead.
const articles = [
  {
    slug: "architecture-for-the-modern-web",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmR57BhQ0rOgD1N957pF1uoYwwYKDv_lZd1j_n6fPvkpjfZU6YR15PeaRxEsbCbFQYO9N5jhxdX-deZNVKT5wNOKVHY5AtiEBj_2E4XjVsVD0YH1kXVoO8UX7z2VpKP95fh9uph-zwS9bcKHaZmwCFRhgNDpARGypC7NtTOfljAk8D627kSPz-SjDKUAd8BlCZ1SUwuVf77yQGaJtRG2_gYo0krOQkwFoYejQo9PNcK-ZTq-eT98uKKhJQwYYLAHT80nbMXEErPBk",
    category: "Web Development",
    readTime: "12 min read",
    date: "March 14, 2024",
    title: "Architecture for the Modern Web: Beyond the Monolith",
    excerpt: "Exploring how headless CMS and edge computing are redefining site performance and developer productivity in 2024.",
    body: `Full article content goes here. Once you're on a CMS, this comes from
    a rich text field instead of being hardcoded.`,
  },
  // ...add the rest of your articles here with the same shape
];

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-margin-mobile pb-20 pt-12 md:px-margin-desktop">
      <Link href="/insights" className="mb-8 inline-flex items-center gap-2 font-label-md text-primary">
        <span className="material-symbols-outlined">arrow_back</span>
        Back to Insights
      </Link>

      <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 font-label-sm text-label-sm text-primary">
        {article.category}
      </span>
      <h1 className="mb-stack-md font-display-lg-mobile text-display-lg-mobile leading-[1.1] md:text-headline-lg">
        {article.title}
      </h1>
      <div className="mb-8 flex items-center gap-2 font-label-sm text-label-sm text-text-secondary">
        <span className="material-symbols-outlined text-[16px]">schedule</span>
        <span>{article.readTime}</span>
        {article.date && (
          <>
            <span className="mx-2">•</span>
            <span>{article.date}</span>
          </>
        )}
      </div>

      <div className="relative mb-10 h-96 w-full overflow-hidden rounded-2xl">
        <Image src={article.image} alt={article.title} fill className="object-cover" />
      </div>

      <div className="font-body-lg text-body-lg text-text-secondary space-y-6">
        <p>{article.body}</p>
      </div>
    </article>
  );
}