import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  alternates: { canonical: "https://opensite.gr/services/", languages: { en: "https://opensite.gr/services/", el: "https://opensite.gr/el/ypiresies/" } },
};

export default function Page() {
  return <ServicesPage />;
}
