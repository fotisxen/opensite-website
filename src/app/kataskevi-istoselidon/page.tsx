import LandingPage, { landingMetadata } from "@/components/landing/LandingPage";

export const metadata = landingMetadata("webGreece");

export default function Page() {
  return <LandingPage pageKey="webGreece" />;
}
