import Link from "next/link";
import GreekFrame from "@/components/greek/GreekFrame";
import { CtaBand, greekMetadata, PageHero, SECTION } from "@/components/greek/pieces";
import CheckList from "@/components/greek/CheckList";
import Reveal from "@/components/landing/Reveal";
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

      <div className="border-t border-surface-border">
        {greekServices.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`scroll-mt-20 py-12 ${i % 2 === 1 ? "bg-surface-container-lowest" : ""} ${i > 0 ? "border-t border-surface-border" : ""}`}
          >
            <Reveal className={`${SECTION} grid gap-6 lg:grid-cols-2 lg:gap-16`}>
              <div>
                <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">{s.title}</h2>
                <p className="mt-2 font-body-md text-body-md text-text-secondary">{s.summary}</p>
                {s.landing && (
                  <Link
                    href={`${s.landing}/`}
                    className="mt-4 inline-block font-label-md text-label-md text-primary underline underline-offset-4"
                  >
                    Δες τη σελίδα και ζήτα προσφορά
                  </Link>
                )}
              </div>
              <CheckList items={s.points} />
            </Reveal>
          </section>
        ))}
      </div>

      <CtaBand title="Δεν ξέρεις τι ταιριάζει;" text="Πες μας τι θέλεις να πετύχεις και σου προτείνουμε τι χρειάζεται." />
    </GreekFrame>
  );
}
