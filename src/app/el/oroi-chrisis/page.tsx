import GreekFrame from "@/components/greek/GreekFrame";
import { greekMetadata } from "@/components/greek/pieces";
import LegalContent from "@/components/legal/LegalContent";
import { termsDoc } from "@/lib/legal";

export const metadata = greekMetadata({
  title: "Όροι χρήσης | OpenSite",
  description: "Οι όροι χρήσης του opensite.gr και τα στοιχεία της επιχείρησης.",
  path: "/el/oroi-chrisis/",
  enPath: "/terms-of-service/",
});

export default function GreekTerms() {
  return (
    <GreekFrame>
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-10 md:px-margin-desktop lg:pt-16">
        <LegalContent doc={termsDoc("el")} />
      </div>
    </GreekFrame>
  );
}
