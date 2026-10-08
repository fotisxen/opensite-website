"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { fbq } from "@/lib/pixel";
import { useEffect } from "react";

const processSteps = [
  {
    num: "01",
    title: "Discovery",
    text: "Deep dive into business goals and user personas.",
  },
  {
    num: "02",
    title: "Strategy",
    text: "Architecture planning and conversion mapping.",
  },
  {
    num: "03",
    title: "Build",
    text: "Agile development with continuous integration.",
  },
  {
    num: "04",
    title: "Launch",
    text: "Rigorous QA and performance optimization.",
  },
];

export function ServicesPage() {
  useEffect(() => {
    fbq("ViewContent", { content_name: "Services Page" });
  }, []);

  return (
    <>
      <section className="relative flex min-h-[819px] items-center justify-center overflow-hidden py-24">
        <FadeIn className="relative z-10 mx-auto max-w-container-max px-margin-mobile text-center md:px-margin-desktop">
          <div className="mb-stack-lg inline-flex animate-[float_6s_ease-in-out_infinite] items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-primary">
            <span className="material-symbols-outlined text-[18px]">
              auto_awesome
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider">
              Expert Digital Solutions
            </span>
          </div>
          <h1 className="mx-auto mb-stack-lg max-w-4xl font-display-lg text-display-lg leading-tight text-text-primary">
            Scale Your Business with{" "}
            <span className="text-primary">High-Velocity</span> Digital Growth.
          </h1>
          <p className="mx-auto mb-stack-lg max-w-2xl font-body-lg text-body-lg text-text-secondary">
            We combine precision engineering with data-driven strategy to build
            digital products that dominate markets and accelerate revenue.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#process"
              className="w-full rounded-xl bg-primary-container px-8 py-4 text-center font-label-md text-on-primary-container shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] sm:w-auto"
            >
              View Our Process
            </a>
            <Link
              href="/case-studies/"
              className="w-full rounded-xl border border-surface-border px-8 py-4 font-label-md text-text-primary transition-all hover:bg-surface-container sm:w-auto"
            >
              Our Success Stories
            </Link>
          </div>
        </FadeIn>
      </section>

      <section className="service-grid-pattern py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <FadeIn className="mb-20">
            <h2 className="mb-4 font-headline-lg text-headline-lg text-text-primary">
              Core Capabilities
            </h2>
            <div className="h-1.5 w-24 rounded-full bg-primary" />
          </FadeIn>

          <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-12">
            <StaggerItem className="group glass-card rounded-2xl p-stack-lg transition-all hover:border-primary md:col-span-8">
              <div className="flex flex-col gap-stack-lg md:flex-row">
                <div className="md:w-1/2">
                  <span className="material-symbols-filled material-symbols-outlined mb-stack-md text-5xl text-primary">
                    code
                  </span>
                  <h3 className="mb-stack-md font-headline-md text-headline-md text-text-primary">
                    Web Development
                  </h3>
                  <p className="mb-stack-lg font-body-md text-text-secondary">
                    Enterprise-grade web applications built with performance and
                    scalability at their core. We choose the right tool for each
                    project, not the trendy one.
                  </p>
                  <ul className="mb-stack-lg space-y-3">
                    {[
                      {
                        label: "Next.js & React",
                        note: "Custom & complex platforms",
                      },
                      {
                        label: "WordPress",
                        note: "Content-driven & e-commerce",
                      },
                      { label: "Webflow", note: "Marketing & editorial sites" },
                    ].map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center gap-3 text-on-surface"
                      >
                        <span className="material-symbols-outlined text-secondary">
                          check_circle
                        </span>
                        <span className="font-label-md">
                          {item.label}
                          <span className="ml-2 font-body-sm text-text-secondary">
                           {item.note}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center md:w-1/2">
                  <div className="h-64 w-full overflow-hidden rounded-xl shadow-2xl grayscale transition-all duration-500 group-hover:grayscale-0">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuApQjAx3bwJ1XnKaEqONjtoLVcImIbSsSKcn3zdWg6pevgyqZRBWH7HaNK74WMGYrNCp0QqllulOH1UdY51RTK_I1rCGpFjisXl4jPhku2BT4C3JyJpbzl4zKZaQKADz3khMRiGXUpVlp6MMlVmq8Nbkf6UFuZvETxixDLxRHBO1Pjiqbs4UcTpfUwAdtz_EC8YhSjWGe-VyQrqS1uARkgYlfcyXqJpOqUAsKoHg_SbMjDABySri8xeCA5tXQou9Yjyfb0_WP1_jk0"
                      alt="Web development workspace"
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="glass-card flex flex-col justify-between rounded-2xl p-stack-lg transition-all hover:border-primary md:col-span-4">
              <div>
                <span className="material-symbols-filled material-symbols-outlined mb-stack-md text-5xl text-tertiary">
                  trending_up
                </span>
                <h3 className="mb-stack-md font-headline-md text-headline-md text-text-primary">
                  SEO Strategy
                </h3>
                <p className="font-body-md text-text-secondary">
                  Data-backed optimization that drives organic traffic and
                  converts visitors into loyal customers.
                </p>
              </div>
              <div className="mt-stack-lg border-t border-surface-border pt-stack-lg">
                <div className="font-headline-sm text-headline-sm text-secondary">
                  240%
                </div>
                <div className="font-label-sm text-label-sm uppercase text-text-secondary">
                  Average Organic Growth
                </div>
              </div>
            </StaggerItem>

            <StaggerItem className="glass-card rounded-2xl p-stack-lg transition-all hover:border-primary md:col-span-4">
              <span className="material-symbols-filled material-symbols-outlined mb-stack-md text-5xl text-secondary">
                shopping_bag
              </span>
              <h3 className="mb-stack-md font-headline-md text-headline-md text-text-primary">
                E-commerce
              </h3>
              <p className="mb-stack-lg font-body-md text-text-secondary">
                Custom shopping experiences designed to maximize AOV and
                conversion rates.
              </p>
              <div className="group h-40 w-full overflow-hidden rounded-xl bg-surface-container-high">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCZbZQuIQYM_dn8ITluc-pXIxOcIzPD0UjiheAQzBRKp_l2JBbmh2iqSIEi1xXMrjWgHQIugaMjBYz8L73V6ltRPlcsY40KgOuL7b9ScbXgXzTUpV6ohDlRdddiOmkriVgEqiiBUkpR44vJLXkO43O2Yi3qTDIIALEXoBQK9063DM3gKr979HsKcVtwp72lFVuq8Xf-Y-aEx--9MvUtJz_xHtssRhxnFD21aHJNE7q4qoZL_ABQbdsPv_UJnfQR4oTAs__Oi9xGtw"
                  alt="E-commerce product display"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </StaggerItem>

            <StaggerItem className="glass-card flex flex-col gap-stack-lg rounded-2xl p-stack-lg transition-all hover:border-primary md:col-span-8 md:flex-row">
              <div className="order-2 flex items-center md:order-1 md:w-1/2">
                <div className="relative h-64 w-full rounded-xl border border-surface-border bg-black/40 p-4">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfDWQnAadfX9WpfJ5FRWhUO5De2Ghd7zYaAOwwsc0AE23O4Zpwi8V6VKS1r1yuTcpbK8o7Vvff5PXqNTZ90ryJkIhfIwYOAh_PofcfMRk13HcTfmX3xE4BEK1t6KzuEPE1IOtH1gsb6GBQPMVeLAtfLMgvVKsBQ5f3_1ECMdfyFbADeaUxq8GL_ASkuOBq2wIs8StU7Xgx--k_7rtzAnCMzoPMUfNNjBNWTC6j7gEbzBOK8HS7_QG_0gvXn0kTY5eJ-IixRVr2fzY"
                    alt="Mobile app interface"
                    width={500}
                    height={400}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2 md:w-1/2">
                <span className="material-symbols-filled material-symbols-outlined mb-stack-md text-5xl text-primary">
                  smartphone
                </span>
                <h3 className="mb-stack-md font-headline-md text-headline-md text-text-primary">
                  Desktop &amp; Mobile Apps
                </h3>
                <p className="mb-stack-lg font-body-md text-text-secondary">
                  Native-feeling apps for the desktop and the phone, built from
                  one codebase and one backend. We ship our own product this
                  way, see{" "}
                  <Link
                    href="/case-studies/hoopstruct/"
                    className="text-primary hover:underline"
                  >
                    HoopStruct
                  </Link>
                  .
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {["Windows", "macOS", "iOS", "Android"].map((platform) => (
                    <div
                      key={platform}
                      className="rounded-lg border border-surface-border bg-surface-container p-3 text-center"
                    >
                      <div className="font-bold text-primary">{platform}</div>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="group glass-card rounded-2xl p-stack-lg transition-all hover:border-primary md:col-span-12">
              <div className="flex flex-col gap-stack-lg md:flex-row">
                <div className="md:w-1/2">
                  <span className="material-symbols-filled material-symbols-outlined mb-stack-md text-5xl text-secondary">
                    hub
                  </span>
                  <h3 className="mb-stack-md font-headline-md text-headline-md text-text-primary">
                    CRM Systems
                  </h3>
                  <p className="mb-stack-lg font-body-md text-text-secondary">
                    We set up and customize CRMs that fit how your sales team
                    actually works, no bloated software, no wasted seats.
                  </p>
                  <ul className="mb-stack-lg space-y-3">
                    {[
                      {
                        label: "HubSpot & Pipedrive",
                        note: "Fast setup for growing teams",
                      },
                      {
                        label: "Custom CRM builds",
                        note: "For unique sales workflows",
                      },
                      {
                        label: "Integrations",
                        note: "Connect your site & e-shop to your pipeline",
                      },
                    ].map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center gap-3 text-on-surface"
                      >
                        <span className="material-symbols-outlined text-secondary">
                          check_circle
                        </span>
                        <span className="font-label-md">
                          {item.label}
                          <span className="ml-2 font-body-sm text-text-secondary">
                           {item.note}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center md:w-1/2">
                  <div className="h-64 w-full overflow-hidden rounded-xl border border-surface-border shadow-2xl">
                    {/* fake browser chrome */}
                    <div className="flex items-center gap-1.5 border-b border-surface-border bg-surface-container-high px-3 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-error/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-secondary/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                      <span className="ml-2 rounded bg-surface-container px-2 py-0.5 text-[10px] text-text-secondary">
                        app.yourcrm.com/pipeline
                      </span>
                    </div>

                    <div className="grid h-[calc(100%-33px)] grid-cols-5 gap-3 bg-surface-container-lowest p-4">
                      {/* mini stat + chart panel */}
                      <div className="col-span-2 flex flex-col justify-between rounded-lg border border-surface-border bg-surface-card p-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-wide text-text-secondary">
                            Pipeline Value
                          </div>
                          <div className="text-lg font-bold text-secondary">
                            €48,200
                          </div>
                        </div>
                        <div className="flex h-16 items-end gap-1">
                          {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t bg-primary/40"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* pipeline columns */}
                      {[
                        { label: "New", color: "bg-primary", count: 3 },
                        { label: "Contacted", color: "bg-tertiary", count: 4 },
                        { label: "Won", color: "bg-secondary", count: 2 },
                      ].map((col) => (
                        <div
                          key={col.label}
                          className="flex flex-col rounded-lg border border-surface-border bg-surface-card p-2"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-[9px] font-label-sm uppercase tracking-wide text-text-secondary">
                              {col.label}
                            </span>
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${col.color}`}
                            />
                          </div>
                          <div className="flex flex-1 flex-col gap-1.5">
                            {Array.from({ length: col.count }).map((_, i) => (
                              <div
                                key={i}
                                className="rounded bg-surface-container px-1.5 py-1"
                                style={{ opacity: 1 - i * 0.12 }}
                              >
                                <div className="h-1.5 w-3/4 rounded-full bg-text-secondary/30" />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="group glass-card rounded-2xl p-stack-lg transition-all hover:border-primary md:col-span-12">
              <div className="flex flex-col gap-stack-lg md:flex-row">
                <div className="md:w-1/2">
                  <span className="material-symbols-filled material-symbols-outlined mb-stack-md text-5xl text-tertiary">
                    lan
                  </span>
                  <h3 className="mb-stack-md font-headline-md text-headline-md text-text-primary">
                    Intranets &amp; SharePoint (SPFx)
                  </h3>
                  <p className="mb-stack-lg font-body-md text-text-secondary">
                    Internal portals your people actually use. We build modern
                    company intranets on SharePoint and extend them with custom
                    SPFx web parts, inside the Microsoft 365 setup you already
                    have.
                  </p>
                  <ul className="mb-stack-lg space-y-3">
                    {[
                      {
                        label: "SharePoint intranets",
                        note: "Branded, easy to maintain",
                      },
                      {
                        label: "Custom SPFx web parts",
                        note: "Built for how your team works",
                      },
                      {
                        label: "Microsoft 365 integration",
                        note: "Teams, sign-in and permissions",
                      },
                    ].map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center gap-3 text-on-surface"
                      >
                        <span className="material-symbols-outlined text-secondary">
                          check_circle
                        </span>
                        <span className="font-label-md">
                          {item.label}
                          <span className="ml-2 font-body-sm text-text-secondary">
                            {item.note}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/case-studies/starbulk-intranet/"
                    className="font-label-md text-primary hover:underline"
                  >
                    See the Starbulk intranet →
                  </Link>
                </div>
                <div className="flex items-center md:w-1/2">
                  <div className="relative h-64 w-full overflow-hidden rounded-xl border border-surface-border shadow-2xl">
                    <Image
                      src="/case-studies/starbulk-intranet.svg"
                      alt="Intranet portal built with SharePoint and SPFx"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 bg-surface-container-lowest py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <FadeIn className="mb-16 text-center">
            <h2 className="mb-4 font-headline-lg text-headline-lg text-text-primary">
              Our High-Velocity Process
            </h2>
            <p className="mx-auto max-w-xl font-body-md text-text-secondary">
              From discovery to deployment, we maintain a focus on transparency
              and measurable results.
            </p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {processSteps.map((step) => (
              <StaggerItem key={step.num} className="p-6 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                  <span className="text-xl font-bold text-primary">
                    {step.num}
                  </span>
                </div>
                <h4 className="mb-2 font-headline-sm text-headline-sm text-text-primary">
                  {step.title}
                </h4>
                <p className="font-body-sm text-body-sm text-text-secondary">
                  {step.text}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-primary/5" />
        <FadeIn className="relative z-10 mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <div className="glass-card relative overflow-hidden rounded-[32px] p-12 text-center md:p-20">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />
            <h2 className="mb-stack-md font-display-lg text-display-lg leading-tight text-text-primary">
              Ready to grow?
            </h2>
            <p className="mx-auto mb-stack-lg max-w-2xl font-body-lg text-body-lg text-text-secondary">
              Stop leaving revenue on the table. Let&apos;s discuss your next
              project and build something that truly moves the needle.
            </p>
            <Link
              href="/contact/"
              className="group inline-flex items-center rounded-xl bg-primary-container px-12 py-5 font-label-md text-on-primary-container shadow-xl transition-all hover:scale-105"
            >
              Get Free Consultation
              <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
