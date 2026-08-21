"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TransactionForm from "@/components/admin/TransactionForm";
import type { Transaction } from "@/types/database";

export default function EditTransactionPage() {
  return (
    <Suspense>
      <EditTransactionForm />
    </Suspense>
  );
}

function EditTransactionForm() {
  const id = useSearchParams().get("id");
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("transactions")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        setTransaction(data as Transaction | null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="font-body-sm text-body-sm text-text-secondary">Loading…</p>;
  if (!transaction) return <p className="font-body-sm text-body-sm text-error">Transaction not found.</p>;

  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">Edit transaction</h1>
      <TransactionForm mode="edit" transaction={transaction} />
    </div>
  );
}
