"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { inputClass } from "@/components/admin/AdminUI";
import { activityLabel, today } from "@/lib/leadPipeline";
import type { LeadActivity, LeadActivityKind } from "@/types/database";

// Timeline of every touchpoint with a lead. Logging one also bumps the
// lead's last contact; a follow-up bumps followups_sent and clears the
// next follow-up date.
export default function LeadActivities({ leadId }: { leadId: string }) {
  const [items, setItems] = useState<LeadActivity[]>([]);
  const [kind, setKind] = useState<LeadActivityKind>("note");
  const [note, setNote] = useState("");
  const [at, setAt] = useState(today());
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await supabase.from("lead_activities").select("*").eq("lead_id", leadId).order("at", { ascending: false });
    setItems((data ?? []) as LeadActivity[]);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadId]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("lead_activities").insert({ lead_id: leadId, kind, at, note: note.trim() || null } as never);
    if (kind !== "note") {
      const { data: lead } = await supabase.from("leads").select("followups_sent").eq("id", leadId).single();
      const patch: Record<string, unknown> = { last_contact_at: at };
      if (kind === "followup") {
        patch.followups_sent = ((lead as { followups_sent: number } | null)?.followups_sent ?? 0) + 1;
        patch.next_followup_at = null;
      }
      if (kind === "reply") Object.assign(patch, { status: "replied", next_followup_at: null });
      await supabase.from("leads").update(patch as never).eq("id", leadId);
    }
    setNote("");
    setSaving(false);
    load();
  }

  return (
    <div className="mt-10 max-w-xl border-t border-surface-border pt-6">
      <h2 className="font-headline-sm text-headline-sm text-text-primary">Activity</h2>

      <form onSubmit={add} className="mt-4 grid grid-cols-[auto_auto_1fr_auto] gap-2">
        <select value={kind} onChange={(e) => setKind(e.target.value as LeadActivityKind)} className={inputClass}>
          {Object.entries(activityLabel).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <input type="date" value={at} onChange={(e) => setAt(e.target.value)} className={inputClass} />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" className={inputClass} />
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl border border-surface-border px-4 font-label-sm text-label-sm text-text-primary hover:border-primary-container disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <ul className="mt-6 space-y-3 font-body-sm text-body-sm">
        {items.map((a) => (
          <li key={a.id} className="flex gap-3">
            <span className="w-24 shrink-0 text-text-secondary">{a.at.slice(0, 10)}</span>
            <span className="w-20 shrink-0 font-label-sm text-label-sm uppercase text-primary">{activityLabel[a.kind]}</span>
            <span className="text-text-primary">{a.note ?? ""}</span>
          </li>
        ))}
        {items.length === 0 && <li className="text-text-secondary">No activity yet.</li>}
      </ul>
    </div>
  );
}
