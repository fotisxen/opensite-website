"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { useEffect, useState } from "react";

const techStack = ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Vercel", "GraphQL"];

const deliverables = [
  {
    icon: "speed",
    title: "Sub-2s Load Times",
    text: "We obsess over Core Web Vitals. Every site we ship scores 90+ on Lighthouse across all categories.",
  },
  {
    icon: "devices",
    title: "Pixel-Perfect Responsive",
    text: "From 320px mobile to 4K displays — every breakpoint is deliberate, not an afterthought.",
  },
  {
    icon: "lock",
    title: "Enterprise-Grade Security",
    text: "HTTPS, CSP headers, input validation, and dependency audits baked into every build by default.",
  },
  {
    icon: "integration_instructions",
    title: "API & CMS Integration",
    text: "Headless CMS, payment gateways, CRMs, analytics — we wire everything together cleanly.",
  },
  {
    icon: "trending_up",
    title: "Built to Convert",
    text: "Every layout decision is informed by conversion data, not just aesthetics.",
  },
  {
    icon: "support_agent",
    title: "Ongoing Partnership",
    text: "We don&apos;t disappear after launch. Monthly retainers, priority support, and iterative improvements.",
  },
];

const process = [
  { label: "Discovery", detail: "Goals, audience, competitors, tech audit" },
  { label: "Architecture", detail: "Stack selection, routing, data model" },
  { label: "Design System", detail: "Tokens, components, motion language" },
  { label: "Build", detail: "Iterative sprints, weekly demos" },
  { label: "QA & Launch", detail: "Cross-browser, performance, accessibility" },
  { label: "Growth", detail: "Analytics, A/B tests, iterations" },
];

function TypingTechStack() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = techStack[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % techStack.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="text-primary">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function WebDevelopmentPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background pt-20">

      {/* Hero — dark, terminal-coded */}
      <section className="relative border-b border-surface-border bg-surface-container-lowest py-28">
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-container/10 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="font-label-sm text-xs uppercase tracking-widest text-primary">Web Development</span>
            </div>

            <h1 className="mb-6 max-w-4xl font-display-lg text-5xl font-bold leading-[1.1] text-text-primary md:text-7xl">
              Code that{" "}
              <br className="hidden md:block" />
              ships in{" "}
              <TypingTechStack />
            </h1>

            <p className="mb-10 max-w-2xl font-body-lg text-lg text-text-secondary">
              We engineer production-grade web applications — not templates, not page builders. Performant, scalable, and built to outlast your roadmap.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/book-a-call/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-container px-8 py-4 font-label-md text-white shadow-lg shadow-primary-container/20 transition-all hover:scale-105 hover:opacity-90"
              >
                Start a Project
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-xl border border-surface-border px-8 py-4 font-label-md text-text-primary transition-all hover:bg-surface-container-low"
              >
                View Our Work
              </Link>
            </div>
          </FadeIn>

          {/* Terminal window */}
          <FadeIn delay={0.2}>
            <div className="mt-20 overflow-hidden rounded-2xl border border-surface-border bg-surface-container shadow-2xl">
              {/* Terminal top bar */}
              <div className="flex items-center gap-2 border-b border-surface-border bg-surface-container-high px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-error/70" />
                <span className="h-3 w-3 rounded-full bg-secondary/70" />
                <span className="h-3 w-3 rounded-full bg-primary/70" />
                <span className="ml-4 font-mono text-xs text-text-secondary">opensite — build output</span>
              </div>
              <div className="space-y-2 p-6 font-mono text-sm">
                {[
                  { label: "✓", text: "Compiled successfully in 847ms", color: "text-primary" },
                  { label: "✓", text: "Lighthouse score: 98 / 100 / 100 / 100", color: "text-primary" },
                  { label: "✓", text: "Bundle size: 42kb gzipped (↓ 67%)", color: "text-primary" },
                  { label: "✓", text: "Zero critical vulnerabilities", color: "text-primary" },
                  { label: "→", text: "Deploying to production...", color: "text-text-secondary" },
                  { label: "🚀", text: "Live at https://yourclient.com", color: "text-secondary" },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="flex gap-3"
                  >
                    <span className={`shrink-0 ${line.color}`}>{line.label}</span>
                    <span className="text-text-secondary">{line.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <FadeIn className="mb-16">
            <h2 className="font-display-lg text-4xl font-bold text-text-primary md:text-5xl">
              What you actually get
            </h2>
            <p className="mt-4 max-w-xl text-text-secondary">
              No vague promises. Here&apos;s exactly what every web development engagement includes.
            </p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d) => (
              <StaggerItem
                key={d.title}
                className="group rounded-2xl border border-surface-border bg-surface-card p-8 transition-all hover:border-primary/30 hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined mb-5 text-4xl text-primary">{d.icon}</span>
                <h3 className="mb-2 font-bold text-text-primary">{d.title}</h3>
                <p className="text-sm text-text-secondary">{d.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-surface-border bg-surface-container-lowest py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <FadeIn className="mb-16">
            <h2 className="font-display-lg text-4xl font-bold text-text-primary md:text-5xl">Our process</h2>
            <p className="mt-4 text-text-secondary">Six phases. No surprises.</p>
          </FadeIn>
          <div className="grid grid-cols-1 gap-px bg-surface-border md:grid-cols-3 lg:grid-cols-6">
            {process.map((step, i) => (
              <FadeIn key={step.label} delay={i * 0.07}>
                <div className="group bg-surface-container-lowest p-8 transition-colors hover:bg-surface-container-low">
                  <div className="mb-4 font-mono text-4xl font-bold text-primary/20 transition-colors group-hover:text-primary/40">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mb-2 font-bold text-text-primary">{step.label}</div>
                  <div className="text-xs text-text-secondary">{step.detail}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-primary-container p-12 text-white md:p-20">
              <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
              <div className="relative z-10">
                <h2 className="mb-4 text-4xl font-bold md:text-5xl">Ready to build something great?</h2>
                <p className="mb-8 max-w-xl opacity-80">
                  Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d approach it — free, in 15 minutes.
                </p>
                <Link
                  href="/book-a-call/"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-label-md text-primary-container transition-all hover:scale-105"
                >
                  Book a Free Call
                  <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}