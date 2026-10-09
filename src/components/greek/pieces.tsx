import type { Metadata } from "next";
import Link from "next/link";
import ContactButtons from "@/components/landing/ContactButtons";
import Reveal from "@/components/landing/Reveal";
import WorkShot from "@/components/landing/WorkShot";
import { BASE_URL } from "@/lib/landing";
import type { GreekCase } from "@/lib/greek";

// Title, canonical, hreflang pair and Greek Open Graph for a Greek page.
// `enPath` is the English twin; it is the hreflang partner of this page.
export function greekMetadata({
  title,
  description,
  path,
  enPath,
}: {
  title: string;
  description: string;
  path: string; // e.g. "/el/ypiresies/"
  enPath: string; // e.g. "/services/"
}): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { el: url, en: `${BASE_URL}${enPath}` },
    },
    openGraph: { type: "website", locale: "el_GR", url, title, description, siteName: "OpenSite" },
  };
}

export const SECTION = "mx-auto max-w-container-max px-4 md:px-margin-desktop";

export function PageHero({ title, text }: { title: string; text: string }) {
  return (
    <section className={`${SECTION} pb-10 pt-10 lg:pt-16`}>
      <h1 className="max-w-3xl font-display-lg text-[30px] font-bold leading-[1.15] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl font-body-lg text-base text-text-secondary lg:text-lg">{text}</p>
    </section>
  );
}

export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="border-t border-surface-border bg-surface-container-lowest py-14">
      <Reveal className={SECTION}>
        <div className="rounded-2xl border border-surface-border bg-surface-card p-6 md:p-10">
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">{title}</h2>
          <p className="mt-2 max-w-2xl font-body-md text-body-md text-text-secondary">{text}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/el/epikoinonia/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary-container px-6 font-label-md text-label-md text-white transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Ζήτα δωρεάν προσφορά
            </Link>
          </div>
          <p className="mt-4 font-body-md text-body-md text-text-secondary">ή κάλεσε</p>
          <ContactButtons phoneLabel="Κάλεσε τώρα" className="mt-2" />
        </div>
      </Reveal>
    </section>
  );
}

export function CaseCard({ c }: { c: GreekCase }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-surface-border bg-surface-card">
      {c.image && (
        <Link href={`/el/ergasies/${c.slug}/`} tabIndex={-1} aria-hidden="true">
          <WorkShot src={c.image.src} alt={c.image.alt ?? `Screenshot: ${c.name}`} width={c.image.width} height={c.image.height} />
        </Link>
      )}
      <div className="p-5">
        <p className="font-label-sm text-label-sm text-text-secondary">
          {c.field} · {c.platform}
        </p>
        <h3 className="mt-1 font-headline-sm text-headline-sm font-semibold text-text-primary">{c.name}</h3>
        <p className="mt-1 font-body-md text-body-md text-text-secondary">{c.intro}</p>
        <Link
          href={`/el/ergasies/${c.slug}/`}
          className="mt-3 inline-block font-label-md text-label-md text-primary underline underline-offset-4"
        >
          Δες την περίπτωση
        </Link>
      </div>
    </article>
  );
}
