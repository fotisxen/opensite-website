"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Field, inputClass, primaryButtonClass } from "@/components/admin/AdminUI";
import type { Client, Project } from "@/types/database";

export const serviceLabel: Record<NonNullable<Project["service"]>, string> = {
  web_development: "Web development",
  seo_strategy: "SEO strategy",
  ui_ux_design: "UI/UX design",
  crm: "CRM",
  other: "Other",
};

export const stageLabel: Record<Project["stage"], string> = {
  contact: "Contact",
  proposal: "Proposal",
  in_progress: "In progress",
  review: "Review",
  closed_won: "Closed (won)",
  closed_lost: "Closed (lost)",
};

export default function ProjectForm({ mode, project }: { mode: "create" | "edit"; project?: Project }) {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("clients")
      .select("*")
      .order("full_name")
      .then(({ data }) => setClients((data ?? []) as Client[]));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      title: String(form.get("title") ?? "").trim(),
      client_id: String(form.get("client_id") ?? "") || null,
      service: String(form.get("service") ?? "") || null,
      stage: String(form.get("stage") ?? "contact"),
      value: form.get("value") ? Number(form.get("value")) : null,
      expected_close_date: String(form.get("expected_close_date") ?? "") || null,
      notes: String(form.get("notes") ?? "") || null,
    };

    const { error: saveError } =
      mode === "create"
        ? await supabase.from("projects").insert(payload as never)
        : await supabase.from("projects").update(payload as never).eq("id", project!.id);

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/projects");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-5">
      <Field label="Title">
        <input
          name="title"
          required
          defaultValue={project?.title}
          placeholder="e.g. Website redesign, Acme Co"
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Client">
          <select name="client_id" defaultValue={project?.client_id ?? ""} className={inputClass}>
            <option value="">-</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Service">
          <select name="service" defaultValue={project?.service ?? ""} className={inputClass}>
            <option value="">-</option>
            {Object.entries(serviceLabel).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Stage">
          <select name="stage" defaultValue={project?.stage ?? "contact"} className={inputClass}>
            {Object.entries(stageLabel).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Value (€)">
          <input name="value" type="number" min="0" defaultValue={project?.value ?? ""} className={inputClass} />
        </Field>
      </div>

      <Field label="Expected close date">
        <input name="expected_close_date" type="date" defaultValue={project?.expected_close_date ?? ""} className={inputClass} />
      </Field>

      <Field label="Notes">
        <textarea name="notes" rows={4} defaultValue={project?.notes ?? ""} className={inputClass} />
      </Field>

      {error && <p className="font-body-sm text-body-sm text-error">{error}</p>}

      <button type="submit" disabled={saving} className={primaryButtonClass}>
        {saving ? "Saving…" : "Save project"}
      </button>
    </form>
  );
}
