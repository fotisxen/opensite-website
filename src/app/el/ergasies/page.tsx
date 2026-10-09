import GreekFrame from "@/components/greek/GreekFrame";
import { CaseCard, CtaBand, greekMetadata, PageHero, SECTION } from "@/components/greek/pieces";
import { greekCases } from "@/lib/greek";

export const metadata = greekMetadata({
  title: "Δουλειές | OpenSite, Θεσσαλονίκη",
  description:
    "Ιστοσελίδες, διαχειριστικά, intranet και εφαρμογές που έχουμε φτιάξει: Ακίνητα Φωτιάδης, DF Real Estate, Adonis Sail Yachts, OneMenoo, Star Bulk, HoopStruct.",
  path: "/el/ergasies/",
  enPath: "/case-studies/",
});

export default function GreekWork() {
  return (
    <GreekFrame>
      <PageHero
        title="Δουλειές που έχουμε παραδώσει"
        text="Επιλεγμένα έργα, με το τι χρειαζόταν και τι φτιάξαμε για το καθένα."
      />
      <section className="pb-14">
        <div className={`${SECTION} grid gap-5 sm:grid-cols-2 lg:grid-cols-3`}>
          {greekCases.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </div>
      </section>
      <CtaBand title="Θέλεις κάτι αντίστοιχο;" text="Πες μας τι χρειάζεσαι και σου στέλνουμε προσφορά με τιμή και ημερομηνία παράδοσης." />
    </GreekFrame>
  );
}
