import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// This site is statically exported (see next.config.ts: output: "export"),
// so there is no server to run an SSR-aware client on. Every admin page
// talks to Supabase directly from the browser; auth session persistence
// uses the default localStorage storage. Security comes from the RLS
// policies in supabase/schema.sql, not from routing.
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
