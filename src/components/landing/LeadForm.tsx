"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LEAD_FORM_ID, LEAD_NAME_ID } from "@/lib/leadForm";
import { saveLeadToCrm, sendLead } from "@/lib/sendLead";
import { phoneHref, siteConfig } from "@/lib/site.config";
import { getAttribution, hasConsent, markLeadSubmitted } from "@/lib/tracking";

export type { LandingKey } from "@/lib/landing";
import type { LandingKey } from "@/lib/landing";

const NEEDS = ["Νέα ιστοσελίδα", "Eshop", "Ανακατασκευή site", "Κάτι άλλο"] as const;

// Form copy per language. The English version serves the Cyprus page; the lead
// email and the CRM note stay in Greek, since they are read by us.
const COPY = {
  el: {
    name: "Όνομα",
    phone: "Τηλέφωνο",
    need: "Τι χρειάζεστε",
    website: "Το site σας",
    websitePlaceholder: "π.χ. example.gr",
    needs: NEEDS,
    nameError: "Γράψτε το όνομά σας.",
    phoneError: "Γράψτε ένα τηλέφωνο με τουλάχιστον 10 ψηφία.",
    phoneMinDigits: 10,
    sending: "Αποστολή…",
    failed: "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή καλέστε μας στο",
    reply: "Απαντάμε μέσα σε 24 ώρες. Χωρίς δέσμευση.",
    privacy: "Χρησιμοποιούμε τα στοιχεία σας μόνο για να σας απαντήσουμε.",
    privacyLink: "Πολιτική απορρήτου",
    privacyHref: "/el/politiki-aporritou/",
    thanksPath: "/efcharistoume/",
  },
  en: {
    name: "Name",
    phone: "Phone",
    need: "What do you need?",
    website: "Your website",
    websitePlaceholder: "e.g. example.com",
    needs: ["New website", "E-shop", "Website rebuild", "Something else"],
    nameError: "Please enter your name.",
    phoneError: "Please enter a phone number with at least 8 digits.",
    phoneMinDigits: 8,
    sending: "Sending…",
    failed: "Something went wrong. Please try again or call us on",
    reply: "We reply within 24 hours. No commitment.",
    privacy: "We only use your details to reply to you.",
    privacyLink: "Privacy policy",
    privacyHref: "/privacy-policy/",
    thanksPath: "/thank-you/",
  },
} as const;

const inputClass =
  "mt-1.5 block min-h-[44px] w-full rounded-xl border border-surface-border bg-background/60 px-4 py-2.5 text-base text-text-primary outline-none transition-all placeholder:text-text-secondary/40 focus:border-transparent focus:ring-2 focus:ring-primary-container";

// A loose check on purpose: a lead lost to strict validation costs more
// than one wrong number.
// Greek numbers have 10 digits, Cypriot ones 8 (without the country code).
function isValidPhone(raw: string, minDigits: number) {
  const cleaned = raw.replace(/[\s\-()]/g, "").replace(/^\+/, "");
  return /^\d+$/.test(cleaned) && cleaned.length >= minDigits;
}

export default function LeadForm({
  pageKey,
  pageLabel,
  title,
  submitLabel,
  defaultNeed,
  showWebsite = false,
  lang = "el",
}: {
  pageKey: LandingKey | "site" | "cyprus";
  pageLabel: string;
  title: string;
  submitLabel: string;
  defaultNeed: (typeof NEEDS)[number];
  showWebsite?: boolean;
  lang?: keyof typeof COPY;
}) {
  const t = COPY[lang];
  // The options are shown in the page language; the default is picked by position.
  const defaultOption = t.needs[NEEDS.indexOf(defaultNeed)];
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [failed, setFailed] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const need = String(form.get("need") ?? defaultOption);
    const website = String(form.get("website") ?? "").trim();
    const honey = String(form.get("hp_extra") ?? "").trim();

    const next: { name?: string; phone?: string } = {};
    if (name.length < 2) next.name = t.nameError;
    if (!isValidPhone(phone, t.phoneMinDigits)) next.phone = t.phoneError;
    setErrors(next);
    setFailed(false);
    if (next.name || next.phone) return;

    setSending(true);
    try {
      // A filled hidden field usually means a bot, but autofill can fill it
      // for a real person. So the request is still sent, marked as possible
      // spam, and it is not counted as a conversion.
      const attribution = getAttribution(hasConsent());
      const backup = saveLeadToCrm({
        name,
        phone,
        source: pageKey === "cyprus" ? "site_form_cyprus" : "site_form",
        message: [
          honey ? "[πιθανό spam]" : "",
          `Σελίδα: ${pageLabel}`,
          showWebsite ? `Site: ${website || "-"}` : `Χρειάζεται: ${need}`,
          attribution.utm_campaign ? `Καμπάνια: ${attribution.utm_campaign}` : "",
        ].filter(Boolean).join("\n"),
      });
      await sendLead(
        {
          subject: `${honey ? "[πιθανό spam] " : ""}Νέο lead: ${pageLabel}`,
          name,
          phone,
          need,
          website: website || undefined,
          page: pageKey,
          honeypot: honey || undefined,
          ...attribution,
        },
        backup,
      );
      if (!honey) markLeadSubmitted({ phone });
      router.push(t.thanksPath);
    } catch {
      setFailed(true);
      setSending(false);
    }
  }

  return (
    <form
      id={LEAD_FORM_ID}
      onSubmit={handleSubmit}
      noValidate
      className="glass-card rounded-2xl p-5 sm:p-6"
    >
      <h2 className="font-headline-sm text-headline-sm text-text-primary">{title}</h2>

      <label className="mt-3 block font-label-md text-label-md text-text-secondary">
        {t.name}
        <input
          id={LEAD_NAME_ID}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          className={inputClass}
        />
      </label>
      {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}

      <label className="mt-3 block font-label-md text-label-md text-text-secondary">
        {t.phone}
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-invalid={!!errors.phone}
          className={inputClass}
        />
      </label>
      {errors.phone && <p className="mt-1 text-sm text-error">{errors.phone}</p>}

      {showWebsite ? (
        // Rebuild page: the need is known, so the form asks for the site instead.
        <label className="mt-3 block font-label-md text-label-md text-text-secondary">
          {t.website}
          <input
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder={t.websitePlaceholder}
            className={inputClass}
          />
        </label>
      ) : (
        <label className="mt-3 block font-label-md text-label-md text-text-secondary">
          {t.need}
          <select name="need" defaultValue={defaultOption} className={inputClass}>
            {t.needs.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Honeypot: people never see or tab to it. The name means nothing to autofill. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input name="hp_extra" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-4 min-h-[48px] w-full rounded-xl bg-primary-container px-6 py-3 font-label-md text-label-md text-white transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? t.sending : submitLabel}
      </button>

      {failed && (
        <p role="alert" className="mt-3 text-sm text-error">
          {t.failed}{" "}
          <a href={phoneHref} className="underline">
            {lang === "en" ? siteConfig.phone.e164.replace(/^(\+30)(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4") : siteConfig.phone.display}
          </a>
          .
        </p>
      )}

      <p className="mt-3 text-center font-body-sm text-body-sm text-text-secondary">{t.reply}</p>
      <p className="mt-1.5 text-center text-xs text-text-secondary/80">
        {t.privacy}{" "}
        <a href={t.privacyHref} className="underline">
          {t.privacyLink}
        </a>
      </p>
    </form>
  );
}
