import LandingPage, { landingMetadata } from "@/components/landing/LandingPage";

export const metadata = landingMetadata("eshop");

export default function Page() {
  return <LandingPage pageKey="eshop" />;
}
