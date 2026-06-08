import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./env";

// Browser client (anon key) for Client Components — e.g. the admin login form
// calling `supabase.auth.signInWithPassword`.
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
