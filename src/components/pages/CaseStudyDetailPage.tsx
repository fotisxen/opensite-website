import Image from "next/image";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

export function CaseStudyDetailPage() {
  return (
    <>
      <section className="mx-auto mt-12 mb-20 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn className="max-w-4xl">
          <div className="mb-6 flex items-center gap-2">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-label-sm text-label-sm text-primary">
              FinTech Solutions
            </span>
            <span className="font-label-sm text-label-sm text-text-secondary">
              • 6 Month Project
            </span>
          </div>
          <h1 className="gradient-text mb-6 font-display-lg text-display-lg leading-tight">
            Real results from real businesses.
          </h1>
          <p className="max-w-2xl font-body-lg text-body-lg text-text-secondary">
            How we helped Nexus Pay scale their user acquisition by 40% while
            reducing CPA by $12 through a unified design system and
            performance-led development.
          </p>
        </FadeIn>
      </section>

      <section className="mb-20 border-y border-surface-border bg-surface-container">
        <FadeIn className="mx-auto max-w-container-max px-margin-mobile py-12 md:px-margin-desktop">
          <div className="grid grid-cols-2 gap-gutter md:grid-cols-4">
            {[
              ["+40%", "Lead Generation"],
              ["-$12", "Avg. CPA reduction"],
              ["2.4s", "Avg. Page Load Time"],
              ["15%", "Conversion Lift"],
            ].map(([value, label]) => (
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

      <section className="mx-auto mb-32 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-12">
          <StaggerItem className="rounded-xl border border-surface-border bg-surface-card p-stack-lg md:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="material-symbols-filled material-symbols-outlined text-primary">
                warning
              </span>
              <h2 className="font-headline-sm text-headline-sm">The Problem</h2>
            </div>
            <div className="space-y-4 font-body-md text-text-secondary">
              <p>
                Nexus Pay was struggling with a fragmented digital presence.
                Their legacy platform was slow, leading to high bounce rates on
                crucial registration pages.
              </p>
              <ul className="list-none space-y-3 pt-4">
                {[
                  "65% bounce rate on registration funnels",
                  "3-week lead time for landing page deployments",
                  "Mobile conversion rate 50% lower than desktop",
                ].map((item) => (
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

          <StaggerItem className="relative h-[400px] overflow-hidden rounded-xl border border-surface-border md:col-span-5">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdm8y0LKQNqqbGXbcUeMf0o03iLh5E72DmG17YzGEU5FcPf54GqHGmwFHKVULxCf-cJBVTqpn74awc5cjMUz8XBecYjBXhXbUFjBjBrG4ozLH3YxAyL-4nc6DdRwgxY71vVF0McbLUtpEr41ug7uU6ZygR8vORo93lyXGJtiDEnQh1NclJb_gMKLYLJoZJFLBrm3Jxu7L2IZ7sPXfNJOp9IwgMqkco6L3gUu_DH_SLoNxAgZKgLV6wq7FmS5P33ntF_M4JTcHgxLs"
              alt="Nexus Pay fintech dashboard"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </StaggerItem>

          <StaggerItem className="relative h-[400px] overflow-hidden rounded-xl border border-surface-border md:col-span-5">
            <div className="absolute inset-0 flex items-center justify-center bg-background/20 p-stack-lg backdrop-blur-[2px]">
              <div className="text-center">
                <h3 className="mb-2 font-headline-md text-headline-md">
                  Technical Core
                </h3>
                <p className="font-body-sm text-body-sm text-text-secondary">
                  Next.js + Tailwind CSS + Headless CMS
                </p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="rounded-xl border border-surface-border bg-surface-card p-stack-lg md:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="material-symbols-filled material-symbols-outlined text-primary">
                lightbulb
              </span>
              <h2 className="font-headline-sm text-headline-sm">The Solution</h2>
            </div>
            <div className="space-y-4 font-body-md text-text-secondary">
              <p>
                We engineered a performant, headless architecture that separated
                the content management from the presentation layer.
              </p>
              <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                <div className="rounded-lg border border-surface-border bg-surface-container-high p-4">
                  <span className="mb-1 block font-bold text-primary">
                    Performance First
                  </span>
                  <p className="text-body-sm">
                    99+ Lighthouse scores achieved across all core vitals.
                  </p>
                </div>
                <div className="rounded-lg border border-surface-border bg-surface-container-high p-4">
                  <span className="mb-1 block font-bold text-primary">
                    Visual Identity
                  </span>
                  <p className="text-body-sm">
                    Modern dark-mode aesthetic with interactive data layers.
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
        </Stagger>
      </section>

      <section className="mx-auto mb-32 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 font-headline-lg text-headline-lg">Measurable Impact</h2>
          <p className="font-body-lg text-body-lg text-text-secondary">
            We monitored growth metrics for 6 months post-deployment.
          </p>
        </FadeIn>
        <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {[
            { icon: "trending_up", iconWrap: "bg-secondary/10", iconColor: "text-secondary", value: "+240%", text: "Quarterly revenue growth attributed to direct web conversions." },
            { icon: "timer", iconWrap: "bg-primary/10", iconColor: "text-primary", value: "72%", text: "Reduction in average bounce rate across acquisition landing pages." },
            { icon: "group", iconWrap: "bg-tertiary/10", iconColor: "text-tertiary", value: "50k+", text: "New verified users onboarded through the redesigned funnel." },
          ].map((item) => (
            <StaggerItem
              key={item.value}
              className="glass-card flex flex-col items-center rounded-xl p-stack-lg text-center"
            >
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${item.iconWrap}`}
              >
                <span className={`material-symbols-outlined text-3xl ${item.iconColor}`}>
                  {item.icon}
                </span>
              </div>
              <h4 className="mb-2 font-headline-sm text-headline-sm">{item.value}</h4>
              <p className="font-body-md text-text-secondary">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-container-max px-margin-mobile pb-24 md:px-margin-desktop">
        <FadeIn className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div>
            <h2 className="mb-2 font-headline-md text-headline-md">
              Explore More Work
            </h2>
            <p className="font-body-md text-text-secondary">
              See how we solve complex problems across different industries.
            </p>
          </div>
          <Link
            href="/case-studies/"
            className="rounded-lg bg-primary-container px-6 py-3 font-label-md text-on-primary-container transition-all hover:opacity-90"
          >
            View All Case Studies
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
