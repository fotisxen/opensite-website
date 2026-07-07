// app/page.tsx

import { HomePage } from "@/components/pages/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenSite | Digital Agency for Business Growth",
  description:
    "We build websites and e-shops that turn visitors into customers. Modern digital solutions engineered for real business growth.",
};

export default function Page() {
  return <HomePage />;
}
