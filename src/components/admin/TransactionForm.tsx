"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Field, inputClass, primaryButtonClass } from "@/components/admin/AdminUI";
import type { Client, Project, Transaction } from "@/types/database";

const incomeCategories = ["Web development retainer", "One-off project", "SEO retainer", "Other income"];
const expenseCategories = ["Facebook Ads", "Google Ads", "Software/tools", "Contractor", "Office", "Other expense"];

export default function TransactionForm({ mode, transaction }: { mode: "create" | "edit"; transaction?: Transaction }) {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [type, setType] = useState<"income" | "expense">(transaction?.type ?? "income");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      supabase.from("clients").select("*").order("full_name"),
      supabase.from("projects").select("*").order("title"),
    ]).then(([c, p]) => {
      setClients((c.data ?? []) as Client[]);
      setProjects((p.data ?? []) as Project[]);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      type,
      category: String(form.get("category") ?? "") || null,
      amount: Number(form.get("amount")),
      occurred_on: String(form.get("occurred_on") ?? "") || new Date().toISOString().slice(0, 10),
      description: String(form.get("description") ?? "") || null,
      client_id: String(form.get("client_id") ?? "") || null,
      project_id: String(form.get("project_id") ?? "") || null,
    };

    const { error: saveError } =
      mode === "create"
        ? await supabase.from("transactions").insert(payload as never)
        : await supabase.from("transactions").update(payload as never).eq("id", transaction!.id);

    if (saveError) {
      setError(saveError.message);
      setSaving(false);
      return;
    }

    router.push("/admin/transactions");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-5">
      <div className="flex gap-2 font-label-sm text-label-sm">
        {(["income", "expense"] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setType(v)}
            className={`rounded-full border px-4 py-2 transition-colors ${
              type === v ? "border-primary-container bg-primary-container text-on-primary-container" : "border-surface-border text-text-secondary hover:border-primary-container"
            }`}
          >
            {v === "income" ? "Income" : "Expense"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Amount (€)">
          <input name="amount" type="number" min="0" step="0.01" required defaultValue={transaction?.amount} className={inputClass} />
        </Field>
        <Field label="Date">
          <input name="occurred_on" type="date" defaultValue={transaction?.occurred_on ?? new Date().toISOString().slice(0, 10)} className={inputClass} />
        </Field>
      </div>

      <Field label="Category">
        <select key={type} name="category" defaultValue={transaction?.category ?? ""} className={inputClass}>
          <option value="">—</option>
          {(type === "income" ? incomeCategories : expenseCategories).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          {transaction?.category && !(type === "income" ? incomeCategories : expenseCategories).includes(transaction.category) && (
            <option value={transaction.category}>{transaction.category}</option>
          )}
        </select>
      </Field>

      <Field label="Description">
        <textarea name="description" rows={2} defaultValue={transaction?.description ?? ""} className={inputClass} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Client">
          <select name="client_id" defaultValue={transaction?.client_id ?? ""} className={inputClass}>
            <option value="">—</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Project">
          <select name="project_id" defaultValue={transaction?.project_id ?? ""} className={inputClass}>
            <option value="">—</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {error && <p className="font-body-sm text-body-sm text-error">{error}</p>}

      <button type="submit" disabled={saving} className={primaryButtonClass}>
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
