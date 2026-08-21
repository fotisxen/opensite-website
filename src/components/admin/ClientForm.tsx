"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Field, inputClass, primaryButtonClass } from "@/components/admin/AdminUI";
import type { Client } from "@/types/database";

export default function ClientForm({ mode, client }: { mode: "create" | "edit"; client?: Client }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: String(form.get("full_name") ?? "").trim(),
      company: String(form.get("company") ?? "") || null,
      email: String(form.get("email") ?? "") || null,
      phone: String(form.get("phone") ?? "") || null,
      notes: String(form.get("notes") ?? "") || null,
    };

    const { error: saveError } =
      mode === "create"
        ? await supabase.from("clients").insert(payload as never)
        : await supabase.from("clients").update(payload as never).eq("id", client!.id);

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/clients");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-5">
      <Field label="Full name">
        <input name="full_name" required defaultValue={client?.full_name} className={inputClass} />
      </Field>
      <Field label="Company">
        <input name="company" defaultValue={client?.company ?? ""} className={inputClass} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Email">
          <input name="email" type="email" defaultValue={client?.email ?? ""} className={inputClass} />
        </Field>
        <Field label="Phone">
          <input name="phone" defaultValue={client?.phone ?? ""} className={inputClass} />
        </Field>
      </div>
      <Field label="Notes">
        <textarea name="notes" rows={4} defaultValue={client?.notes ?? ""} className={inputClass} />
      </Field>

      {error && <p className="font-body-sm text-body-sm text-error">{error}</p>}

      <button type="submit" disabled={saving} className={primaryButtonClass}>
        {saving ? "Saving…" : "Save client"}
      </button>
    </form>
  );
}
