"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/FadeIn";

const layers = [
  {
    label: "01",
    title: "Discover",
    desc: "User interviews, competitor teardown, and analytics review. We define what the interface needs to prove before we design a single pixel.",
    restRotate: "-rotate-3",
    restTranslate: "-translate-y-6",
  },
  {
    label: "02",
    title: "Structure",
    desc: "Information architecture and low-fidelity wireframes. The skeleton gets approved before it ever looks finished — cheaper to change now.",
    restRotate: "-rotate-1",
    restTranslate: "-translate-y-3",
  },
  {
    label: "03",
    title: "Visual System",
    desc: "Typography, color, spacing, and component states, built as a reusable system — not a one-off screen that breaks the moment content changes.",
    restRotate: "rotate-1",
    restTranslate: "translate-y-0",
  },
  {
    label: "04",
    title: "Prototype & Test",
    desc: "Clickable prototypes in front of real users. We watch where they hesitate, then fix the interface — not the user.",
    restRotate: "rotate-2",
    restTranslate: "translate-y-3",
  },
  {
    label: "05",
    title: "Handoff",
    desc: "Developer-ready specs, tokens, and an annotated component library. Your engineers get exact values, not a guessing game.",
    restRotate: "rotate-3",
    restTranslate: "translate-y-6",
  },
];

export function UiUxDesignPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      {/* HERO */}
      <section className="relative mx-auto mb-20 max-w-container-max px-margin-mobile pt-12 md:px-margin-desktop">
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

        <FadeIn className="max-w-3xl">
          <span className="mb-stack-md inline-block rounded-full bg-primary/10 px-3 py-1 font-label-sm text-label-sm text-primary">
            UI / UX Design
          </span>

          <h1 className="mb-stack-lg font-display-lg-mobile text-display-lg-mobile leading-[1.1] md:text-display-lg">
            <span className="gradient-text">Interfaces engineered</span>
            <br />
            to be used, not just seen.
          </h1>

          <p className="max-w-2xl font-body-lg text-body-lg text-text-secondary">
            We design the five layers underneath every screen you ship —
            research, structure, system, behavior, and handoff — so what looks
            simple to a user was actually decided on purpose.
          </p>
        </FadeIn>
      </section>

      {/* STACK — NO CURSOR JUMPING VERSION */}
      <section className="mx-auto mb-32 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn delay={0.1}>
          <div className="relative mx-auto flex min-h-[520px] max-w-2xl items-center justify-center py-12">
            {layers.map((layer, i) => {
              const isHovered = active === i;
              const isAnyHovered = active !== null;

              // distance from hovered card
              const distance = isAnyHovered ? i - active : 0;

              // controlled fan spread (key fix)
              const fanOffset = isAnyHovered
                ? distance * 94 // 👈 stronger separation
                : i * 50; // default stacked

              return (
                <div
                  key={layer.title}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className={`
              absolute w-full glass-card rounded-2xl p-stack-lg
              transition-all duration-500 ease-out cursor-pointer
              ${layer.restRotate}
            `}
                  style={{
                    zIndex: isHovered ? 50 : 10 + i,

                    transform: `
                translateY(${fanOffset}px)
                scale(${isHovered ? 1.12 : isAnyHovered ? 0.94 : 1})
              `,

                    opacity: isAnyHovered && !isHovered ? 0.6 : 1,

                    // IMPORTANT: prevents accidental hover flicker
                    pointerEvents: "auto",
                  }}
                >
                  <div className="flex items-start gap-6">
                    <span className="font-headline-md text-headline-md text-primary/40">
                      {layer.label}
                    </span>

                    <div>
                      <h3 className="mb-2 font-headline-sm text-headline-sm">
                        {layer.title}
                      </h3>

                      <p
                        className={`font-body-sm text-text-secondary transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-70"
                        }`}
                      >
                        {layer.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* PRINCIPLES */}
      <section className="mx-auto mb-32 max-w-container-max px-margin-mobile md:px-margin-desktop">
        <FadeIn className="mb-stack-lg max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg">
            How we think about a screen
          </h2>
        </FadeIn>

        <Stagger className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {layers.map((p, i) => (
            <StaggerItem
              key={i}
              className="glass-card rounded-2xl p-8 transition-all hover:border-primary-container/50"
            >
              <span className="font-headline-md text-primary/40">0{i + 1}</span>

              <h3 className="mb-2 font-headline-sm text-headline-sm">
                {p.title}
              </h3>

              <p className="font-body-sm text-text-secondary">{p.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-container-max px-margin-mobile pb-12 md:px-margin-desktop">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-surface-border/50 bg-surface-container p-stack-lg text-center md:p-20">
            <div className="pointer-events-none absolute inset-0 bg-primary/5" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-stack-md font-headline-lg text-headline-lg">
                Let&apos;s design the{" "}
                <span className="text-primary">layer stack.</span>
              </h2>

              <p className="mb-stack-lg font-body-lg text-body-lg text-text-secondary">
                Tell us what you&apos;re building. We&apos;ll tell you honestly
                whether it needs a redesign or a rescue.
              </p>

              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-container px-8 py-4 font-label-md text-label-md text-on-primary-container transition-all hover:opacity-90"
              >
                Start a Project
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
