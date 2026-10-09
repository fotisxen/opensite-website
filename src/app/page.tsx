// app/page.tsx

import { HomePage } from "@/components/pages/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenSite | Digital Agency for Business Growth",
  alternates: { canonical: "https://opensite.gr/", languages: { en: "https://opensite.gr/", el: "https://opensite.gr/el/" } },
  description:
    "We build websites and e-shops that turn visitors into customers. Modern digital solutions engineered for real business growth.",
};

export default function Page() {
  return <HomePage />;
}
