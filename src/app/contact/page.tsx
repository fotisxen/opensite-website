import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "https://opensite.gr/contact/", languages: { en: "https://opensite.gr/contact/", el: "https://opensite.gr/el/epikoinonia/" } },
};

export default function Page() {
  return <ContactPage />;
}
