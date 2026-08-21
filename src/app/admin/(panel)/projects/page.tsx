"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import DeleteRowButton from "@/components/admin/AdminRowActions";
import { stageLabel } from "@/components/admin/ProjectForm";
import type { Client, Project } from "@/types/database";

const stages = ["", "contact", "proposal", "in_progress", "review", "closed_won", "closed_lost"] as const;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clientById, setClientById] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [stageFilter, setStageFilter] = useState<(typeof stages)[number]>("");

  async function load() {
    setLoading(true);
    let query = supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (stageFilter) query = query.eq("stage", stageFilter);
    const [{ data }, { data: clients }] = await Promise.all([query, supabase.from("clients").select("*")]);
    setProjects((data ?? []) as Project[]);
    setClientById(new Map(((clients ?? []) as Client[]).map((c) => [c.id, c.full_name])));
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageFilter]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-headline-lg text-headline-lg text-text-primary">Projects</h1>
        <Link href="/admin/projects/new" className="rounded-xl bg-primary-container px-5 py-2 font-label-sm text-label-sm text-on-primary-container">
          + New project
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 font-label-sm text-label-sm">
        {stages.map((s) => (
          <button
            key={s}
            onClick={() => setStageFilter(s)}
            className={`rounded-full border px-4 py-2 transition-colors ${
              stageFilter === s ? "border-primary-container bg-primary-container text-on-primary-container" : "border-surface-border text-text-secondary hover:border-primary-container"
            }`}
          >
            {s ? stageLabel[s] : "All"}
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
                <th className="py-3 pr-4">Title</th>
                <th className="py-3 pr-4">Client</th>
                <th className="py-3 pr-4">Stage</th>
                <th className="py-3 pr-4">Value</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-surface-border/60">
                  <td className="py-3 pr-4">
                    <Link href={`/admin/projects/edit?id=${p.id}`} className="text-text-primary hover:text-primary">
                      {p.title}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{p.client_id ? clientById.get(p.client_id) ?? "—" : "—"}</td>
                  <td className="py-3 pr-4 text-text-secondary">{stageLabel[p.stage]}</td>
                  <td className="py-3 pr-4 text-text-secondary">{p.value != null ? `€${p.value.toLocaleString("en-US")}` : "—"}</td>
                  <td className="py-3 pr-4">
                    <DeleteRowButton table="projects" id={p.id} label={p.title} onDeleted={load} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && <p className="py-10 text-center text-text-secondary">No projects.</p>}
        </div>
      )}
    </div>
  );
}
