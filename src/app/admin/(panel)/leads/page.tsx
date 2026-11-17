"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteRowButton from "@/components/admin/AdminRowActions";
import { STAGES, channelLabel, statusLabel, today } from "@/lib/leadPipeline";
import type { Lead, LeadStatus } from "@/types/database";

type Filter = "" | LeadStatus | "due";

const pill = (active: boolean) =>
  `rounded-full border px-4 py-2 transition-colors ${
    active ? "border-primary-container bg-primary-container text-on-primary-container" : "border-surface-border text-text-secondary hover:border-primary-container"
  }`;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("");
  const [channel, setChannel] = useState("");
  const [search, setSearch] = useState("");

  async function load() {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5000);
    setLeads((data ?? []) as Lead[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const now = today();
  const isDue = (l: Lead) => !!l.next_followup_at && l.next_followup_at <= now && ["new", "contacted", "demo"].includes(l.status);

  const inChannel = useMemo(() => leads.filter((l) => !channel || l.channel === channel), [leads, channel]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { due: 0 };
    for (const l of inChannel) {
      c[l.status] = (c[l.status] ?? 0) + 1;
      if (isDue(l)) c.due++;
    }
    return c;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inChannel]);

  const channels = useMemo(() => [...new Set(leads.map((l) => l.channel).filter(Boolean))] as string[], [leads]);
  const contacted = inChannel.length - (counts.new ?? 0);
  // Demo venues start at "demo" without having answered, so only cold leads count there.
  const replied = inChannel.filter((l) => ["replied", "proposal", "won"].includes(l.status) || (l.status === "demo" && l.channel !== "instagram")).length;
  const won = counts.won ?? 0;

  const q = search.trim().toLowerCase();
  const shown = inChannel
    .filter((l) => (filter === "due" ? isDue(l) : !filter || l.status === filter))
    .filter((l) => !q || [l.full_name, l.company, l.email, l.website, l.city].some((v) => v?.toLowerCase().includes(q)));

  async function setStatus(l: Lead, status: LeadStatus) {
    const closed = !["new", "contacted"].includes(status);
    const patch = { status, ...(closed ? { next_followup_at: null } : {}) };
    setLeads((prev) => prev.map((x) => (x.id === l.id ? { ...x, ...patch } : x)));
    await supabase.from("leads").update(patch as never).eq("id", l.id);
    if (status === "replied") await supabase.from("lead_activities").insert({ lead_id: l.id, kind: "reply" } as never);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-headline-lg text-headline-lg text-text-primary">Leads</h1>
        <Link href="/admin/leads/new" className="rounded-xl bg-primary-container px-5 py-2 font-label-sm text-label-sm text-on-primary-container">
          + New lead
        </Link>
      </div>

      {!loading && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Contacted" value={contacted} />
          <Stat label="Replied" value={replied} hint={contacted ? `${Math.round((replied / contacted) * 100)}%` : undefined} />
          <Stat label="Won" value={won} hint={contacted ? `${((won / contacted) * 100).toFixed(1)}%` : undefined} />
          <Stat label="Follow-ups due" value={counts.due} accent={counts.due > 0} />
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2 font-label-sm text-label-sm">
        <button onClick={() => setFilter("")} className={pill(filter === "")}>
          All {inChannel.length}
        </button>
        <button onClick={() => setFilter("due")} className={pill(filter === "due")}>
          Follow-up due {counts.due}
        </button>
        {STAGES.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={pill(filter === s)}>
            {statusLabel[s]} {counts[s] ?? 0}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 font-body-sm text-body-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, site, city…"
          className="w-full max-w-xs rounded-xl border border-surface-border bg-background/50 px-4 py-2 text-text-primary outline-none focus:ring-2 focus:ring-primary-container"
        />
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          className="rounded-xl border border-surface-border bg-background/50 px-4 py-2 text-text-primary outline-none"
        >
          <option value="">All channels</option>
          {channels.map((c) => (
            <option key={c} value={c}>
              {channelLabel[c] ?? c}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="mt-8 font-body-sm text-body-sm text-text-secondary">Loading…</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-border text-left font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Channel</th>
                <th className="py-3 pr-4">City</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Last contact</th>
                <th className="py-3 pr-4">Follow-up</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {shown.map((l) => (
                <tr key={l.id} className="border-b border-surface-border/60">
                  <td className="py-3 pr-4">
                    <Link href={`/admin/leads/edit?id=${l.id}`} className="text-text-primary hover:text-primary">
                      {l.full_name}
                    </Link>
                    <div className="text-text-secondary">
                      {l.email ?? l.phone ?? ""}
                      {l.demo_url && (
                        <a href={l.demo_url} target="_blank" rel="noreferrer" className="ml-2 text-primary hover:underline">
                          demo
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{l.channel ? channelLabel[l.channel] ?? l.channel : l.source ?? "-"}</td>
                  <td className="py-3 pr-4 text-text-secondary">{l.city ?? "-"}</td>
                  <td className="py-3 pr-4">
                    <select
                      value={l.status}
                      onChange={(e) => setStatus(l, e.target.value as LeadStatus)}
                      className="rounded-lg border border-surface-border bg-background/50 px-2 py-1 text-text-primary"
                    >
                      {[...STAGES, ...(l.status === "qualified" ? ["qualified" as const] : [])].map((s) => (
                        <option key={s} value={s}>
                          {statusLabel[s]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{l.last_contact_at?.slice(0, 10) ?? "-"}</td>
                  <td className={`py-3 pr-4 ${isDue(l) ? "font-semibold text-error" : "text-text-secondary"}`}>
                    {l.next_followup_at ?? (l.followups_sent ? `sent ×${l.followups_sent}` : "-")}
                  </td>
                  <td className="py-3 pr-4">
                    <DeleteRowButton table="leads" id={l.id} label={l.full_name} onDeleted={load} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {shown.length === 0 && <p className="py-10 text-center text-text-secondary">No leads.</p>}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, hint, accent }: { label: string; value: number; hint?: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-surface-border p-4">
      <div className="font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">{label}</div>
      <div className={`mt-1 font-headline-md text-headline-md ${accent ? "text-error" : "text-text-primary"}`}>
        {value}
        {hint && <span className="ml-2 font-body-sm text-body-sm text-text-secondary">{hint}</span>}
      </div>
    </div>
  );
}
