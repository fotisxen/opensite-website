import Link from "next/link";
import GreekFrame from "@/components/greek/GreekFrame";
import GreekHeroScene from "@/components/greek/GreekHeroScene";
import HeroGlow from "@/components/greek/HeroGlow";
import TechMarquee from "@/components/greek/TechMarquee";
import Icon from "@/components/Icon";
import { CaseCard, CtaBand, greekMetadata, SECTION } from "@/components/greek/pieces";
import { AltContactLine } from "@/components/landing/ContactButtons";
import Reveal from "@/components/landing/Reveal";
import { greekCases, greekServices, greekSteps, greekWhy } from "@/lib/greek";
import { BASE_URL, testimonial } from "@/lib/landing";
import { siteConfig } from "@/lib/site.config";

export const metadata = greekMetadata({
  title: "OpenSite | Κατασκευή ιστοσελίδων και e-shop στη Θεσσαλονίκη",
  description:
    "Στούντιο ανάπτυξης ιστοσελίδων στη Θεσσαλονίκη. Ιστοσελίδες, e-shop, ανακατασκευές, CRM και εφαρμογές. Μιλάς απευθείας με τον developer.",
  path: "/el/",
  enPath: "/",
});

const featured = ["akinita-fotiadis", "df-real-estate", "one-menoo"].map((slug) =>
  greekCases.find((c) => c.slug === slug),
);

export default function GreekHome() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "OpenSite",
    url: `${BASE_URL}/el/`,
    telephone: siteConfig.phone.e164,
    email: siteConfig.email,
    areaServed: { "@type": "City", name: "Θεσσαλονίκη" },
    address: { "@type": "PostalAddress", addressLocality: "Θεσσαλονίκη", addressCountry: "GR" },
  };

  return (
    <GreekFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* First screen: the text is visible from the start (it only slides a
          little); the 3D scene loads after first paint. */}
      <section className={`relative isolate ${SECTION} grid items-center gap-8 pb-20 pt-10 lg:grid-cols-2 lg:pb-28 lg:pt-16`}>
        <HeroGlow />
        <div className="rise-in">
        <h1 className="max-w-3xl font-display-lg text-[32px] font-bold leading-[1.12] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
          Ιστοσελίδες και e‑shop που φέρνουν πελάτες.
        </h1>
        <p className="mt-5 max-w-2xl font-body-lg text-base text-text-secondary lg:text-lg">
          Το OpenSite είναι στούντιο ανάπτυξης ιστοσελίδων στη Θεσσαλονίκη. Μιλάς απευθείας με τον developer που φτιάχνει το
          site σου.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link
            href="/el/epikoinonia/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary-container px-6 font-label-md text-label-md text-white transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            Ζήτα δωρεάν προσφορά
          </Link>
          <AltContactLine />
        </div>
        </div>
        <GreekHeroScene />
      </section>

      <TechMarquee />

      <section className="border-b border-surface-border bg-surface-container-lowest py-14">
        <Reveal className={SECTION}>
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Τι φτιάχνουμε</h2>
          <ul data-stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {greekServices.map((s) => (
              <li key={s.id} className="lift group rounded-2xl border border-surface-border bg-surface-card p-5">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container/15 text-primary transition-colors group-hover:bg-primary-container group-hover:text-white">
                  <Icon name={s.icon} className="text-[26px]" />
                </span>
                <h3 className="font-headline-sm text-headline-sm font-semibold text-text-primary">{s.title}</h3>
                <p className="mt-1 font-body-md text-body-md text-text-secondary">{s.summary}</p>
                <Link
                  href={`/el/ypiresies/#${s.id}`}
                  className="mt-3 inline-block font-label-md text-label-md text-primary underline underline-offset-4"
                >
                  Περισσότερα
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="py-14">
        <Reveal className={SECTION}>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Δουλειές που έχουμε παραδώσει</h2>
            <Link href="/el/ergasies/" className="font-label-md text-label-md text-primary underline underline-offset-4">
              Όλες οι δουλειές
            </Link>
          </div>
          <div data-stagger className="mt-6 grid gap-5 md:grid-cols-3">
            {featured.map((c) => (c ? <CaseCard key={c.slug} c={c} /> : null))}
          </div>
        </Reveal>
      </section>

      <section className="border-y border-surface-border bg-surface-container-lowest py-14">
        <Reveal className={SECTION}>
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Γιατί OpenSite</h2>
          <ul data-stagger className="mt-6 grid gap-5 md:grid-cols-3">
            {greekWhy.map((w) => (
              <li key={w.title} className="lift rounded-2xl border border-surface-border bg-surface-card p-5">
                <h3 className="font-label-md text-label-md font-semibold text-text-primary">{w.title}</h3>
                <p className="mt-2 font-body-md text-body-md text-text-secondary">{w.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="py-14">
        <Reveal className={SECTION}>
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Πώς δουλεύουμε</h2>
          <ol data-stagger className="mt-6 grid gap-5 md:grid-cols-3">
            {greekSteps.map((s, i) => (
              <li key={s.title} className="lift flex gap-4 rounded-2xl border border-surface-border bg-surface-card p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-container font-label-md text-label-md text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-label-md text-label-md font-semibold text-text-primary">{s.title}</h3>
                  <p className="mt-1 font-body-md text-body-md text-text-secondary">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="border-t border-surface-border bg-surface-container-lowest py-14">
        <Reveal className="mx-auto max-w-3xl px-4 md:px-margin-desktop">
          <figure className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface-card p-6 md:p-8">
            <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-10 select-none font-display-lg text-[160px] leading-none text-primary/10">
              ”
            </span>
            <blockquote
              className="font-body-lg text-body-lg italic text-text-primary"
              lang={siteConfig.testimonial.el ? "el" : "en"}
            >
              “{siteConfig.testimonial.el ?? testimonial.en}”
            </blockquote>
            <figcaption className="mt-4 font-body-sm text-body-sm text-text-secondary">
              {testimonial.author}, {testimonial.role}
              {siteConfig.testimonial.el && (
                <span className="mt-1 block text-xs text-text-secondary/80">Μετάφραση από τα αγγλικά</span>
              )}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <CtaBand title="Πες μας τι χρειάζεσαι" text="Απαντάμε μέσα σε 24 ώρες, με πρόταση και χωρίς δέσμευση." />
    </GreekFrame>
  );
}
