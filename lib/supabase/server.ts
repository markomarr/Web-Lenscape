import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./env";

// Session-bound server client (anon key + request cookies). Respects RLS —
// this is what admin Server Components / Server Actions / Route Handlers use
// to check `auth.getUser()` and to read/update `leads` as the logged-in admin.
//
// Cookie writes are wrapped in try/catch: Server Components can't set cookies,
// and that's fine here because proxy.ts (lib/supabase middleware-equivalent)
// is responsible for refreshing the session cookie on every request.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Ignored — called from a Server Component.
        }
      },
    },
  });
}
