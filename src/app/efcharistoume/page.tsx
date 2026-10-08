import type { Metadata } from "next";
import LandingFrame from "@/components/landing/LandingFrame";
import ThanksContent from "@/components/landing/ThanksContent";

export const metadata: Metadata = {
  title: { absolute: "Ευχαριστούμε | OpenSite" },
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <LandingFrame>
      <ThanksContent />
    </LandingFrame>
  );
}
