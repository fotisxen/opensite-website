import Link from "next/link";
import CheckList from "@/components/greek/CheckList";
import GreekFrame from "@/components/greek/GreekFrame";
import { CtaBand, greekMetadata, PageHero, SECTION } from "@/components/greek/pieces";
import Icon from "@/components/Icon";
import Reveal from "@/components/landing/Reveal";
import WorkShot from "@/components/landing/WorkShot";
import { greekServices } from "@/lib/greek";

export const metadata = greekMetadata({
  title: "Υπηρεσίες | OpenSite, Θεσσαλονίκη",
  description:
    "Ιστοσελίδες, e-shop, ανακατασκευή site, CRM, intranet SharePoint, εφαρμογές desktop και mobile και SEO. Στούντιο στη Θεσσαλονίκη.",
  path: "/el/ypiresies/",
  enPath: "/services/",
});

export default function GreekServices() {
  return (
    <GreekFrame>
      <PageHero
        title="Τι φτιάχνουμε"
        text="Από μια απλή ιστοσελίδα μέχρι εφαρμογές και εσωτερικά συστήματα. Σε κάθε έργο μιλάς με τον ίδιο άνθρωπο, από την πρώτη κουβέντα μέχρι την παράδοση."
      />

      {/* Quick jump to each service */}
      <nav aria-label="Υπηρεσίες" className={`${SECTION} pb-10`}>
        <ul data-stagger className="flex flex-wrap gap-2">
          {greekServices.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="lift inline-flex min-h-[40px] items-center gap-2 rounded-full border border-surface-border bg-surface-card px-4 font-label-md text-label-md text-text-primary"
              >
                <Icon name={s.icon} className="text-[18px] text-primary" />
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-surface-border">
        {greekServices.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`scroll-mt-20 py-14 ${i % 2 === 1 ? "bg-surface-container-lowest" : ""} ${i > 0 ? "border-t border-surface-border" : ""}`}
          >
            <Reveal className={`${SECTION} grid items-center gap-8 lg:grid-cols-2 lg:gap-16`}>
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container/15 text-primary">
                  <Icon name={s.icon} className="text-[26px]" />
                </span>
                <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">{s.title}</h2>
                <p className="mt-2 font-body-md text-body-md text-text-secondary">{s.summary}</p>
                <div className="mt-5">
                  <CheckList items={s.points} />
                </div>
                {s.landing && (
                  <Link
                    href={`${s.landing}/`}
                    className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary-container px-5 font-label-md text-label-md text-white transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                    Ζήτα προσφορά
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </Link>
                )}
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                {s.image ? (
                  <div className="lift lift-zoom overflow-hidden rounded-2xl border border-surface-border shadow-2xl shadow-primary-container/10">
                    <WorkShot src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} />
                  </div>
                ) : (
                  // No delivered project to show yet: a graphic, not a fake screenshot.
                  <div className="relative flex aspect-[8/5] items-center justify-center overflow-hidden rounded-2xl border border-surface-border bg-surface-card">
                    <div className="glow-a absolute h-48 w-48 rounded-full bg-primary-container/30 blur-[70px]" />
                    <Icon name={s.icon} className="relative text-[120px] text-primary/80" />
                  </div>
                )}
              </div>
            </Reveal>
          </section>
        ))}
      </div>

      <CtaBand title="Δεν ξέρεις τι ταιριάζει;" text="Πες μας τι θέλεις να πετύχεις και σου προτείνουμε τι χρειάζεται." />
    </GreekFrame>
  );
}
