"use client";

import TransactionForm from "@/components/admin/TransactionForm";

export default function NewTransactionPage() {
  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">New transaction</h1>
      <TransactionForm mode="create" />
    </div>
  );
}
