"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteRowButton from "@/components/admin/AdminRowActions";
import type { Client, Transaction } from "@/types/database";

const types = ["", "income", "expense"] as const;
const typeLabel: Record<string, string> = { income: "Income", expense: "Expense" };

function fmtEuro(n: number) {
  return `€${n.toLocaleString("en-US")}`;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [clientById, setClientById] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<(typeof types)[number]>("");

  async function load() {
    setLoading(true);
    let query = supabase.from("transactions").select("*").order("occurred_on", { ascending: false });
    if (typeFilter) query = query.eq("type", typeFilter);
    const [{ data }, { data: clients }] = await Promise.all([query, supabase.from("clients").select("*")]);
    setTransactions((data ?? []) as Transaction[]);
    setClientById(new Map(((clients ?? []) as Client[]).map((c) => [c.id, c.full_name])));
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter]);

  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-headline-lg text-headline-lg text-text-primary">Income &amp; Expenses</h1>
        <Link href="/admin/transactions/new" className="rounded-xl bg-primary-container px-5 py-2 font-label-sm text-label-sm text-on-primary-container">
          + New transaction
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-8 font-body-sm text-body-sm">
        <div>
          <span className="font-headline-sm text-headline-sm text-secondary">{fmtEuro(income)}</span>
          <span className="ml-2 text-text-secondary">income</span>
        </div>
        <div>
          <span className="font-headline-sm text-headline-sm text-error">{fmtEuro(expense)}</span>
          <span className="ml-2 text-text-secondary">expenses</span>
        </div>
        <div>
          <span className="font-headline-sm text-headline-sm text-text-primary">{fmtEuro(income - expense)}</span>
          <span className="ml-2 text-text-secondary">net</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 font-label-sm text-label-sm">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`rounded-full border px-4 py-2 transition-colors ${
              typeFilter === t ? "border-primary-container bg-primary-container text-on-primary-container" : "border-surface-border text-text-secondary hover:border-primary-container"
            }`}
          >
            {t ? typeLabel[t] : "All"}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-8 font-body-sm text-body-sm text-text-secondary">Loading…</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-border text-left font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Type</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Client</th>
                <th className="py-3 pr-4">Amount</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-surface-border/60">
                  <td className="py-3 pr-4">
                    <Link href={`/admin/transactions/edit?id=${t.id}`} className="text-text-primary hover:text-primary">
                      {new Date(t.occurred_on).toLocaleDateString("en-US")}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={t.type === "income" ? "text-secondary" : "text-error"}>{typeLabel[t.type]}</span>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{t.category ?? "—"}</td>
                  <td className="py-3 pr-4 text-text-secondary">{t.client_id ? clientById.get(t.client_id) ?? "—" : "—"}</td>
                  <td className="py-3 pr-4 text-text-secondary">{fmtEuro(t.amount)}</td>
                  <td className="py-3 pr-4">
                    <DeleteRowButton table="transactions" id={t.id} label={t.category ?? t.type} onDeleted={load} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && <p className="py-10 text-center text-text-secondary">No transactions.</p>}
        </div>
      )}
    </div>
  );
}
