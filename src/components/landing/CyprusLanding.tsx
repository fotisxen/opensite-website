import type { Metadata } from "next";
import HeroGlow from "@/components/greek/HeroGlow";
import { getCaseStudy } from "@/lib/case-studies";
import { BASE_URL, googleReviews, testimonial } from "@/lib/landing";
import { phoneHref, siteConfig, viberHref, whatsappHref } from "@/lib/site.config";
import LeadForm from "./LeadForm";
import EnglishLandingFrame from "./EnglishLandingFrame";
import Reveal from "./Reveal";
import WorkShot from "./WorkShot";

// English landing page for the Google Ads test in Cyprus, where people search
// for web design in English. It sits inside EnglishLandingFrame (no site menu).

export const CYPRUS_PATH = "/web-design-cyprus/";
const PHONE_INTL = "+30 698 449 6660";

export const cyprusMetadata: Metadata = {
  title: { absolute: "Web Design for Businesses in Cyprus | OpenSite" },
  description:
    "Websites and e-shops for businesses in Cyprus. Fast on mobile and Google. See a free sample of your new homepage first, with a reply within 24 hours.",
  alternates: { canonical: `${BASE_URL}${CYPRUS_PATH}` },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: `${BASE_URL}${CYPRUS_PATH}`,
    title: "Web Design for Businesses in Cyprus | OpenSite",
    description: "Websites and e-shops for businesses in Cyprus. See a free sample of your new homepage first.",
    siteName: "OpenSite",
  },
};

const gets = [
  "A free sample of your new homepage, before you decide anything.",
  "You talk directly to the developer who builds your site.",
  "A written quote with the price and delivery date, before work starts.",
];

const work = [
  {
    slug: "platterie-box",
    name: "The Platterie Box",
    blurb: "Storytelling website for a deli and wine room: the story behind every platter, from the small producers to the table.",
  },
  {
    slug: "adonis-sail-yachts",
    name: "Adonis Sail Yachts",
    blurb: "Yacht charters since 2000. Visitors see the boats and get to the booking request easily.",
  },
  {
    slug: "df-real-estate",
    name: "DF Real Estate",
    blurb: "Real estate agency. Every property has its own page, in two languages, and listings go to the property portal automatically.",
  },
  {
    slug: "one-menoo",
    name: "OneMenoo",
    blurb: "QR menu platform for restaurants. The slow site was rebuilt; it now loads in under 2 seconds and has passed 45,000 scans.",
  },
  {
    slug: "akinita-fotiadis",
    name: "Akinita Fotiadis",
    blurb: "Real estate agency. The old site was slow; the new one is fast and leads visitors to get in touch.",
  },
];

const steps = [
  "You tell us what you need.",
  "You see a free sample, with no commitment.",
  "If you like it, you get a written quote and approve the site before it goes live.",
];

const faqs = [
  {
    q: "Do you work with businesses in Cyprus?",
    a: "Yes. We work remotely, by phone, video call and email, in English or Greek. You see every step online before anything goes live.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on how many pages and features you need. After the free sample you get a written quote with the price and delivery date, before we start.",
  },
  {
    q: "What do you need from me to start?",
    a: "The texts, photos and logo you have. If something is missing, we say so in the quote.",
  },
  {
    q: "I already have a website. Can you rebuild it?",
    a: "Yes. You keep your domain and content, and the speed, design and mobile experience change.",
  },
  {
    q: "What about the domain and hosting?",
    a: "They stay in your name. Their cost is separate from the build and is written in the quote.",
  },
  { q: "Do you issue invoices?", a: "Yes, for every project." },
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mt-0.5 shrink-0 text-secondary">
      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}

function ContactLine() {
  return (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-body-md text-body-md text-text-secondary">
      <span>
        or call{" "}
        <a href={phoneHref} className="whitespace-nowrap font-semibold text-text-primary underline decoration-primary/60 underline-offset-4">
          {PHONE_INTL}
        </a>
      </span>
      {siteConfig.phone.viber === true && (
        <a href={viberHref} className="text-primary underline underline-offset-4">
          Viber
        </a>
      )}
      {siteConfig.phone.whatsapp === true && (
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
          WhatsApp
        </a>
      )}
    </p>
  );
}

export default function CyprusLanding() {
  const cards = work.map((w) => {
    const cs = getCaseStudy(w.slug);
    return { ...w, image: cs?.image ?? null, url: cs?.liveUrl ?? null };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "OpenSite",
    url: `${BASE_URL}${CYPRUS_PATH}`,
    telephone: siteConfig.phone.e164,
    email: siteConfig.email,
    areaServed: { "@type": "Country", name: "Cyprus" },
    address: { "@type": "PostalAddress", addressLocality: "Thessaloniki", addressCountry: "GR" },
  };

  return (
    <EnglishLandingFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative isolate mx-auto max-w-container-max px-4 pb-10 pt-6 md:px-margin-desktop lg:pt-14">
        <HeroGlow />
        <div className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-6">
          <div className="lg:col-start-1 lg:row-start-1">
            <h1 className="font-display-lg text-[28px] font-bold leading-[1.15] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Web design for businesses in Cyprus
            </h1>
            <p className="mt-3 font-body-lg text-base text-text-secondary lg:text-lg">
              Fast, clean websites and e-shops that work properly on mobile and on Google. See a free sample of your new homepage before
              you decide anything.
            </p>
            <p className="mt-3 font-label-md text-label-md text-text-primary">
              <span aria-hidden="true" className="text-amber-400">★</span> {googleReviews.rating.replace(",", ".")}/5 · {googleReviews.count} Google
              reviews
            </p>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <LeadForm
              lang="en"
              pageKey="cyprus"
              pageLabel="Κύπρος (EN)"
              title="See your new website for free"
              submitLabel="Get my free sample"
              defaultNeed="Νέα ιστοσελίδα"
            />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <ContactLine />
          </div>
        </div>
      </section>

      <section className="border-y border-surface-border bg-surface-container-lowest py-14">
        <Reveal className="mx-auto max-w-container-max px-4 md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">What you get</h2>
          <ul data-stagger className="mt-6 grid gap-5 md:grid-cols-3">
            {gets.map((text) => (
              <li key={text} className="lift flex gap-3 rounded-2xl border border-surface-border bg-surface-card p-5 text-text-primary">
                <CheckIcon />
                <span className="font-body-md text-body-md">{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="py-14">
        <Reveal className="mx-auto max-w-container-max px-4 md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Work we have delivered</h2>
          <div data-stagger className="mt-6 grid gap-5 sm:grid-cols-2">
            {cards.map((card, i) => (
              <article
                key={card.slug}
                // With an odd number of cards the newest one gets the full row.
                className={`lift overflow-hidden rounded-2xl border border-surface-border bg-surface-card ${
                  i === 0 && cards.length % 2 === 1 ? "sm:col-span-2" : ""
                }`}
              >
                {card.image && <WorkShot src={card.image} alt={`Screenshot: ${card.name}`} width={800} height={500} />}
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
                      See the website
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-t border-surface-border bg-surface-container-lowest py-14">
        <Reveal className="mx-auto max-w-3xl px-4 md:px-margin-desktop">
          <figure className="rounded-2xl border border-surface-border bg-surface-card p-6 md:p-8">
            <blockquote className="font-body-lg text-body-lg text-text-primary">&ldquo;{testimonial.en}&rdquo;</blockquote>
            <figcaption className="mt-4">
              <span className="block font-label-md text-label-md text-text-primary">{testimonial.author}</span>
              <span className="block font-body-sm text-body-sm text-text-secondary">{testimonial.role}</span>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="py-14">
        <Reveal className="mx-auto max-w-container-max px-4 md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">How we work</h2>
          <ol data-stagger className="mt-6 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step} className="lift flex gap-4 rounded-2xl border border-surface-border bg-surface-card p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-container font-label-md text-label-md text-white">
                  {i + 1}
                </span>
                <span className="font-body-md text-body-md text-text-primary">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="border-t border-surface-border bg-surface-container-lowest py-14">
        <Reveal className="mx-auto max-w-3xl px-4 md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Questions</h2>
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

      <section className="border-t border-surface-border py-16">
        <Reveal className="mx-auto max-w-2xl px-4 text-center md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Tell us what you need</h2>
          <p className="mt-3 font-body-lg text-body-lg text-text-secondary">Send the form and we reply within 24 hours.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#lead-form"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary-container px-6 font-label-md text-label-md text-white"
            >
              Get my free sample
            </a>
            <a
              href={phoneHref}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-surface-border bg-surface-container-high px-6 font-label-md text-label-md text-text-primary"
            >
              Call {PHONE_INTL}
            </a>
          </div>
        </Reveal>
      </section>
    </EnglishLandingFrame>
  );
}
