"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Field, inputClass, primaryButtonClass } from "@/components/admin/AdminUI";
import type { Lead } from "@/types/database";

const statusLabel: Record<Lead["status"], string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  lost: "Lost",
};

export default function LeadForm({ mode, lead }: { mode: "create" | "edit"; lead?: Lead }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: String(form.get("full_name") ?? "").trim(),
      email: String(form.get("email") ?? "") || null,
      phone: String(form.get("phone") ?? "") || null,
      source: String(form.get("source") ?? "") || null,
      message: String(form.get("message") ?? "") || null,
      status: String(form.get("status") ?? "new"),
      notes: String(form.get("notes") ?? "") || null,
    };

    const { error: saveError } =
      mode === "create"
        ? await supabase.from("leads").insert(payload as never)
        : await supabase.from("leads").update(payload as never).eq("id", lead!.id);

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/leads");
  }

  async function handleConvert() {
    if (!lead) return;
    if (!confirm(`Convert "${lead.full_name}" to a client?`)) return;
    setConverting(true);

    const { data: client, error: clientError } = await supabase
      .from("clients")
      .insert({
        full_name: lead.full_name,
        email: lead.email,
        phone: lead.phone,
        notes: [lead.message, lead.notes].filter(Boolean).join("\n\n") || null,
      } as never)
      .select()
      .single();

    if (clientError || !client) {
      setError(clientError?.message ?? "Something went wrong.");
      setConverting(false);
      return;
    }

    await supabase
      .from("leads")
      .update({ converted_client_id: (client as { id: string }).id, status: "qualified" } as never)
      .eq("id", lead.id);

    router.push(`/admin/clients/edit?id=${(client as { id: string }).id}`);
  }

  return (
    <div className="max-w-xl">
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Field label="Full name">
          <input name="full_name" required defaultValue={lead?.full_name} className={inputClass} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email">
            <input name="email" type="email" defaultValue={lead?.email ?? ""} className={inputClass} />
          </Field>
          <Field label="Phone">
            <input name="phone" defaultValue={lead?.phone ?? ""} className={inputClass} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Source">
            <input
              name="source"
              defaultValue={lead?.source ?? ""}
              placeholder="contact_form, book_a_call, referral…"
              className={inputClass}
            />
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={lead?.status ?? "new"} className={inputClass}>
              {Object.entries(statusLabel).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Message">
          <textarea name="message" rows={3} defaultValue={lead?.message ?? ""} className={inputClass} />
        </Field>
        <Field label="Notes">
          <textarea name="notes" rows={3} defaultValue={lead?.notes ?? ""} className={inputClass} />
        </Field>

        {error && <p className="font-body-sm text-body-sm text-error">{error}</p>}

        <button type="submit" disabled={saving} className={primaryButtonClass}>
          {saving ? "Saving…" : "Save"}
        </button>
      </form>

      {mode === "edit" && lead && (
        <div className="mt-8 border-t border-surface-border pt-6">
          {lead.converted_client_id ? (
            <Link href={`/admin/clients/edit?id=${lead.converted_client_id}`} className="font-label-sm text-label-sm text-primary hover:underline">
              Already a client →
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleConvert}
              disabled={converting}
              className="rounded-xl border border-surface-border px-6 py-3 font-label-sm text-label-sm text-text-primary hover:border-primary-container disabled:opacity-50"
            >
              {converting ? "…" : "Convert to client"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
