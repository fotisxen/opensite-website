import GreekFrame from "@/components/greek/GreekFrame";
import { greekMetadata } from "@/components/greek/pieces";
import LegalContent from "@/components/legal/LegalContent";
import { privacyDoc } from "@/lib/legal";

export const metadata = greekMetadata({
  title: "Πολιτική απορρήτου | OpenSite",
  description:
    "Ποια προσωπικά δεδομένα συλλέγει το opensite.gr, γιατί, πού πηγαίνουν και ποια δικαιώματα έχεις.",
  path: "/el/politiki-aporritou/",
  enPath: "/privacy-policy/",
});

export default function GreekPrivacy() {
  return (
    <GreekFrame>
      <div className="mx-auto max-w-4xl px-4 pb-20 pt-10 md:px-margin-desktop lg:pt-16">
        <LegalContent doc={privacyDoc("el")} />
      </div>
    </GreekFrame>
  );
}
