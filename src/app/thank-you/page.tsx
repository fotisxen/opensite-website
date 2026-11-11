import type { Metadata } from "next";
import EnglishLandingFrame from "@/components/landing/EnglishLandingFrame";
import ThanksContentEn from "@/components/landing/ThanksContentEn";

export const metadata: Metadata = {
  title: { absolute: "Thank you | OpenSite" },
  robots: { index: false, follow: false },
};

// English thank-you page for the Cyprus landing page form.
export default function ThankYouPage() {
  return (
    <EnglishLandingFrame>
      <ThanksContentEn />
    </EnglishLandingFrame>
  );
}
