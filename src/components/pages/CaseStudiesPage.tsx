"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { fbq } from "@/lib/pixel";
import { useEffect } from "react";

const filters = [
  "All Industries",
  "Real Estate",
  "Hospitality Tech",
  "Yacht & Marine Tourism",
];

const cases = [
  {
    slug: "one-menoo",
    image: "https://onemenoo.com/images/onemenoo-social.jpg",
    industry: "Hospitality Tech",
    tag: "Hospitality Tech",
    tagClass: "bg-primary-container text-white",
    title: "OneMenoo — AI QR Menu Platform",
    problem:
      "Slow WordPress site with poor mobile performance couldn't support a modern AI-powered product or rank on Google.",
    solution:
      "Full rebuild in Next.js with custom architecture, optimised for Core Web Vitals and built to scale with the product.",
    result: "45,000+ QR scans",
    stat1: { value: "45k+", label: "QR Scans" },
    stat2: { value: "1,500+", label: "AI Messages" },
    statColor: "text-primary",
  },
  {
    slug: "akinita-fotiadis",
    image:
      "https://cdn.prod.website-files.com/66d58e4d00041d88f5505eaf/66e71eb023b4a639865ea9cb_graph-image-1.avif",
    industry: "Real Estate",
    tag: "Real Estate",
    tagClass: "bg-secondary-container text-on-secondary-container",
    title: "Akinita Fotiadis — Real Estate Agency",
    problem:
      "WordPress site was lagging, poorly designed, and didn't reflect the brand identity — losing potential clients before they made contact.",
    solution:
      "Complete redesign in Webflow with a property listing system, responsive layout, and clear user-to-client conversion flow.",
    result: "Fully responsive",
    stat1: { value: "100%", label: "Mobile Ready" },
    stat2: { value: "Webflow", label: "Platform" },
    statColor: "text-secondary",
  },
  {
    slug: "adonis-sail-yachts",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    industry: "Yacht & Marine Tourism",
    tag: "Yacht & Marine Tourism",
    tagClass: "bg-tertiary-container text-on-tertiary-container",
    title: "Adonis Sail Yachts — Charter Company",
    problem:
      "Old WordPress site had poor UX, no clear booking flow, and failed to communicate the quality of the sailing experience.",
    solution:
      "Rebuilt in Webflow with immersive design, streamlined enquiry flow, and mobile-first layout that matches the premium brand.",
    result: "Redesigned UX",
    stat1: { value: "2000+", label: "Est. Founded" },
    stat2: { value: "Webflow", label: "Platform" },
    statColor: "text-tertiary",
  },
];

export function CaseStudiesPage() {
  useEffect(() => {
    fbq("ViewContent", { content_name: "Case Studies Page" });
  }, []);
  const [activeFilter, setActiveFilter] = useState("All Industries");

  const filtered =
    activeFilter === "All Industries"
      ? cases
      : cases.filter((c) => c.industry === activeFilter);

  return (
    <>
      <section className="mx-auto mb-24 mt-12 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-surface-border bg-surface-container p-stack-lg md:p-20">
            <div className="relative z-10 max-w-3xl">
              <span className="mb-stack-md inline-block rounded-full border border-primary/20 bg-primary-container/10 px-3 py-1 font-label-sm text-label-sm uppercase tracking-wider text-primary">
                Our Portfolio
              </span>
              <h1 className="mb-stack-md font-display-lg text-display-lg leading-tight">
                Proving Value Through{" "}
                <span className="text-primary">Measurable Impact</span>
              </h1>
              <p className="font-body-lg text-body-lg text-text-secondary">
                We don&apos;t just build websites; we engineer growth engines.
                Explore how we&apos;ve helped global leaders scale their digital
                presence.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto mb-12 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn className="flex flex-wrap items-center gap-stack-sm border-b border-surface-border pb-stack-md">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-6 py-2 font-label-md text-label-md transition-all ${
                activeFilter === filter
                  ? "bg-primary-container text-white"
                  : "border border-surface-border bg-surface-container text-text-secondary hover:text-text-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </FadeIn>
      </section>

      <section className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        {filtered.length === 0 ? (
          <FadeIn>
            <div className="py-24 text-center text-text-secondary">
              No case studies found for this industry yet.
            </div>
          </FadeIn>
        ) : (
          <Stagger className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
            {filtered.map((c) => (
              <StaggerItem
                key={c.slug}
                className="case-study-card group relative flex flex-col overflow-hidden rounded-[16px] border border-surface-border bg-surface-card"
              >
                <div className="relative h-64 overflow-hidden md:h-80">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface-card to-transparent" />
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={700}
                    height={450}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <span
                      className={`rounded-md px-3 py-1 font-label-sm text-label-sm uppercase ${c.tagClass}`}
                    >
                      {c.tag}
                    </span>
                  </div>
                </div>
                <div className="flex flex-grow flex-col p-stack-lg">
                  <h2 className="mb-stack-md font-headline-sm text-headline-sm text-text-primary">
                    {c.title}
                  </h2>
                  <div className="mb-stack-lg grid grid-cols-1 gap-stack-md border-y border-surface-border py-stack-md md:grid-cols-3">
                    <div>
                      <h4 className="mb-1 font-label-sm text-label-sm uppercase text-text-secondary">
                        Problem
                      </h4>
                      <p className="font-body-sm text-body-sm">{c.problem}</p>
                    </div>
                    <div>
                      <h4 className="mb-1 font-label-sm text-label-sm uppercase text-text-secondary">
                        Solution
                      </h4>
                      <p className="font-body-sm text-body-sm">{c.solution}</p>
                    </div>
                    <div>
                      <h4 className="mb-1 font-label-sm text-label-sm uppercase text-text-secondary">
                        Result
                      </h4>
                      <p className="font-body-sm text-lg font-bold text-secondary">
                        {c.result}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div
                          className={`font-headline-sm text-headline-sm font-bold ${c.statColor}`}
                        >
                          {c.stat1.value}
                        </div>
                        <div className="font-label-sm text-label-sm text-text-secondary">
                          {c.stat1.label}
                        </div>
                      </div>
                      <div className="w-px bg-surface-border" />
                      <div className="text-center">
                        <div
                          className={`font-headline-sm text-headline-sm font-bold ${c.statColor}`}
                        >
                          {c.stat2.value}
                        </div>
                        <div className="font-label-sm text-label-sm text-text-secondary">
                          {c.stat2.label}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/case-studies/${c.slug}/`}
                      className="flex items-center gap-2 font-label-md text-primary transition-transform hover:translate-x-2"
                    >
                      View Full Case
                      <span className="material-symbols-outlined text-[18px]">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>

      <section className="mx-auto mt-24 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-primary-container p-stack-lg text-center md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-stack-md font-headline-lg text-headline-lg text-white">
                Ready to write your own success story?
              </h2>
              <p className="mb-stack-lg font-body-lg text-body-lg text-white/80">
                Let&apos;s discuss how our data-driven approach can solve your
                unique business challenges.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact/"
                  className="rounded-xl bg-white px-8 py-4 font-label-md text-primary-container transition-all hover:shadow-xl"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/book-a-call/"
                  className="rounded-xl border border-white/20 bg-primary-container px-8 py-4 font-label-md text-white transition-all hover:bg-white/10"
                >
                  Speak to a Strategist
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
