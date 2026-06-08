import "server-only";
import { Resend } from "resend";
import {
  leadNotificationSubject,
  leadNotificationText,
} from "@/lib/email/templates/lead-notification";
import type { LeadFormValues } from "@/lib/validation/lead";

// Sends the "ada pengajuan baru" notification to the photographer
// (NOTIFICATION_EMAIL). Per the build brief: a failure here must NEVER block
// the lead submission response — the caller only logs the error.
//
// RESEND_API_KEY / NOTIFICATION_EMAIL are guarded with an informative throw
// (development-time misconfiguration should be loud, not silently swallowed
// into the catch in app/contact/actions.ts).
export async function sendLeadNotification(
  lead: Pick<LeadFormValues, "name" | "email" | "category" | "needs">
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Variabel lingkungan RESEND_API_KEY belum diset. Isi nilainya di " +
        ".env.local (buat API key di resend.com/api-keys)."
    );
  }

  const notificationEmail = process.env.NOTIFICATION_EMAIL;
  if (!notificationEmail) {
    throw new Error(
      "Variabel lingkungan NOTIFICATION_EMAIL belum diset. Isi dengan alamat " +
        "email fotografer yang akan menerima notifikasi pengajuan baru."
    );
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    // Resend's shared sandbox sender — works without domain verification.
    // Replace with an address on a verified domain before going to production.
    from: "Lenscape <onboarding@resend.dev>",
    to: notificationEmail,
    replyTo: lead.email,
    subject: leadNotificationSubject(lead),
    text: leadNotificationText(lead),
  });
}
