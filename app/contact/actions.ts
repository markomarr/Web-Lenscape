"use server";

import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { sendLeadNotification } from "@/lib/email/send-lead-notification";
import {
  validateLead,
  type LeadFormErrors,
  type LeadFormValues,
} from "@/lib/validation/lead";

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; fieldErrors: LeadFormErrors; message?: undefined }
  | { ok: false; fieldErrors?: undefined; message: string };

const GENERIC_ERROR_MESSAGE =
  "Terjadi kendala saat mengirim pengajuan. Coba lagi dalam beberapa saat.";

// Fitur 3 (prd.md): validate -> insert ke Supabase `leads` -> kirim notifikasi
// email. Per keputusan build:
// - "Jika validasi gagal di server: return error per-field, jangan insert"
// - "INSERT hanya dari server (via service_role key)"
// - "Jika email gagal: INSERT tetap berhasil, log error, jangan block response"
export async function submitLead(
  values: LeadFormValues
): Promise<SubmitLeadResult> {
  const fieldErrors = validateLead(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("leads").insert({
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim() || null,
    category: values.category,
    event_date: values.eventDate || null,
    needs: values.needs.trim(),
    budget: values.budget || null,
    reference: values.reference.trim() || null,
  });

  if (error) {
    console.error("[submitLead] gagal insert ke Supabase:", error);
    return { ok: false, message: GENERIC_ERROR_MESSAGE };
  }

  try {
    await sendLeadNotification({
      name: values.name.trim(),
      email: values.email.trim(),
      category: values.category,
      needs: values.needs.trim(),
    });
  } catch (notificationError) {
    // Insert sudah berhasil — jangan gagalkan response ke user karena email.
    console.error(
      "[submitLead] gagal mengirim notifikasi email:",
      notificationError
    );
  }

  return { ok: true };
}
