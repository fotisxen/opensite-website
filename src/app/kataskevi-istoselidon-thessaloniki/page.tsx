import LandingPage, { landingMetadata } from "@/components/landing/LandingPage";

export const metadata = landingMetadata("web");

export default function Page() {
  return <LandingPage pageKey="web" />;
}
