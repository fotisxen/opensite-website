import Image from "next/image";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

const categories = [
  "All Articles",
  "Web Development",
  "E-commerce",
  "SEO",
  "Business Growth",
];

const articles = [
  {
    slug: "architecture-for-the-modern-web",
    featured: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmR57BhQ0rOgD1N957pF1uoYwwYKDv_lZd1j_n6fPvkpjfZU6YR15PeaRxEsbCbFQYO9N5jhxdX-deZNVKT5wNOKVHY5AtiEBj_2E4XjVsVD0YH1kXVoO8UX7z2VpKP95fh9uph-zwS9bcKHaZmwCFRhgNDpARGypC7NtTOfljAk8D627kSPz-SjDKUAd8BlCZ1SUwuVf77yQGaJtRG2_gYo0krOQkwFoYejQo9PNcK-ZTq-eT98uKKhJQwYYLAHT80nbMXEErPBk",
    category: "Web Development",
    categoryClass: "bg-primary text-on-primary",
    readTime: "12 min read",
    date: "March 14, 2024",
    title: "Architecture for the Modern Web: Beyond the Monolith",
    excerpt:
      "Exploring how headless CMS and edge computing are redefining site performance and developer productivity in 2024.",
  },
  {
    slug: "maximizing-ltv-in-competitive-markets",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAK9xLa95HvuJlujTBrfHxAeSyZauxXKqvPv5tJsQi8WNveRxslIvgUbyjfkJBC-ZocCJP2g6GL6k8GTbML796ZTImHV259HLHV-IdgSw4bAiZ3B1zj2uDuwsPHInT3oK-C7dVCA6G8HmvcuW5xA_6PmUumEsRF84ExlX_HM4Z9NJ7kAjxG38IY9ZT2QYDmiYWEzmyGmRIsmnBujN88ZenGyXh1a784Z6FXEGAf3XVNg6KR1LuAJKSklolPQGenTKzhK_A0-cc0p4",
    category: "E-commerce",
    categoryClass: "text-secondary",
    readTime: "8 min read",
    title: "Maximizing LTV in Competitive Markets",
    excerpt:
      "Strategic retention tactics that high-growth e-commerce brands use to reduce CAC and build sustainable revenue streams.",
  },
  {
    slug: "future-of-ai-first-search-engines",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJq_LUc8a5Y8FmU-TdkgCjOOT6NVo3Hl-3ZXnBj_cOF3fZ-MI5fWr6b4f5IPSJHOOX33ku_BmQUJcMb52aUFZk--3t1eigSrO5mX6_gy66U1Gto4GPENyj-LppMRRt4RuZ6aM3TQvZfQol-fo4g2xYzpTs9ZENRr00HpC3hQZudhCpJoOKRzT6WROMIkRlyU2AmDNHXMXtpFI2Zlhp5Fd3sQPlcr434sVH3XdWeRyrBJoGXZYP9icN1RYJkQ6Kn0S2dmULtGZHsMY",
    category: "SEO",
    categoryClass: "text-tertiary",
    readTime: "15 min read",
    title: "The Future of AI-First Search Engines",
    excerpt:
      "How generative search is changing the SEO landscape and what you need to do to maintain organic visibility.",
  },
  {
    slug: "typescript-the-enterprise-standard",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6v00IR7T1KrM33rZMfx-Ul1EH6T7J4phtMnAsuWy7OtHWsh5Yzsuq_hHQQPU4vH_k8zbWquy0g3yfLGRkKHoIeT6H_V_PVHvCth9LPc_GJvhfaGFPGMhJrjv5GE0kiajXCHP_bTk_D8CXC2ps1w63-xFjrI9OJFAjNJRofbnS9oDl0VGJV7PawcpdlKjwtRi51cWnCkQSgttBaI-FXXsy0-PTHE5NmJwa2znwP2VicFSIxDTHn1lnas5VckqXrtUmgh74kUFjIJ8",
    category: "Web Development",
    categoryClass: "text-primary",
    readTime: "10 min read",
    title: "TypeScript: The Enterprise Standard",
    excerpt:
      "Why type safety isn't optional anymore for scaling digital products and how to migrate large legacy codebases.",
  },
  {
    slug: "navigating-series-b-technology-scale",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBj9WzJw6HzRA5CXf_fI0hBQbp_6p-x79Hsc--NUDHQB6AZyNKUwOTgwI7xUcqY3-JVgdfCPeUYgvSRUIyioETK535qVikQXgfbZLhO-mtRxlzzBjJJQYWV5SYL2HhO4QuZlTPEuAuXEilkdYgLEMDR2CzECZsp2GoZ4EIaIZMzAVMabGFzsKQZ4JlcVCPWvXxY99657p7kB-btCIqfl12s-0nvFLuFve-dFb-63YqPHB-Wb-SFWvZfGtfmcADLoAGCO2a-JlyOKBA",
    category: "Business Growth",
    categoryClass: "text-secondary",
    readTime: "6 min read",
    title: "Navigating Series B Technology Scale",
    excerpt:
      "A guide for CTOs on managing technical debt while meeting aggressive growth targets of venture-backed expansion.",
  },
];

export function InsightsPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <section className="relative mx-auto mb-20 max-w-container-max px-margin-mobile md:px-margin-desktop">
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
            scaling strategies. Curated by our team of developers, designers, and
            growth experts.
          </p>
        </FadeIn>
      </section>

      <section className="mx-auto mb-12 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn className="flex flex-wrap items-center gap-4 border-b border-surface-border pb-8">
          {categories.map((cat, i) => (
            <button
              key={cat}
              type="button"
              className={`rounded-full px-6 py-2 font-label-md text-label-md transition-all ${
                i === 0
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-surface-container text-text-secondary hover:bg-surface-container-high hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeIn>
      </section>

      <section className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
          <StaggerItem className="group overflow-hidden rounded-xl border border-surface-border bg-surface-card transition-all duration-300 hover:border-primary lg:col-span-2">
            <Link href={`/insights/${featured.slug}`} className="flex h-full flex-col md:flex-row">
              <div className="relative overflow-hidden md:w-1/2">
                <Image
                  src={featured.image}
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
                    <span className="material-symbols-outlined text-[16px]">
                      schedule
                    </span>
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
                  <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>
          </StaggerItem>

          {rest.map((article) => (
            <StaggerItem
              key={article.slug}
              className="group overflow-hidden rounded-xl border border-surface-border bg-surface-card transition-all duration-300 hover:border-primary"
            >
              <Link href={`/insights/${article.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-stack-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <span className={`font-label-sm text-label-sm ${article.categoryClass}`}>
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
                    <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn className="mt-20 flex justify-center">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-surface-border px-8 py-4 font-label-md text-text-primary transition-all hover:bg-surface-container"
          >
            Load More Articles
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </FadeIn>
      </section>

      <section className="mx-auto mt-32 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-surface-border/50 bg-surface-container p-stack-lg text-center md:p-20">
            <div className="pointer-events-none absolute inset-0 bg-primary/5" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-stack-md font-headline-lg text-headline-lg">
                Stay Ahead of the <span className="text-primary">Curve.</span>
              </h2>
              <p className="mb-stack-lg font-body-lg text-body-lg text-text-secondary">
                Join 5,000+ industry leaders receiving our monthly digest of
                technology trends and growth strategies.
              </p>
              <form className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row">
                <input
                  className="flex-grow rounded-xl border border-surface-border bg-background px-6 py-4 text-text-primary outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Enter your business email"
                  type="email"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-xl bg-primary-container px-8 py-4 font-label-md text-on-primary-container transition-all hover:opacity-90"
                >
                  Subscribe Now
                </button>
              </form>
              <p className="mt-4 font-body-sm text-body-sm text-text-secondary">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}