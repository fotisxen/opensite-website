"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/admin/AdminUI";
import MonthlyBarChart, { type MonthlyPoint } from "@/components/charts/MonthlyBarChart";
import BreakdownBars, { type BreakdownItem } from "@/components/charts/BreakdownBars";
import type { Lead, Transaction } from "@/types/database";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}`;
}

function fmtEuro(n: number) {
  return `€${Math.round(n).toLocaleString("en-US")}`;
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState<MonthlyPoint[]>([]);
  const [expenseCats, setExpenseCats] = useState<BreakdownItem[]>([]);
  const [incomeCats, setIncomeCats] = useState<BreakdownItem[]>([]);
  const [leadSources, setLeadSources] = useState<BreakdownItem[]>([]);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      // Earliest transaction sets the chart's start month - no hardcoded
      // "data starts in year X" assumption for a different business.
      const [{ data: earliest }, { data: txRaw }, { data: leadsRaw }] = await Promise.all([
        supabase.from("transactions").select("occurred_on").order("occurred_on", { ascending: true }).limit(1),
        supabase.from("transactions").select("*"),
        supabase.from("leads").select("*"),
      ]);

      const transactions = (txRaw ?? []) as Transaction[];
      const leads = (leadsRaw ?? []) as Lead[];
      const earliestRow = (earliest ?? [])[0] as { occurred_on: string } | undefined;
      const now = new Date();
      const start = earliestRow ? new Date(earliestRow.occurred_on) : now;
      const startMonth = new Date(start.getFullYear(), start.getMonth(), 1);

      const months: Date[] = [];
      for (let d = new Date(startMonth); d <= now; d.setMonth(d.getMonth() + 1)) {
        months.push(new Date(d));
      }

      const byMonth = new Map<string, { income: number; expense: number }>();
      for (const m of months) byMonth.set(monthKey(m), { income: 0, expense: 0 });
      for (const t of transactions) {
        const bucket = byMonth.get(monthKey(new Date(t.occurred_on)));
        if (!bucket) continue;
        bucket[t.type] += t.amount;
      }

      const points: MonthlyPoint[] = months.map((m) => {
        const b = byMonth.get(monthKey(m))!;
        return { label: `${monthNames[m.getMonth()]} ${String(m.getFullYear()).slice(2)}`, income: b.income, expense: b.expense };
      });
      setMonthlyData(points);

      function topCategories(type: "income" | "expense") {
        const totals = new Map<string, number>();
        for (const t of transactions.filter((t) => t.type === type)) {
          const cat = t.category?.trim() || "Uncategorized";
          totals.set(cat, (totals.get(cat) ?? 0) + t.amount);
        }
        return [...totals.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 6);
      }
      const expCats = topCategories("expense");
      const incCats = topCategories("income");
      setExpenseCats(expCats);
      setIncomeCats(incCats);

      const sourceTotals = new Map<string, number>();
      for (const l of leads) {
        const src = l.source?.trim() || "Unknown";
        sourceTotals.set(src, (sourceTotals.get(src) ?? 0) + 1);
      }
      setLeadSources([...sourceTotals.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 6));

      // --- rule-based insights ---
      const list: string[] = [];
      const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
      const totalExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

      const thisMonth = byMonth.get(monthKey(now));
      const lastMonth = byMonth.get(monthKey(new Date(now.getFullYear(), now.getMonth() - 1, 1)));
      if (thisMonth && lastMonth) {
        if (lastMonth.income > 0) {
          const change = ((thisMonth.income - lastMonth.income) / lastMonth.income) * 100;
          list.push(`Income ${change >= 0 ? "increased" : "decreased"} by ${Math.abs(change).toFixed(0)}% vs last month.`);
        }
        if (lastMonth.expense > 0) {
          const change = ((thisMonth.expense - lastMonth.expense) / lastMonth.expense) * 100;
          list.push(`Expenses ${change >= 0 ? "increased" : "decreased"} by ${Math.abs(change).toFixed(0)}% vs last month.`);
        }
      }
      if (expCats.length > 0 && totalExpense > 0) {
        list.push(`Biggest expense category is "${expCats[0].label}", ${((expCats[0].value / totalExpense) * 100).toFixed(0)}% of total expenses.`);
      }
      if (incCats.length > 0 && totalIncome > 0) {
        list.push(`Biggest income source is "${incCats[0].label}", ${((incCats[0].value / totalIncome) * 100).toFixed(0)}% of total income.`);
      }
      if (totalIncome > 0) {
        list.push(`Overall margin is ${(((totalIncome - totalExpense) / totalIncome) * 100).toFixed(0)}% (${fmtEuro(totalIncome - totalExpense)} net).`);
      }
      const converted = leads.filter((l) => l.converted_client_id).length;
      if (leads.length > 0) {
        list.push(`${converted} of ${leads.length} leads (${((converted / leads.length) * 100).toFixed(0)}%) have converted to clients.`);
      }
      const bestMonth = points.reduce<MonthlyPoint | null>((best, m) => {
        const net = m.income - m.expense;
        return net > (best ? best.income - best.expense : -Infinity) ? m : best;
      }, null);
      if (bestMonth && bestMonth.income - bestMonth.expense > 0) {
        list.push(`Best month by net profit: ${bestMonth.label} (${fmtEuro(bestMonth.income - bestMonth.expense)}).`);
      }
      setInsights(list);

      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <p className="font-body-sm text-body-sm text-text-secondary">Loading…</p>;
  }

  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">Analytics</h1>

      <Card className="mt-8">
        <h2 className="font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">Income &amp; Expenses by month</h2>
        <div className="mt-4">
          <MonthlyBarChart data={monthlyData} />
        </div>
      </Card>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">Expense categories</h2>
          <div className="mt-4">
            <BreakdownBars items={expenseCats} color="#e11d48" formatValue={fmtEuro} />
          </div>
        </Card>
        <Card>
          <h2 className="font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">Income categories</h2>
          <div className="mt-4">
            <BreakdownBars items={incomeCats} color="#0d9488" formatValue={fmtEuro} />
          </div>
        </Card>
        <Card>
          <h2 className="font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">Leads by source</h2>
          <div className="mt-4">
            <BreakdownBars items={leadSources} color="#b4c5ff" formatValue={(n) => String(n)} />
          </div>
        </Card>
        <Card>
          <h2 className="font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">Insights</h2>
          {insights.length > 0 ? (
            <ul className="mt-4 space-y-3 font-body-sm text-body-sm text-text-primary">
              {insights.map((text, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 font-body-sm text-body-sm text-text-secondary">Need more data for insights.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
