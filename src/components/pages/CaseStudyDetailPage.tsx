import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { getCaseStudy } from "@/lib/case-studies";

interface Props {
  slug: string;
}

export function CaseStudyDetailPage({ slug }: Props) {
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <>
      {/* ── Hero ── */}
      <section className="mx-auto mt-12 mb-20 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn className="max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-label-sm text-label-sm text-primary">
              {cs.industry}
            </span>
            <span className="font-label-sm text-label-sm text-text-secondary">
              · {cs.duration}
            </span>
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-full border border-surface-border px-3 py-1 font-label-sm text-label-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              <span className="material-symbols-outlined text-[14px]">
                open_in_new
              </span>
              View Live Site
            </a>
          </div>

          <h1 className="gradient-text mb-6 font-display-lg text-display-lg leading-tight">
            {cs.title}
          </h1>
          <p className="max-w-2xl font-body-lg text-body-lg text-text-secondary">
            {cs.subtitle}
          </p>
        </FadeIn>
      </section>

      {/* ── Hero Metrics ── */}
      <section className="mb-20 border-y border-surface-border bg-surface-container">
        <FadeIn className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop">
          <div className="grid grid-cols-2 gap-gutter md:grid-cols-4">
            {cs.heroMetrics.map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display-lg text-headline-lg text-secondary">
                  {value}
                </span>
                <span className="font-label-md text-label-md text-text-secondary">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Problem + Image ── */}
      <section className="mx-auto mb-20 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          {/* Problem */}
          <StaggerItem className="rounded-xl border border-surface-border bg-surface-card p-stack-lg md:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="material-symbols-filled material-symbols-outlined text-error">
                warning
              </span>
              <h2 className="font-headline-sm text-headline-sm">The Problem</h2>
            </div>
            <div className="space-y-4 font-body-md text-text-secondary">
              <p>{cs.problem.description}</p>
              <ul className="list-none space-y-3 pt-4">
                {cs.problem.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined mt-1 text-sm text-error">
                      close
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Image */}
          <StaggerItem className="relative h-[400px] overflow-hidden rounded-xl border border-surface-border md:col-span-5">
            <Image
              src={cs.image}
              alt={cs.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="rounded-full border border-surface-border bg-background/80 px-3 py-1 font-label-sm text-label-sm text-text-secondary backdrop-blur-sm">
                Built with {cs.platform}
              </span>
            </div>
          </StaggerItem>

          {/* Solution highlights */}
          <StaggerItem className="rounded-xl border border-surface-border bg-surface-card p-stack-lg md:col-span-12">
            <div className="mb-6 flex items-center gap-3">
              <span className="material-symbols-filled material-symbols-outlined text-primary">
                lightbulb
              </span>
              <h2 className="font-headline-sm text-headline-sm">
                The Solution
              </h2>
            </div>
            <p className="mb-6 font-body-md text-text-secondary">
              {cs.solution.description}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cs.solution.highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-lg border border-surface-border bg-surface-container-high p-4"
                >
                  <span className="mb-1 block font-bold text-primary">
                    {h.title}
                  </span>
                  <p className="text-body-sm text-text-secondary">{h.desc}</p>
                </div>
              ))}
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      {/* ── Impact ── */}
      <section className="mx-auto mb-32 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 font-headline-lg text-headline-lg">
            Measurable Impact
          </h2>
          <p className="font-body-lg text-body-lg text-text-secondary">
            The results that matter to the business.
          </p>
        </FadeIn>
        <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {cs.impact.map((item) => (
            <StaggerItem
              key={item.value}
              className="glass-card flex flex-col items-center rounded-xl p-stack-lg text-center"
            >
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${item.iconWrap}`}
              >
                <span
                  className={`material-symbols-outlined text-3xl ${item.iconColor}`}
                >
                  {item.icon}
                </span>
              </div>
              <h4 className="mb-2 font-headline-sm text-headline-sm">
                {item.value}
              </h4>
              <p className="font-body-md text-text-secondary">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── Footer CTA ── */}
      <section className="mx-auto max-w-container-max px-margin-mobile pb-24 md:px-margin-desktop">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-surface-border bg-surface-card p-10 md:flex-row md:items-center">
            <div>
              <h2 className="mb-2 font-headline-md text-headline-md">
                Explore More Work
              </h2>
              <p className="font-body-md text-text-secondary">
                See how we solve problems across different industries.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/case-studies/"
                className="rounded-lg bg-primary-container px-6 py-3 font-label-md text-on-primary-container transition-all hover:opacity-90"
              >
                View All Case Studies
              </Link>
              <Link
                href="/book-a-call/"
                className="rounded-lg border border-surface-border px-6 py-3 font-label-md text-text-primary transition-all hover:bg-surface-container"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
