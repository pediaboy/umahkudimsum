import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client. Uses the service-role key so all `uk_` tables can
 * keep RLS enabled with zero public policies (default deny) — nothing sensitive
 * is ever reachable from the browser bundle.
 */
export function serverClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
