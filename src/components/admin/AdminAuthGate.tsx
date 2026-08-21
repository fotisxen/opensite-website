"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// This site has no server (static export), so there is no middleware to
// gate /admin behind. This component is the client-side equivalent: it
// checks the Supabase session in the browser and bounces to /admin/login
// if there isn't one. Real security is enforced by RLS in
// supabase/schema.sql, not by this redirect — treat this purely as UX.
export default function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      if (!session) {
        router.replace("/admin/login");
      } else {
        setChecked(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/admin/login");
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (!checked) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-body-sm text-body-sm text-text-secondary">Loading…</p>
      </div>
    );
  }

  return <>{children}</>;
}
