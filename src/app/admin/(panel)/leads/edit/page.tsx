"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import LeadForm from "@/components/admin/LeadForm";
import type { Lead } from "@/types/database";

export default function EditLeadPage() {
  return (
    <Suspense>
      <EditLeadForm />
    </Suspense>
  );
}

function EditLeadForm() {
  const id = useSearchParams().get("id");
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setLead(data as Lead | null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="font-body-sm text-body-sm text-text-secondary">Loading…</p>;
  if (!lead) return <p className="font-body-sm text-body-sm text-error">Lead not found.</p>;

  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">Edit lead</h1>
      <LeadForm mode="edit" lead={lead} />
    </div>
  );
}
