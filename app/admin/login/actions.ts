"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Open Question #10 — decided: email + password via Supabase Auth, no public
// signup (accounts are created manually in the Supabase dashboard).

export type LoginState = { error: string } | null;

export async function signIn(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan kata sandi wajib diisi." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Email atau kata sandi salah." };
  }

  redirect("/admin");
}
