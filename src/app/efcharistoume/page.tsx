import type { Metadata } from "next";
import GreekFrame from "@/components/greek/GreekFrame";
import ThanksContent from "@/components/landing/ThanksContent";

export const metadata: Metadata = {
  title: { absolute: "Ευχαριστούμε | OpenSite" },
  robots: { index: false, follow: false },
};

// After the form the visitor is no longer in the ad funnel, so the page uses
// the full Greek frame: menu, language switch and footer, to keep browsing.
export default function ThanksPage() {
  return (
    <GreekFrame>
      <ThanksContent />
    </GreekFrame>
  );
}
