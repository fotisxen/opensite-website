"use client";

import { useEffect } from "react";
import { phoneHref, siteConfig } from "@/lib/site.config";
import { consumeLeadSubmitted, trackLead } from "@/lib/tracking";
import ContactButtons from "./ContactButtons";

export default function ThanksContent() {
  // The conversion is counted once per real submission. A reload or a
  // direct visit finds the in-memory flag empty and counts nothing.
  useEffect(() => {
    if (consumeLeadSubmitted()) trackLead();
  }, []);

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center md:px-margin-desktop md:py-24">
      <h1 className="font-display-lg text-4xl font-bold tracking-tight text-text-primary">Το λάβαμε.</h1>
      <p className="mt-4 font-body-lg text-body-lg text-text-secondary">
        Θα σε καλέσουμε μέσα σε 24 ώρες από το{" "}
        <a href={phoneHref} className="whitespace-nowrap text-text-primary underline underline-offset-4">
          {siteConfig.phone.display}
        </a>
        . Αν βιάζεσαι, κάλεσέ μας τώρα.
      </p>
      <ContactButtons phoneLabel={`Κάλεσε ${siteConfig.phone.display}`} className="mt-8 justify-center" />
    </section>
  );
}
