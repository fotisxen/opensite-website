"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/transactions", label: "Income/Expenses" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function AdminNav() {
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <div className="border-b border-surface-border bg-surface-container-lowest">
      <div className="mx-auto flex max-w-container-max flex-wrap items-center justify-between gap-y-3 px-margin-mobile py-4 md:px-margin-desktop">
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-primary">
              {l.label}
            </Link>
          ))}
        </div>
        <button
          onClick={handleSignOut}
          className="font-label-sm text-label-sm uppercase tracking-wide text-text-secondary transition-colors hover:text-primary"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
