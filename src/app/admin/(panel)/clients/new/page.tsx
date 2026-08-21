"use client";

import ClientForm from "@/components/admin/ClientForm";

export default function NewClientPage() {
  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">New client</h1>
      <ClientForm mode="create" />
    </div>
  );
}
