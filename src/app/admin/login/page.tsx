"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(searchParams.get("next") ?? "/admin/dashboard");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-container-max items-center justify-center px-margin-mobile py-16 md:px-margin-desktop">
      <form
        onSubmit={handleSubmit}
        className="glass-card w-full max-w-sm rounded-3xl p-8"
      >
        <h1 className="font-headline-md text-headline-md text-text-primary">Admin sign in</h1>
        <p className="mt-1 font-body-sm text-body-sm text-text-secondary">Opensite team only.</p>

        <label className="mt-6 block font-label-md text-label-md text-text-secondary">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border border-surface-border bg-background/50 px-4 py-3 font-body-md text-body-md text-text-primary outline-none transition-all placeholder:text-text-secondary/30 focus:border-transparent focus:ring-2 focus:ring-primary-container"
          />
        </label>

        <label className="mt-4 block font-label-md text-label-md text-text-secondary">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-surface-border bg-background/50 px-4 py-3 font-body-md text-body-md text-text-primary outline-none transition-all placeholder:text-text-secondary/30 focus:border-transparent focus:ring-2 focus:ring-primary-container"
          />
        </label>

        {error && <p className="mt-4 font-body-sm text-body-sm text-error">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-primary-container py-3 font-headline-sm text-headline-sm text-on-primary-container transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
