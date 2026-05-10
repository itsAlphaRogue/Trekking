"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Show error when middleware or layout redirected here with ?error=not_admin
  useEffect(() => {
    if (searchParams.get("error") === "not_admin") {
      setError(
        "Your account does not have admin access. Contact the site owner to be granted access.",
      );
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    // Step 1 — authenticate
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Step 2 — explicitly set session so the next DB query runs as this user
    // This ensures RLS policies see the correct auth.uid()
    await supabase.auth.setSession({
      access_token: authData.session!.access_token,
      refresh_token: authData.session!.refresh_token,
    });

    // Step 3 — check role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    // Log to browser console so you can see exactly what comes back
    console.log("[admin-login] profile result:", { profile, profileError });

    if (!profile || profile.role !== "admin") {
      await supabase.auth.signOut();
      setError(
        "Your account does not have admin access. Contact the site owner to be granted access.",
      );
      setLoading(false);
      return;
    }

    // Step 4 — admin confirmed, go to dashboard
    router.push("/admin/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center mx-auto mb-4">
            <span
              className="material-symbols-outlined text-on-primary-container text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              landscape
            </span>
          </div>
          <h1 className="font-serif text-2xl font-semibold text-primary">
            Himalayan Vistas
          </h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-outline mt-1 font-sans">
            Admin Console
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-outline-variant rounded-lg p-8">
          <h2 className="font-serif text-xl font-semibold text-on-surface mb-6">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@himalayanvistas.com"
                className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 font-sans">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container-lowest border-b border-secondary px-0 py-3 text-sm font-sans focus:outline-none focus:border-primary transition-colors placeholder:text-on-surface-variant/50"
              />
            </div>

            {error && (
              <div className="bg-error-container text-error rounded px-4 py-3 text-sm font-sans flex items-start gap-2">
                <span className="material-symbols-outlined text-base shrink-0 mt-0.5">
                  error
                </span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-3 font-serif text-base hover:bg-primary-container transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">
                    progress_activity
                  </span>
                  Checking access…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-outline font-sans mt-6">
          Restricted to authorised admin personnel only.
        </p>
      </div>
    </div>
  );
}

// Wrap in Suspense — required because useSearchParams needs it
export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
