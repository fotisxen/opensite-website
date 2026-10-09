"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LEAD_FORM_ID, LEAD_NAME_ID } from "@/lib/leadForm";
import { phoneHref, siteConfig } from "@/lib/site.config";
import { getAttribution, hasConsent, markLeadSubmitted } from "@/lib/tracking";

export type LandingKey = "web" | "eshop" | "redesign";

const NEEDS = ["Νέα ιστοσελίδα", "Eshop", "Ανακατασκευή site", "Κάτι άλλο"] as const;

const inputClass =
  "mt-1.5 block min-h-[44px] w-full rounded-xl border border-surface-border bg-background/60 px-4 py-2.5 text-base text-text-primary outline-none transition-all placeholder:text-text-secondary/40 focus:border-transparent focus:ring-2 focus:ring-primary-container";

// A loose check on purpose: a lead lost to strict validation costs more
// than one wrong number.
function isValidPhone(raw: string) {
  const cleaned = raw.replace(/[\s\-()]/g, "").replace(/^\+/, "");
  return /^\d+$/.test(cleaned) && cleaned.length >= 10;
}

export default function LeadForm({
  pageKey,
  pageLabel,
  title,
  submitLabel,
  defaultNeed,
  showWebsite = false,
}: {
  pageKey: LandingKey | "site";
  pageLabel: string;
  title: string;
  submitLabel: string;
  defaultNeed: (typeof NEEDS)[number];
  showWebsite?: boolean;
}) {
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
    const need = String(form.get("need") ?? defaultNeed);
    const website = String(form.get("website") ?? "").trim();
    const honey = String(form.get("company_url") ?? "");

    const next: { name?: string; phone?: string } = {};
    if (name.length < 2) next.name = "Γράψε το όνομά σου.";
    if (!isValidPhone(phone)) next.phone = "Γράψε ένα τηλέφωνο με τουλάχιστον 10 ψηφία.";
    setErrors(next);
    setFailed(false);
    if (next.name || next.phone) return;

    // Bots fill the hidden field. Pretend it worked, send nothing, and do
    // not count a conversion.
    if (honey) {
      router.push("/efcharistoume/");
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Νέο lead: ${pageLabel}`,
          _template: "table",
          name,
          phone,
          need,
          website,
          page: pageKey,
          ...getAttribution(hasConsent()),
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      markLeadSubmitted();
      router.push("/efcharistoume/");
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
        Όνομα
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
        Τηλέφωνο
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

      <label className="mt-3 block font-label-md text-label-md text-text-secondary">
        Τι χρειάζεσαι
        <select name="need" defaultValue={defaultNeed} className={inputClass}>
          {NEEDS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      {showWebsite && (
        <label className="mt-3 block font-label-md text-label-md text-text-secondary">
          Το site σου, αν έχεις
          <input name="website" type="text" inputMode="url" autoComplete="url" className={inputClass} />
        </label>
      )}

      {/* Honeypot: people never see or tab to it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="company_url" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-4 min-h-[48px] w-full rounded-xl bg-primary-container px-6 py-3 font-label-md text-label-md text-white transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Αποστολή…" : submitLabel}
      </button>

      {failed && (
        <p role="alert" className="mt-3 text-sm text-error">
          Κάτι πήγε στραβά. Δοκίμασε ξανά ή κάλεσέ μας στο{" "}
          <a href={phoneHref} className="underline">
            {siteConfig.phone.display}
          </a>
          .
        </p>
      )}

      <p className="mt-3 text-center font-body-sm text-body-sm text-text-secondary">
        Απαντάμε μέσα σε 24 ώρες. Χωρίς δέσμευση.
      </p>
      <p className="mt-1.5 text-center text-xs text-text-secondary/80">
        Χρησιμοποιούμε τα στοιχεία σου μόνο για να σου απαντήσουμε.{" "}
        <a href="/el/politiki-aporritou/" className="underline">
          Πολιτική απορρήτου
        </a>
      </p>
    </form>
  );
}
