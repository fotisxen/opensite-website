"use client";

import { focusLeadForm } from "@/lib/leadForm";

export default function FocusFormButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={focusLeadForm}
      className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary-container px-6 py-3 font-label-md text-label-md text-white transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
    >
      {children}
    </button>
  );
}
