"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import type { Article } from "@/lib/contentful";

const categories = [
  "All Articles",
  "Web Development",
  "E-commerce",
  "SEO",
  "Business Growth",
];

const PAGE_SIZE = 3;

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80";

interface Props {
  articles: Article[];
}

export function InsightsClient({ articles }: Props) {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [email, setEmail] = useState("");
  const [subscribeState, setSubscribeState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribeState("loading");

    try {
      // JSONP trick — Mailchimp supports this for static sites
      const url = `https://us10.list-manage.com/subscribe/post-json?u=44b95df314a42f2b9756e01e5&id=97742a274e&EMAIL=${encodeURIComponent(email)}&c=mailchimpCallback`;
      await new Promise<void>((resolve, reject) => {
        // Create callback
        (window as any).mailchimpCallback = (data: any) => {
          document.body.removeChild(script);
          delete (window as any).mailchimpCallback;
          if (data.result === "success") resolve();
          else reject(new Error(data.msg));
        };

        // Inject script tag
        const script = document.createElement("script");
        script.src = url;
        script.onerror = () => reject(new Error("Network error"));
        document.body.appendChild(script);

        // Timeout after 8 seconds
        setTimeout(() => reject(new Error("Timeout")), 8000);
      });

      // Notify you via FormSubmit (fire and forget)
      fetch("https://formsubmit.co/ajax/info@opensite.gr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: `New subscriber: ${email}`,
          message: `New subscriber: ${email}`,
        }),
      }).catch(() => {});

      setSubscribeState("success");
      setEmail("");
    } catch (err: any) {
      // Mailchimp error messages are HTML — strip tags for display
      const msg = err?.message?.replace(/<[^>]*>/g, "") ?? "";
      if (msg.toLowerCase().includes("already subscribed")) {
        setSubscribeState("success"); // treat as success
      } else {
        setSubscribeState("error");
      }
    }
  };

  const [featured, ...rest] = visible;

  return (
    <>
      <section className="relative mx-auto mt-12 mb-20 max-w-container-max px-margin-mobile md:px-margin-desktop">
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
              No articles published yet — check back soon.
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
                      <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1">
                        arrow_forward
                      </span>
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
              <span className="material-symbols-outlined">expand_more</span>
            </button>
          </FadeIn>
        )}
      </section>

      {/* Subscribe */}
      <section
        id="subscribe"
        className="mx-auto mt-32 mb-24 max-w-container-max px-margin-mobile md:px-margin-desktop"
      >
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-surface-border/50 bg-surface-container p-stack-lg text-center md:p-20">
            <div className="pointer-events-none absolute inset-0 bg-primary/5" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-stack-md font-headline-lg text-headline-lg">
                Stay Ahead of the <span className="text-primary">Curve.</span>
              </h2>
              <p className="mb-stack-lg font-body-lg text-body-lg text-text-secondary">
                Get notified when we publish new articles — no fluff, just
                useful.
              </p>

              {subscribeState === "success" ? (
                <div className="flex items-center justify-center gap-3 rounded-xl bg-primary/10 px-8 py-5 text-primary">
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                  <span className="font-label-md">
                    You&apos;re in! We&apos;ll let you know when new articles
                    drop.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row"
                >
                  <input
                    className="flex-grow rounded-xl border border-surface-border bg-background px-6 py-4 text-text-primary outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Enter your business email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    disabled={subscribeState === "loading"}
                    className="whitespace-nowrap rounded-xl bg-primary-container px-8 py-4 font-label-md text-white transition-all hover:opacity-90 disabled:opacity-60"
                  >
                    {subscribeState === "loading"
                      ? "Subscribing…"
                      : "Subscribe Now"}
                  </button>
                </form>
              )}

              {subscribeState === "error" && (
                <p className="mt-3 text-sm text-error">
                  Something went wrong — please try again.
                </p>
              )}

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
