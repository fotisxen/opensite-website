"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

const filters = [
  "All Industries",
  "Real Estate",
  "Hospitality Tech",
  "Yacht & Marine Tourism",
];

const cases = [
  {
    slug: "akinita-fotiadis",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHijfxkLC8C6tQYyGa0Jkx7bnUul0zaS6eQ-UDJjkUnrAkPB-GbvxBZPlgpFInn7V7NegS8g9sTYjjGwA6SkzsoftyiP8Wedi9W5zzMrwEhIzKhtq6DRWxxNynuK42DgZeP422eV2L4NkB7PHLVVd2L9SCBS_c0kf-Xazspmx34uMzkqAYXaWIVFl8YFyCIlXUB9MOCcLoO2Esrycr2adWk_rgCqfWq6sTNvFpC4ukl8YE-5QE3hYkR7ZBBdcidyQ3h6u3nuDmgnE",
    industry: "Yacht & Marine Tourism",
    tag: "Yacht & Marine Tourism",
    tagClass: "bg-primary-container text-white",
    title: "CloudScale Global Infrastructure",
    problem:
      "Fractured user journey leading to 45% drop-off in the onboarding funnel.",
    solution:
      "Full UI/UX overhaul focusing on guided task completion and performance optimization.",
    result: "+120% conversion",
    stat1: { value: "2x", label: "More Leads" },
    stat2: { value: "1.4s", label: "Load Speed" },
    statColor: "text-primary",
  },
  {
    slug: "medlink",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-FohTLbJyswsCo-bv68GokJvQSWbhefF5Afka0g9rBd2fyZtwEwIux0Ey0BP0YggOSsKReELuI6GBwpjK2F6h_yR0j1u2sShzaj2SbngMozjnmNhOZ9iRsAFkOme2HDJhGYf7HxbBsA8cw2J7NO2KEsRf6ZyE3nOBw-oUgVLWHrRzPi_7BinsyfQaGOSvEYFb-_zvej7eoJONDgJn68jkl7NYMHj9_JI8H-cSzh11ORc25Z_P52VP65Ido5pnZAf4p-1c_ysU1OE",
    industry: "Real Estate",
    tag: "Real Estate",
    tagClass: "bg-secondary-container text-on-secondary-container",
    title: "MedLink Telehealth Platform",
    problem:
      "Complex HIPAA-compliant data management causing provider burnout.",
    solution:
      "Developed a custom EHR integration with a simplified dashboard architecture.",
    result: "35% Time Saved",
    stat1: { value: "98%", label: "Uptime" },
    stat2: { value: "0", label: "Security Breaches" },
    statColor: "text-secondary",
  },
  {
    slug: "vanguard",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFlqzASpQ5lMpLvFI-AUyvK4k8JOkntXE7DqxgwTu-mvNoOJrxYHWgksylP2We1t1F8G7CswGbhgSzkkS3W3C4IRSTOgWnKZ_a50WC3dY2hjFP4hJwVQNuzWvbUEqJ1qDAUpXpxGa1UME-1OBujIgn0dRonslXOEc67lomPJCB06qCdg7tS3BweXkFzvY2TPmaU3xtWJkGjQizJ2VTirSgRHzsapNMx8E86w9JSVX5myQkWI3s2ovTWVdwNiDUinKMYXF3WihnfZs",
    industry: "Hospitality Tech",
    tag: "Hospitality Tech",
    tagClass: "bg-tertiary-container text-on-tertiary-container",
    title: "Vanguard Luxury Commerce",
    problem:
      "High cart abandonment rates on mobile devices due to slow checkout.",
    solution:
      "PWA implementation with headless commerce architecture and one-tap pay.",
    result: "+60% Sales",
    stat1: { value: "2.4x", label: "ROAS" },
    stat2: { value: "-50%", label: "Bounce Rate" },
    statColor: "text-tertiary",
  },
  {
    slug: "aura",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB61VyXeX0T4J19RSKFiOrIJEI9SKABS2EdsN7-xA10UxpgM-Fav0pv2J3WtQRB6R2oPGKBB4Oa3E4EusPqDLgO1etUnaiqz5ZYaxqq7wMXQfYng1gNye1YWw01Knf7Vwd7lJsxBOcb7w7_Jm_G2KSl0ApLnrC_wicN4F_ES-qjRiUR6FDuDCMFzCuI_KcvWhm0zJVTJI4Zn-3xFi7VhBVth6KwOjv8r7wj5ng3n1qsifiGGO1prdFjxhcCQ3LRY94oaakuicpJh34",
    industry: "Yacht & Marine Tourism",
    tag: "Yacht & Marine Tourism",
    tagClass: "bg-primary text-on-primary",
    title: "Aura Wealth Management",
    problem: "Opaque reporting causing low user retention and trust issues.",
    solution:
      "Interactive data storytelling and real-time portfolio transparency tools.",
    result: "92% Retention",
    stat1: { value: "$4B+", label: "AUM Managed" },
    stat2: { value: "15min", label: "KYC Process" },
    statColor: "text-primary",
  },
];

export function CaseStudiesPage() {
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
                  href="/contact"
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
