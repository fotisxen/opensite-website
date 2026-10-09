import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getCaseStudy } from "@/lib/case-studies";
import {
  BASE_URL,
  landings,
  resolveFaqs,
  steps,
  subtitleWithFacts,
  testimonial,
  workCards,
  type LandingKey,
} from "@/lib/landing";
import { siteConfig } from "@/lib/site.config";
import ContactButtons, { AltContactLine } from "./ContactButtons";
import FocusFormButton from "./FocusFormButton";
import LandingFrame from "./LandingFrame";
import LandingStickyBar from "./LandingStickyBar";
import LeadForm from "./LeadForm";
import Reveal from "./Reveal";
import WorkShot from "./WorkShot";

export function landingMetadata(key: LandingKey): Metadata {
  const c = landings[key];
  const url = `${BASE_URL}/${c.slug}/`;
  return {
    title: { absolute: c.title },
    description: c.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "el_GR",
      url,
      title: c.title,
      description: c.description,
      siteName: "OpenSite",
    },
  };
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mt-0.5 shrink-0 text-secondary">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}

// Only cards with a real screenshot of the delivered site are shown.
const WEBSITE_PROJECTS = ["akinita-fotiadis", "df-real-estate", "adonis-sail-yachts", "one-menoo"];

function getWorkCards() {
  const list =
    siteConfig.landingProjects === 4
      ? WEBSITE_PROJECTS.map((slug) => workCards.find((c) => c.slug === slug)).filter(
          (c): c is NonNullable<typeof c> => !!c,
        )
      : workCards;
  return list
    .map((card) => {
      const defaultShot = path.join(process.cwd(), "public", "work", `${card.slug}.webp`);
      const image =
        card.image ??
        (fs.existsSync(defaultShot)
          ? { src: `/work/${card.slug}.webp`, width: 800, height: 500 }
          : null);
      return {
        ...card,
        image,
        url: card.hideLink ? null : (getCaseStudy(card.slug)?.liveUrl ?? null),
      };
    })
    .filter((c) => c.image || c.textOnly);
}

export default function LandingPage({ pageKey }: { pageKey: LandingKey }) {
  const c = landings[pageKey];
  const url = `${BASE_URL}/${c.slug}/`;
  const faqs = resolveFaqs(c);
  const work = getWorkCards();
  const showWork = work.length >= 2;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "OpenSite",
    url,
    telephone: siteConfig.phone.e164,
    email: siteConfig.email,
    areaServed: { "@type": "City", name: "Θεσσαλονίκη" },
    address: { "@type": "PostalAddress", addressLocality: "Θεσσαλονίκη", addressCountry: "GR" },
  };

  return (
    <LandingFrame withStickyPadding>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* First screen: no entry animation, nothing starts hidden. */}
      <section className="mx-auto max-w-container-max px-4 pb-10 pt-6 md:px-margin-desktop lg:pt-14">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-6">
          <div className="lg:col-start-1 lg:row-start-1">
            <h1 className="font-display-lg text-[28px] font-bold leading-[1.15] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              {c.h1}
            </h1>
            <p className="mt-3 font-body-lg text-base text-text-secondary lg:text-lg">{subtitleWithFacts(c)}</p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <LeadForm
              pageKey={c.key}
              pageLabel={c.pageLabel}
              title={c.formTitle}
              submitLabel={c.submitLabel}
              defaultNeed={c.defaultNeed}
              showWebsite={c.showWebsiteField}
            />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <AltContactLine />
          </div>
        </div>
      </section>

      <section className="border-y border-surface-border bg-surface-container-lowest py-14">
        <Reveal className="mx-auto max-w-container-max px-4 md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Τι παίρνεις</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {c.gets.map((text) => (
              <li key={text} className="flex gap-3 rounded-2xl border border-surface-border bg-surface-card p-5 text-text-primary">
                <CheckIcon />
                <span className="font-body-md text-body-md">{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {showWork && (
        <section className="py-14">
          <Reveal className="mx-auto max-w-container-max px-4 md:px-margin-desktop">
            <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">
              Δουλειές που έχουμε παραδώσει
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {work.map((card) => (
                <article key={card.slug} className="overflow-hidden rounded-2xl border border-surface-border bg-surface-card">
                  {card.image && (
                    <WorkShot
                      src={card.image.src}
                      alt={card.image.alt ?? `Screenshot: ${card.name}`}
                      width={card.image.width}
                      height={card.image.height}
                    />
                  )}
                  <div className="p-5">
                    <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary">{card.name}</h3>
                    <p className="mt-1 font-body-md text-body-md text-text-secondary">{card.blurb}</p>
                    {card.url && (
                      <a
                        href={card.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block font-label-md text-label-md text-primary underline underline-offset-4"
                      >
                        Δες το site
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <section className={`${showWork ? "border-t border-surface-border" : ""} bg-surface-container-lowest py-14`}>
        <Reveal className="mx-auto max-w-3xl px-4 md:px-margin-desktop">
          <figure className="rounded-2xl border border-surface-border bg-surface-card p-6 md:p-8">
            <blockquote className="font-body-lg text-body-lg italic text-text-primary" lang={siteConfig.testimonial.el ? "el" : "en"}>
              &ldquo;{siteConfig.testimonial.el ?? testimonial.en}&rdquo;
            </blockquote>
            <figcaption className="mt-4">
              <span className="block font-label-md text-label-md text-text-primary">{testimonial.author}</span>
              <span className="block font-body-sm text-body-sm text-text-secondary" lang="en">
                {testimonial.role}
              </span>
              {siteConfig.testimonial.el && (
                <span className="mt-1 block text-xs text-text-secondary/80">Μετάφραση από τα αγγλικά</span>
              )}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="py-14">
        <Reveal className="mx-auto max-w-container-max px-4 md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Πώς δουλεύουμε</h2>
          <ol className="mt-6 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-4 rounded-2xl border border-surface-border bg-surface-card p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-container font-label-md text-label-md text-white">
                  {i + 1}
                </span>
                <span className="font-body-md text-body-md text-text-primary">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {faqs.length > 0 && (
        <section className="border-t border-surface-border bg-surface-container-lowest py-14">
          <Reveal className="mx-auto max-w-3xl px-4 md:px-margin-desktop">
            <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Συχνές ερωτήσεις</h2>
            <div className="mt-6 divide-y divide-surface-border rounded-2xl border border-surface-border bg-surface-card">
              {faqs.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-label-md text-label-md text-text-primary">
                    {f.q}
                    <span className="text-primary transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 font-body-md text-body-md text-text-secondary">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      <section className="border-t border-surface-border py-16">
        <Reveal className="mx-auto max-w-2xl px-4 text-center md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Πες μας τι χρειάζεσαι</h2>
          <p className="mt-3 font-body-lg text-body-lg text-text-secondary">
            Στείλε τη φόρμα και σου απαντάμε μέσα σε 24 ώρες.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <FocusFormButton>{c.ctaButton}</FocusFormButton>
            <ContactButtons phoneLabel={`Κάλεσε ${siteConfig.phone.display}`} className="justify-center" />
          </div>
        </Reveal>
      </section>

      <LandingStickyBar requestLabel={c.stickyRequestLabel} />
    </LandingFrame>
  );
}
