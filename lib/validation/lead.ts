// Shared between components/contact/qualification-form.tsx (client-side
// validation, instant feedback) and app/contact/actions.ts (authoritative
// server-side validation). Keeping the rules in one place means the two
// layers can't drift apart.
//
// Field list itself is PLACEHOLDER — prd.md Section 8 Open Question #1 flags
// the final field set/rules as [KONFIRMASI].

export type LeadFormValues = {
  name: string;
  email: string;
  phone: string;
  category: string;
  eventDate: string;
  needs: string;
  budget: string;
  reference: string;
};

export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

// Mirrors the CHECK constraint in
// supabase/migrations/20260607000000_create_leads_table.sql — Open Question
// #4 decided exactly these three statuses for MVP (no "ditolak"/arsip).
export const LEAD_STATUSES = ["baru", "ditinjau", "disetujui"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

// Shape of a `leads` row as used by the admin dashboard — camelCase mirror of
// the snake_case Postgres columns (mapped in app/api/admin/leads/route.ts).
export type Lead = {
  id: string;
  createdAt: string;
  status: LeadStatus;
  name: string;
  email: string;
  phone: string | null;
  category: string;
  eventDate: string | null;
  needs: string;
  budget: string | null;
  reference: string | null;
};

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const urlPattern = /^https?:\/\/.+/i;
export const NEEDS_MIN_LENGTH = 20;

// Single source of truth for validation rules — used for both the client's
// instant per-field feedback AND the server action's authoritative check
// ("Jika validasi gagal di server: return error per-field, jangan insert").
// Keeping one copy means the two layers can't silently drift apart.
export function validateLead(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Nama wajib diisi.";
  }

  if (!values.email.trim()) {
    errors.email = "Email wajib diisi.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Format email belum sesuai (contoh: nama@email.com).";
  }

  if (!values.category) {
    errors.category = "Pilih salah satu jenis layanan yang kamu minati.";
  }

  if (!values.needs.trim()) {
    errors.needs = "Ceritakan dulu kebutuhanmu secara singkat.";
  } else if (values.needs.trim().length < NEEDS_MIN_LENGTH) {
    errors.needs = `Mohon jelaskan sedikit lebih detail (minimal ${NEEDS_MIN_LENGTH} karakter).`;
  }

  if (values.reference.trim() && !urlPattern.test(values.reference.trim())) {
    errors.reference =
      "Gunakan tautan (URL) yang diawali dengan http:// atau https://.";
  }

  return errors;
}
