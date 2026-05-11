import { createClient } from "@supabase/supabase-js";

/**
 * Service Role Client — NEVER use in Client Components.
 * Use only in Server Actions or Route Handlers for privileged operations.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
