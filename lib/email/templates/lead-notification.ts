import type { LeadFormValues } from "@/lib/validation/lead";

// Notifikasi internal ke fotografer saat ada pengajuan baru (Fitur 4,
// prd.md). Singkat & profesional, Bahasa Indonesia, per arahan build.
export function leadNotificationSubject(lead: Pick<LeadFormValues, "name">) {
  return `Pengajuan baru dari ${lead.name} — Lenscape`;
}

export function leadNotificationText(
  lead: Pick<LeadFormValues, "name" | "email" | "category" | "needs">
) {
  return [
    "Ada pengajuan kerja sama baru lewat formulir kualifikasi Lenscape.",
    "",
    `Nama     : ${lead.name}`,
    `Email    : ${lead.email}`,
    `Kategori : ${lead.category}`,
    "",
    "Kebutuhan:",
    lead.needs,
    "",
    "Detail lengkap dan status pengajuan dapat ditinjau di dashboard admin.",
  ].join("\n");
}
