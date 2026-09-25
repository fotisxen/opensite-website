"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteRowButton from "@/components/admin/AdminRowActions";
import type { Client } from "@/types/database";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    setClients((data ?? []) as Client[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-headline-lg text-headline-lg text-text-primary">Clients</h1>
        <Link href="/admin/clients/new" className="rounded-xl bg-primary-container px-5 py-2 font-label-sm text-label-sm text-on-primary-container">
          + New client
        </Link>
      </div>

      {loading ? (
        <p className="mt-8 font-body-sm text-body-sm text-text-secondary">Loading…</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-border text-left font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Company</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Phone</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-surface-border/60">
                  <td className="py-3 pr-4">
                    <Link href={`/admin/clients/edit?id=${c.id}`} className="text-text-primary hover:text-primary">
                      {c.full_name}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{c.company ?? "-"}</td>
                  <td className="py-3 pr-4 text-text-secondary">{c.email ?? "-"}</td>
                  <td className="py-3 pr-4 text-text-secondary">{c.phone ?? "-"}</td>
                  <td className="py-3 pr-4">
                    <DeleteRowButton table="clients" id={c.id} label={c.full_name} onDeleted={load} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {clients.length === 0 && <p className="py-10 text-center text-text-secondary">No clients yet.</p>}
        </div>
      )}
    </div>
  );
}
