// app/page.tsx

import { HomePage } from "@/components/pages/HomePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenSite | Digital Agency for Business Growth",
  alternates: { canonical: "https://opensite.gr/", languages: { en: "https://opensite.gr/", el: "https://opensite.gr/el/" } },
  description:
    "We build websites and e-shops that turn visitors into customers. Modern digital solutions engineered for real business growth.",
};

// Greek browsers go to the Greek home page, unless the visitor chose English
// with the language switch (see LanguageSwitch). Crawlers without a Greek
// locale stay here; the hreflang pair tells them about the other version.
const GREEK_REDIRECT = `try{var l=navigator.languages||[navigator.language];if(l.some(function(x){return/^el/i.test(x)})&&localStorage.getItem("os_lang")!=="en")location.replace("/el/"+location.search+location.hash)}catch(e){}`;

export default function Page() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: GREEK_REDIRECT }} />
      <HomePage />
    </>
  );
}
