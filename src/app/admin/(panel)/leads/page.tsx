"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteRowButton from "@/components/admin/AdminRowActions";
import type { Lead } from "@/types/database";

const statusLabel: Record<Lead["status"], string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  lost: "Lost",
};

const statuses = ["", "new", "contacted", "qualified", "lost"] as const;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<(typeof statuses)[number]>("");

  async function load() {
    setLoading(true);
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (statusFilter) query = query.eq("status", statusFilter);
    const { data } = await query;
    setLeads((data ?? []) as Lead[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-headline-lg text-headline-lg text-text-primary">Leads</h1>
        <Link href="/admin/leads/new" className="rounded-xl bg-primary-container px-5 py-2 font-label-sm text-label-sm text-on-primary-container">
          + New lead
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 font-label-sm text-label-sm">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full border px-4 py-2 transition-colors ${
              statusFilter === s ? "border-primary-container bg-primary-container text-on-primary-container" : "border-surface-border text-text-secondary hover:border-primary-container"
            }`}
          >
            {s ? statusLabel[s] : "All"}
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
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Phone</th>
                <th className="py-3 pr-4">Source</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b border-surface-border/60">
                  <td className="py-3 pr-4">
                    <Link href={`/admin/leads/edit?id=${l.id}`} className="text-text-primary hover:text-primary">
                      {l.full_name}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{l.phone ?? "—"}</td>
                  <td className="py-3 pr-4 text-text-secondary">{l.source ?? "—"}</td>
                  <td className="py-3 pr-4 text-text-secondary">{statusLabel[l.status]}</td>
                  <td className="py-3 pr-4">
                    <DeleteRowButton table="leads" id={l.id} label={l.full_name} onDeleted={load} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && <p className="py-10 text-center text-text-secondary">No leads.</p>}
        </div>
      )}
    </div>
  );
}
