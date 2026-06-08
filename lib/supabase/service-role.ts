import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabaseUrl } from "./env";

// Service-role client — bypasses RLS entirely. Used ONLY by the public lead
// submission server action to INSERT into `leads` (prd.md decision: "INSERT
// hanya dari server (via service_role key)"). Never expose this client or its
// key to the browser.
function requireServiceRoleKey(): string {
  const value = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!value) {
    throw new Error(
      "Variabel lingkungan SUPABASE_SERVICE_ROLE_KEY belum diset. Isi nilainya " +
        "di .env.local (Project Settings → API → service_role key di supabase.com/dashboard)."
    );
  }
  return value;
}

export function createServiceRoleClient() {
  return createSupabaseClient(supabaseUrl, requireServiceRoleKey(), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
