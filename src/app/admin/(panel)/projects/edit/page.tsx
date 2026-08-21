"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProjectForm from "@/components/admin/ProjectForm";
import type { Project } from "@/types/database";

export default function EditProjectPage() {
  return (
    <Suspense>
      <EditProjectForm />
    </Suspense>
  );
}

function EditProjectForm() {
  const id = useSearchParams().get("id");
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setProject(data as Project | null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="font-body-sm text-body-sm text-text-secondary">Loading…</p>;
  if (!project) return <p className="font-body-sm text-body-sm text-error">Project not found.</p>;

  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">Edit project</h1>
      <ProjectForm mode="edit" project={project} />
    </div>
  );
}
