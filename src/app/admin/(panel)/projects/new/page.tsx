"use client";

import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">New project</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
