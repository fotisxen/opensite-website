import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CheckList from "@/components/greek/CheckList";
import GreekFrame from "@/components/greek/GreekFrame";
import { CtaBand, greekMetadata, SECTION } from "@/components/greek/pieces";
import WorkShot from "@/components/landing/WorkShot";
import HeroGlow from "@/components/greek/HeroGlow";
import Reveal from "@/components/landing/Reveal";
import Link from "next/link";
import { getGreekCase, greekCases } from "@/lib/greek";

export function generateStaticParams() {
  return greekCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getGreekCase(slug);
  if (!c) return {};
  return greekMetadata({
    title: `${c.name}: ${c.field} | OpenSite`,
    description: c.intro,
    path: `/el/ergasies/${c.slug}/`,
    enPath: `/case-studies/${c.slug}/`,
  });
}

export default async function GreekCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getGreekCase(slug);
  if (!c) notFound();

  return (
    <GreekFrame>
      <section className={`relative isolate ${SECTION} pb-8 pt-10 lg:pt-16`}>
        <HeroGlow />
        <Link href="/el/ergasies/" className="font-label-md text-label-md text-primary underline underline-offset-4">
          Όλες οι δουλειές
        </Link>
        <p className="mt-6 font-label-md text-label-md text-text-secondary">
          {c.field} · {c.platform}
        </p>
        <h1 className="mt-1 max-w-3xl font-display-lg text-[30px] font-bold leading-[1.15] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          {c.name}
        </h1>
        <p className="mt-4 max-w-2xl font-body-lg text-base text-text-secondary lg:text-lg">{c.intro}</p>
        {c.link && (
          <a
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-label-md text-label-md text-primary underline underline-offset-4"
          >
            Δες το site
          </a>
        )}
      </section>

      {c.image && (
        <section className={`${SECTION} pb-10`}>
          <div className="rise-in overflow-hidden rounded-2xl border border-surface-border shadow-2xl shadow-primary-container/10">
            <WorkShot src={c.image.src} alt={c.image.alt ?? `Screenshot: ${c.name}`} width={c.image.width} height={c.image.height} />
          </div>
        </section>
      )}

      <section className="border-y border-surface-border bg-surface-container-lowest py-12">
        <div className={`${SECTION} grid gap-10 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Τι χρειαζόταν</h2>
            <div className="mt-4">
              <CheckList items={c.problem} />
            </div>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Τι φτιάξαμε</h2>
            <ul data-stagger className="mt-4 grid gap-3 sm:grid-cols-2">
              {c.built.map((b) => (
                <li key={b.title} className="lift rounded-xl border border-surface-border bg-surface-card p-4">
                  <h3 className="font-label-md text-label-md font-semibold text-text-primary">{b.title}</h3>
                  <p className="mt-0.5 font-body-md text-body-md text-text-secondary">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand title="Θέλεις κάτι αντίστοιχο;" text="Πες μας τι χρειάζεσαι και σου στέλνουμε προσφορά με τιμή και ημερομηνία παράδοσης." />
    </GreekFrame>
  );
}
