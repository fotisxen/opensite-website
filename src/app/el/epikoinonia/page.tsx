import GreekFrame from "@/components/greek/GreekFrame";
import { greekMetadata, SECTION } from "@/components/greek/pieces";
import ContactButtons from "@/components/landing/ContactButtons";
import LeadForm from "@/components/landing/LeadForm";
import { siteConfig } from "@/lib/site.config";

export const metadata = greekMetadata({
  title: "Επικοινωνία | OpenSite, Θεσσαλονίκη",
  description: "Ζήτα δωρεάν προσφορά για ιστοσελίδα, e-shop ή εφαρμογή. Απαντάμε μέσα σε 24 ώρες.",
  path: "/el/epikoinonia/",
  enPath: "/contact/",
});

export default function GreekContact() {
  return (
    <GreekFrame>
      <section className={`${SECTION} grid gap-10 pb-14 pt-10 lg:grid-cols-2 lg:gap-16 lg:pt-16`}>
        <div>
          <h1 className="font-display-lg text-[30px] font-bold leading-[1.15] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Πες μας τι χρειάζεσαι
          </h1>
          <p className="mt-4 font-body-lg text-base text-text-secondary lg:text-lg">
            Άφησε όνομα και τηλέφωνο και σε παίρνουμε εμείς. Απαντάμε μέσα σε 24 ώρες.
          </p>
          <div className="mt-8 space-y-4 font-body-md text-body-md text-text-secondary">
            <ContactButtons phoneLabel={`Κάλεσε ${siteConfig.phone.display}`} />
            <p>
              Email:{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-text-primary underline underline-offset-4">
                {siteConfig.email}
              </a>
            </p>
            <p>Θεσσαλονίκη</p>
          </div>
        </div>
        <LeadForm pageKey="site" pageLabel="Επικοινωνία" title="Ζήτα δωρεάν προσφορά" submitLabel="Στείλε το αίτημα" defaultNeed="Κάτι άλλο" />
      </section>
    </GreekFrame>
  );
}
