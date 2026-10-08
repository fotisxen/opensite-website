import LandingPage, { landingMetadata } from "@/components/landing/LandingPage";

export const metadata = landingMetadata("redesign");

export default function Page() {
  return <LandingPage pageKey="redesign" />;
}
