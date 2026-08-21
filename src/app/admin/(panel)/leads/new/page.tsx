"use client";

import LeadForm from "@/components/admin/LeadForm";

export default function NewLeadPage() {
  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">New lead</h1>
      <LeadForm mode="create" />
    </div>
  );
}
