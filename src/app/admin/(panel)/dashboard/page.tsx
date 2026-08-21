"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/admin/AdminUI";
import type { Lead, Project, Transaction } from "@/types/database";

const stageLabel: Record<Project["stage"], string> = {
  contact: "Contact",
  proposal: "Proposal",
  in_progress: "In progress",
  review: "Review",
  closed_won: "Closed (won)",
  closed_lost: "Closed (lost)",
};

function fmtEuro(n: number) {
  return `€${Math.round(n).toLocaleString("en-US")}`;
}

function StatTile({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  return (
    <Card>
      <p className={`font-headline-md text-headline-md ${tone === "good" ? "text-secondary" : tone === "bad" ? "text-error" : "text-text-primary"}`}>
        {value}
      </p>
      <p className="mt-1 font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">{label}</p>
    </Card>
  );
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [newLeadsCount, setNewLeadsCount] = useState(0);
  const [openProjects, setOpenProjects] = useState<Project[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function load() {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const startOfMonthStr = startOfMonth.toISOString().slice(0, 10);

      const [monthTx, leads, transactions, projects, newLeads] = await Promise.all([
        supabase.from("transactions").select("type, amount").gte("occurred_on", startOfMonthStr),
        supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("transactions").select("*").order("occurred_on", { ascending: false }).limit(5),
        supabase.from("projects").select("*").not("stage", "in", "(closed_won,closed_lost)").order("created_at", { ascending: false }),
        supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
      ]);

      const tx = (monthTx.data ?? []) as { type: string; amount: number }[];
      setIncome(tx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0));
      setExpense(tx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0));
      setRecentLeads((leads.data ?? []) as Lead[]);
      setRecentTransactions((transactions.data ?? []) as Transaction[]);
      setOpenProjects((projects.data ?? []) as Project[]);
      setNewLeadsCount(newLeads.count ?? 0);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <p className="font-body-sm text-body-sm text-text-secondary">Loading…</p>;
  }

  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">Dashboard</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile label="Income this month" value={fmtEuro(income)} tone="good" />
        <StatTile label="Expenses this month" value={fmtEuro(expense)} tone="bad" />
        <StatTile label="Net this month" value={fmtEuro(income - expense)} />
        <StatTile label="New leads" value={String(newLeadsCount)} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">Open projects</h2>
            <Link href="/admin/projects" className="font-label-sm text-label-sm text-primary hover:underline">
              All →
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-surface-border font-body-sm text-body-sm">
            {openProjects.slice(0, 6).map((p) => (
              <li key={p.id} className="flex items-center justify-between py-2">
                <Link href={`/admin/projects/${p.id}`} className="text-text-primary hover:text-primary">
                  {p.title}
                </Link>
                <span className="text-text-secondary">{stageLabel[p.stage]}</span>
              </li>
            ))}
            {openProjects.length === 0 && <li className="py-2 text-text-secondary">No open projects.</li>}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">Recent leads</h2>
            <Link href="/admin/leads" className="font-label-sm text-label-sm text-primary hover:underline">
              All →
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-surface-border font-body-sm text-body-sm">
            {recentLeads.map((l) => (
              <li key={l.id} className="flex items-center justify-between py-2">
                <Link href={`/admin/leads/${l.id}`} className="text-text-primary hover:text-primary">
                  {l.full_name}
                </Link>
                <span className="text-text-secondary">{l.source ?? "—"}</span>
              </li>
            ))}
            {recentLeads.length === 0 && <li className="py-2 text-text-secondary">No leads yet.</li>}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">Recent transactions</h2>
            <Link href="/admin/transactions" className="font-label-sm text-label-sm text-primary hover:underline">
              All →
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-surface-border font-body-sm text-body-sm">
            {recentTransactions.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-2">
                <Link href={`/admin/transactions/${t.id}`} className="text-text-primary hover:text-primary">
                  {t.category ?? (t.type === "income" ? "Income" : "Expense")}
                </Link>
                <span className={t.type === "income" ? "text-secondary" : "text-error"}>{fmtEuro(t.amount)}</span>
              </li>
            ))}
            {recentTransactions.length === 0 && <li className="py-2 text-text-secondary">No transactions yet.</li>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
