import GreekFrame from "@/components/greek/GreekFrame";
import { CtaBand, greekMetadata, PageHero, SECTION } from "@/components/greek/pieces";
import { greekSteps, greekWhy } from "@/lib/greek";

export const metadata = greekMetadata({
  title: "Σχετικά | OpenSite, Θεσσαλονίκη",
  description:
    "Το OpenSite είναι στούντιο ανάπτυξης ιστοσελίδων στη Θεσσαλονίκη. Μιλάς απευθείας με τον developer που φτιάχνει το site σου.",
  path: "/el/schetika/",
  enPath: "/about/",
});

export default function GreekAbout() {
  return (
    <GreekFrame>
      <PageHero
        title="Σχετικά με το OpenSite"
        text="Στούντιο ανάπτυξης ιστοσελίδων στη Θεσσαλονίκη. Μιλάς απευθείας με τον developer που φτιάχνει το site σου."
      />

      <section className="border-y border-surface-border bg-surface-container-lowest py-12">
        <div className={`${SECTION} grid gap-5 md:grid-cols-3`}>
          {greekWhy.map((w) => (
            <div key={w.title} className="rounded-2xl border border-surface-border bg-surface-card p-5">
              <h2 className="font-label-md text-label-md font-semibold text-text-primary">{w.title}</h2>
              <p className="mt-2 font-body-md text-body-md text-text-secondary">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className={SECTION}>
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">Πώς δουλεύουμε</h2>
          <ol className="mt-6 grid gap-5 md:grid-cols-3">
            {greekSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-surface-border bg-surface-card p-5">
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
        </div>
      </section>

      <CtaBand title="Ας μιλήσουμε" text="Πες μας τι χρειάζεσαι. Απαντάμε μέσα σε 24 ώρες." />
    </GreekFrame>
  );
}
