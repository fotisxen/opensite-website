import Image from "next/image";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { fbq } from "@/lib/pixel";
import { useEffect } from "react";

export function AboutPage() {
  useEffect(() => {
    fbq("ViewContent", { content_name: "About Page" });
  }, []);
  return (
    <>
      <section className="relative overflow-hidden px-margin-mobile pb-24 pt-40 md:px-margin-desktop md:pb-32 md:pt-56">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute right-[-10%] bottom-[-10%] h-[30%] w-[30%] rounded-full bg-secondary/10 blur-[100px]" />
        </div>
        <FadeIn className="relative z-10 mx-auto max-w-container-max">
          <div className="max-w-3xl">
            <span className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-label-sm text-label-sm text-primary">
              About OpenSite
            </span>
            <h1 className="mb-8 font-display-lg text-display-lg-mobile tracking-tight md:text-display-lg">
              We build digital products that help{" "}
              <span className="text-gradient">businesses grow</span>.
            </h1>
            <p className="mb-10 max-w-2xl font-body-lg text-body-lg text-text-secondary">
              We are a team of designers, engineers, and strategists obsessed
              with creating high-performance digital experiences that solve real
              market problems.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="bg-surface-container-low px-margin-mobile py-24 md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <FadeIn>
              <div className="group relative aspect-square overflow-hidden rounded-xl border border-surface-border shadow-2xl md:aspect-video lg:aspect-square">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9va2IBUcRrB862XB7JQCNy19GghTspwrPQxjHOp4P9rpWW7gjPGyRms909mortbq3FwoGtlWIP4nAPrTSZpGgWjFao_3eiF3ooGae0xrhN1U9xhCCz6bcaSBFJp5fd94ufM8AfJhqnHfAEsaBmm0XVXSuq2_hdXDfBE-NJKT5eNkkYaFX7MC6hHOrLFVOaetYy3KMlR4Gm2nMQeaj7rHfDKytspAKBEUJwFMf3quBFXA-VJEWuoDwL_E1EuxfYGGn0VOyeFBRjZE"
                  alt="OpenSite agency workspace"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </FadeIn>
            <FadeIn delay={0.15} direction="left" className="space-y-12">
              <div>
                <h2 className="mb-6 font-headline-md text-headline-md">
                  Our Mission
                </h2>
                <p className="font-body-md leading-relaxed text-text-secondary">
                  At OpenSite, our mission is to accelerate business growth
                  through superior digital craftsmanship. We don&apos;t just
                  build websites; we engineer revenue-generating ecosystems.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-gutter">
                <div className="rounded-xl border border-surface-border bg-surface-card p-6">
                  <div className="mb-2 font-display-lg text-headline-lg text-secondary">
                    &lt;2s
                  </div>
                  <div className="font-label-md text-text-secondary">
                    Avg. Page Load Time
                  </div>
                </div>
                <div className="rounded-xl border border-surface-border bg-surface-card p-6">
                  <div className="mb-2 font-display-lg text-headline-lg text-secondary">
                    100%
                  </div>
                  <div className="font-label-md text-text-secondary">
                    Client Retention
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile py-24 md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <FadeIn className="mx-auto mb-20 max-w-2xl text-center">
            <h2 className="mb-4 font-headline-md text-headline-md">
              Why We Exist
            </h2>
            <p className="font-body-md text-text-secondary">
              The market is flooded with agencies that prioritize aesthetics
              over impact. We exist to bridge the gap between world-class design
              and measurable business results.
            </p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {[
              {
                icon: "broken_image",
                title: "Fragmented Experiences",
                text: "Most digital products suffer from a lack of cohesion between design and engineering.",
              },
              {
                icon: "speed",
                title: "Stagnant Growth",
                text: "A beautiful site that doesn't convert is a failure. We focus on performance and conversion-centric design.",
              },
              {
                icon: "visibility_off",
                title: "Lack of Transparency",
                text: "Vague timelines and hidden costs are the industry norm. We operate with radical transparency.",
              },
            ].map((item) => (
              <StaggerItem
                key={item.title}
                className="rounded-xl border border-surface-border bg-surface-card p-8 transition-all duration-300 hover:border-primary/50"
              >
                <span className="material-symbols-outlined mb-6 text-4xl text-primary">
                  {item.icon}
                </span>
                <h3 className="mb-4 font-headline-sm text-headline-sm">
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-text-secondary">
                  {item.text}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-surface-container-lowest px-margin-mobile py-24 md:px-margin-desktop">
        <div className="mx-auto max-w-container-max">
          <FadeIn className="mb-16 text-center">
            <h2 className="font-headline-md text-headline-md">
              The Values That Drive Us
            </h2>
          </FadeIn>
          <Stagger className="grid auto-rows-[280px] grid-cols-1 gap-6 md:grid-cols-12">
            <StaggerItem className="group relative flex flex-col justify-end overflow-hidden rounded-xl border border-surface-border bg-surface-card p-10 md:col-span-8">
              <div className="absolute top-0 right-0 p-10 opacity-10 transition-opacity group-hover:opacity-20">
                <span className="material-symbols-outlined text-[160px] text-primary">
                  trending_up
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="mb-4 font-headline-md text-headline-md">
                  Results-Driven
                </h3>
                <p className="max-w-lg font-body-md text-text-secondary">
                  Every design decision and technical implementation is vetted
                  against key performance indicators and business objectives.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className="flex flex-col justify-between rounded-xl bg-primary-container p-10 text-on-primary-container md:col-span-4">
              <span className="material-symbols-filled material-symbols-outlined text-5xl">
                visibility
              </span>
              <div>
                <h3 className="mb-2 font-headline-sm text-headline-sm">
                  Transparency
                </h3>
                <p className="font-body-sm opacity-90">
                  Clear communication, honest timelines, and shared project
                  trackers.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className="flex flex-col justify-between rounded-xl border border-surface-border bg-surface-container-high p-10 md:col-span-4">
              <span className="material-symbols-outlined text-5xl text-secondary">
                handshake
              </span>
              <div>
                <h3 className="mb-2 font-headline-sm text-headline-sm">
                  Long-term Focus
                </h3>
                <p className="font-body-sm text-text-secondary">
                  We build enduring partnerships to support your evolution.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className="group relative overflow-hidden rounded-xl border border-surface-border md:col-span-8">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCTisQfmo9PjzKKJK7blrHjvKpaPq9-3cCPjVH692UL6XjeaOMeF4CJuIqEjeKzWq3gGSZ0ujZb1VMTMqeGn5hRDgz5-mfETVd5LatDyC6ZsFrc6y_kKKNXQarDo-6RYvO0Kxl93Jdt44Z3EErjM10Tq8WUvEmS9Ru5JivqRcTCnSqBuphpNk399zD4Eq20kRO3qPWIoevkc7d7KA12MPnBzxyJE0DqM8LC8vVDWSDfBgqjEopy9nuYOu0YDH4V2FU1Q_6_pC5mns"
                alt="Team collaboration"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <h4 className="p-6 text-center font-headline-sm text-headline-sm text-white">
                  Innovation Through Collaboration
                </h4>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden px-margin-mobile py-32 md:px-margin-desktop">
        <FadeIn className="relative z-10 mx-auto max-w-container-max">
          <div className="mx-auto max-w-4xl rounded-2xl border border-surface-border bg-surface-card/40 p-12 text-center shadow-2xl backdrop-blur-md md:p-24">
            <h2 className="mb-8 font-display-lg text-display-lg-mobile tracking-tight md:text-headline-lg">
              Ready to transform your <br />
              <span className="text-primary">digital presence?</span>
            </h2>
            <p className="mx-auto mb-12 max-w-2xl font-body-lg text-body-lg text-text-secondary">
              Partner with an agency that prioritizes your growth as much as you
              do.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/book-a-call/"
                className="rounded-lg bg-primary-container px-10 py-5 font-label-md text-on-primary-container transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                Start your project
              </Link>
              <Link
                href="/case-studies/"
                className="rounded-lg border border-surface-border bg-transparent px-10 py-5 font-label-md text-text-primary transition-all hover:bg-surface-container-high active:scale-95"
              >
                View our work
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
