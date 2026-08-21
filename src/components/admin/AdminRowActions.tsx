"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

// Generic delete-with-confirm button for any admin table row. Calls
// onDeleted (usually a local state filter) instead of a router refresh,
// since these pages fetch client-side rather than via server props.
export default function DeleteRowButton({
  table,
  id,
  label,
  onDeleted,
}: {
  table: "clients" | "leads" | "projects" | "transactions";
  id: string;
  label: string;
  onDeleted: () => void;
}) {
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${label}"? This can't be undone.`)) return;
    setBusy(true);
    await supabase.from(table).delete().eq("id", id);
    setBusy(false);
    onDeleted();
  }

  return (
    <button type="button" onClick={handleDelete} disabled={busy} className="font-label-sm text-label-sm text-error hover:opacity-70 disabled:opacity-50">
      Delete
    </button>
  );
}
