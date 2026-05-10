import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser client — use inside Client Components ("use client").
 * Creates a new instance on every call (safe: SSR caches it per request).
 *
 * Usage:
 *   const supabase = createClient()
 *   const { data } = await supabase.from("treks").select("*")
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
