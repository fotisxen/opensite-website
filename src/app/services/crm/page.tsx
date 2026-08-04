"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";
import { useEffect, useState } from "react";

const crmStack = [
  "HubSpot",
  "Pipedrive",
  "Salesforce",
  "Zoho",
  "Airtable",
  "Zapier",
  "Make",
  "REST APIs",
];

const deliverables = [
  {
    icon: "filter_alt",
    title: "Organized Pipeline",
    text: "Every lead lands in the right stage automatically — no more sticky notes or forgotten follow-ups.",
  },
  {
    icon: "sync_alt",
    title: "Full Integration",
    text: "Your website, forms, e-shop, and inbox all feed the CRM directly. One source of truth, zero manual entry.",
  },
  {
    icon: "auto_awesome",
    title: "Workflow Automation",
    text: "Auto-assign leads, trigger follow-up emails, and move deals forward without anyone lifting a finger.",
  },
  {
    icon: "tune",
    title: "Custom Fields & Stages",
    text: "Built around how your team actually sells — not a generic template that fights your process.",
  },
  {
    icon: "monitoring",
    title: "Reporting Dashboards",
    text: "Real-time visibility into pipeline value, conversion rates, and rep performance.",
  },
  {
    icon: "support_agent",
    title: "Team Onboarding",
    text: "We train your team hands-on so adoption actually sticks — not just a handover doc nobody reads.",
  },
];

const process = [
  { label: "Discovery", detail: "Sales process audit, team interviews" },
  { label: "Platform Fit", detail: "HubSpot, Pipedrive, or custom build" },
  { label: "Pipeline Setup", detail: "Stages, fields, deal flow" },
  { label: "Integrations", detail: "Site, forms, e-shop, email" },
  { label: "Automation", detail: "Assignment rules, triggers, alerts" },
  { label: "Training", detail: "Team onboarding, adoption support" },
];

function TypingCrmStack() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = crmStack[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % crmStack.length);
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

export default function CrmSystemsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background pt-20">
      {/* Hero — dark, terminal-coded */}
      <section className="relative border-b border-surface-border bg-surface-container-lowest py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-container/10 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="font-label-sm text-xs uppercase tracking-widest text-primary">
                CRM Systems
              </span>
            </div>

            <h1 className="mb-6 max-w-4xl font-display-lg text-5xl font-bold leading-[1.1] text-text-primary md:text-7xl">
              Pipelines that <br className="hidden md:block" />
              run on <TypingCrmStack />
            </h1>

            <p className="mb-10 max-w-2xl font-body-lg text-lg text-text-secondary">
              We set up and integrate CRMs built around how your team actually
              sells — not a generic template. No more leads falling through the
              cracks.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/book-a-call/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-container px-8 py-4 font-label-md text-white shadow-lg shadow-primary-container/20 transition-all hover:scale-105 hover:opacity-90"
              >
                Start a Project
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/case-studies/"
                className="inline-flex items-center gap-2 rounded-xl border border-surface-border px-8 py-4 font-label-md text-text-primary transition-all hover:bg-surface-container-low"
              >
                View Our Work
              </Link>
            </div>
          </FadeIn>

          {/* Terminal window */}
          <FadeIn delay={0.2}>
            <div className="mt-20 overflow-hidden rounded-2xl border border-surface-border bg-surface-container shadow-2xl">
              <div className="flex items-center gap-2 border-b border-surface-border bg-surface-container-high px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-error/70" />
                <span className="h-3 w-3 rounded-full bg-secondary/70" />
                <span className="h-3 w-3 rounded-full bg-primary/70" />
                <span className="ml-4 font-mono text-xs text-text-secondary">
                  opensite — pipeline sync
                </span>
              </div>
              <div className="space-y-2 p-6 font-mono text-sm">
                {[
                  {
                    label: "✓",
                    text: "Connected: website forms → CRM",
                    color: "text-primary",
                  },
                  {
                    label: "✓",
                    text: "1,240 leads imported, 0 duplicates",
                    color: "text-primary",
                  },
                  {
                    label: "✓",
                    text: "Auto-assignment rules: active",
                    color: "text-primary",
                  },
                  {
                    label: "✓",
                    text: "Follow-up sequences: enabled",
                    color: "text-primary",
                  },
                  {
                    label: "→",
                    text: "Syncing e-shop orders...",
                    color: "text-text-secondary",
                  },
                  {
                    label: "🚀",
                    text: "Pipeline live — 0 leads unassigned",
                    color: "text-secondary",
                  },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="flex gap-3"
                  >
                    <span className={`shrink-0 ${line.color}`}>
                      {line.label}
                    </span>
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
              No vague promises. Here&apos;s exactly what every CRM engagement
              includes.
            </p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d) => (
              <StaggerItem
                key={d.title}
                className="group rounded-2xl border border-surface-border bg-surface-card p-8 transition-all hover:border-primary/30 hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined mb-5 text-4xl text-primary">
                  {d.icon}
                </span>
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
            <h2 className="font-display-lg text-4xl font-bold text-text-primary md:text-5xl">
              Our process
            </h2>
            <p className="mt-4 text-text-secondary">
              Six phases. No surprises.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 gap-px bg-surface-border md:grid-cols-3 lg:grid-cols-6">
            {process.map((step, i) => (
              <FadeIn key={step.label} delay={i * 0.07}>
                <div className="group bg-surface-container-lowest p-8 transition-colors hover:bg-surface-container-low">
                  <div className="mb-4 font-mono text-4xl font-bold text-primary/20 transition-colors group-hover:text-primary/40">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mb-2 font-bold text-text-primary">
                    {step.label}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {step.detail}
                  </div>
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
                <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                  Ready to organize your pipeline?
                </h2>
                <p className="mb-8 max-w-xl opacity-80">
                  Tell us how your sales process works today. We&apos;ll tell
                  you how we&apos;d set it up — free, in 15 minutes.
                </p>
                <Link
                  href="/book-a-call/"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-label-md text-primary-container transition-all hover:scale-105"
                >
                  Book a Free Call
                  <span className="material-symbols-outlined text-[18px]">
                    phone_in_talk
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
