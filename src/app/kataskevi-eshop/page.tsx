import LandingPage, { landingMetadata } from "@/components/landing/LandingPage";

export const metadata = landingMetadata("eshopGreece");

export default function Page() {
  return <LandingPage pageKey="eshopGreece" />;
}
