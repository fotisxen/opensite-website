"use client";

import Link from "next/link";
import { useEffect } from "react";
import { consumeLeadSubmitted, trackLead } from "@/lib/tracking";
import ContactButtons from "./ContactButtons";

const PHONE_INTL = "+30 698 449 6660";

export default function ThanksContentEn() {
  // Same rule as the Greek page: one conversion per real submission.
  useEffect(() => {
    if (consumeLeadSubmitted()) trackLead();
  }, []);

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center md:px-margin-desktop md:py-24">
      <h1 className="font-display-lg text-4xl font-bold tracking-tight text-text-primary">Got it, thank you.</h1>
      <p className="mt-4 font-body-lg text-body-lg text-text-secondary">
        We will call you within 24 hours from {PHONE_INTL}. If you are in a hurry, call us now.
      </p>
      <ContactButtons phoneLabel={`Call ${PHONE_INTL}`} className="mt-8 justify-center" />
      <p className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 font-label-md text-label-md">
        <Link href="/case-studies/" className="text-primary underline underline-offset-4">
          See our work
        </Link>
        <Link href="/web-design-cyprus/" className="text-primary underline underline-offset-4">
          Back to the page
        </Link>
      </p>
    </section>
  );
}
