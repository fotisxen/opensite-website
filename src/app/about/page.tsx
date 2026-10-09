import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "https://opensite.gr/about/", languages: { en: "https://opensite.gr/about/", el: "https://opensite.gr/el/schetika/" } },
};

export default function Page() {
  return <AboutPage />;
}
