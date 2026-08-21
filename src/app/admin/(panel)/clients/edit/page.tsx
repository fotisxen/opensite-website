"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ClientForm from "@/components/admin/ClientForm";
import type { Client } from "@/types/database";

export default function EditClientPage() {
  return (
    <Suspense>
      <EditClientForm />
    </Suspense>
  );
}

function EditClientForm() {
  const id = useSearchParams().get("id");
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setClient(data as Client | null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="font-body-sm text-body-sm text-text-secondary">Loading…</p>;
  if (!client) return <p className="font-body-sm text-body-sm text-error">Client not found.</p>;

  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">Edit client</h1>
      <ClientForm mode="edit" client={client} />
    </div>
  );
}
