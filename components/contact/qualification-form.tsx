"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import type { Category } from "@/lib/types";
import {
  validateLead,
  type LeadFormErrors,
  type LeadFormValues,
} from "@/lib/validation/lead";
import { submitLead } from "@/app/contact/actions";

// Field list & validation rules below are PLACEHOLDER content — prd.md flags
// the exact field set and rules as [KONFIRMASI] (Open Question #1). This
// implements a reasonable structured-intake pattern (matches Fitur 3's
// acceptance criteria: per-field errors, nothing "saved" on failure,
// confirmation on success) for the user to refine once that's resolved.

type FormState = LeadFormValues;
type FormErrors = LeadFormErrors;

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  category: "",
  eventDate: "",
  needs: "",
  budget: "",
  reference: "",
};

const budgetOptions = [
  { value: "", label: "Pilih kisaran (opsional)" },
  { value: "<5jt", label: "< Rp 5 juta" },
  { value: "5-10jt", label: "Rp 5–10 juta" },
  { value: "10-20jt", label: "Rp 10–20 juta" },
  { value: ">20jt", label: "> Rp 20 juta" },
  { value: "belum-tahu", label: "Belum tahu / perlu didiskusikan" },
];

const fieldClass =
  "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40";

function fieldBorder(hasError: boolean) {
  return hasError ? "border-red-500" : "border-border focus:border-accent";
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-accent">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-muted">(opsional)</span>
        )}
      </label>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function QualificationForm({ categories }: { categories: Category[] }) {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [formError, setFormError] = useState<string | null>(null);
  const formId = useId();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validateLead(values);
    setErrors(validationErrors);
    setFormError(null);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    const result = await submitLead(values);

    if (result.ok) {
      setStatus("success");
      setValues(initialState);
      return;
    }

    setStatus("idle");
    if (result.fieldErrors) {
      setErrors(result.fieldErrors);
    } else {
      setFormError(result.message);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-border bg-surface/60 p-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-accent">
          Terkirim
        </p>
        <h2 className="mt-3 font-display text-2xl font-medium text-foreground">
          Terima kasih, pengajuanmu sudah diterima.
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
          Lenscape akan meninjau detail yang kamu kirim dan menghubungi balik
          lewat email atau nomor telepon yang kamu cantumkan.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
        >
          Kirim pengajuan lain
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6" aria-busy={status === "submitting"}>
      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {formError}
        </p>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${formId}-name`} label="Nama" required error={errors.name}>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className={`${fieldClass} ${fieldBorder(!!errors.name)}`}
          />
        </Field>

        <Field id={`${formId}-email`} label="Email" required error={errors.email}>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={`${fieldClass} ${fieldBorder(!!errors.email)}`}
          />
        </Field>

        <Field id={`${formId}-phone`} label="Nomor telepon" error={errors.phone}>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="08xx-xxxx-xxxx"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={`${fieldClass} ${fieldBorder(!!errors.phone)}`}
          />
        </Field>

        <Field
          id={`${formId}-category`}
          label="Jenis layanan yang diminati"
          required
          error={errors.category}
        >
          <select
            id={`${formId}-category`}
            name="category"
            value={values.category}
            onChange={(e) => update("category", e.target.value)}
            aria-invalid={!!errors.category}
            aria-describedby={
              errors.category ? `${formId}-category-error` : undefined
            }
            className={`${fieldClass} ${fieldBorder(!!errors.category)}`}
          >
            <option value="">Pilih jenis layanan</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${formId}-eventDate`} label="Tanggal acara" error={errors.eventDate}>
          <input
            id={`${formId}-eventDate`}
            name="eventDate"
            type="date"
            value={values.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
            className={`${fieldClass} ${fieldBorder(!!errors.eventDate)}`}
          />
        </Field>

        <Field
          id={`${formId}-budget`}
          label="Budget indikatif"
          error={errors.budget}
          hint="Perkiraan saja, agar Lenscape bisa menyiapkan opsi yang relevan."
        >
          <select
            id={`${formId}-budget`}
            name="budget"
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={`${fieldClass} ${fieldBorder(!!errors.budget)}`}
          >
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id={`${formId}-needs`}
        label="Ceritakan kebutuhanmu"
        required
        error={errors.needs}
        hint="Mis. jenis acara, lokasi, perkiraan jumlah jam, atau gaya yang kamu suka."
      >
        <textarea
          id={`${formId}-needs`}
          name="needs"
          rows={5}
          value={values.needs}
          onChange={(e) => update("needs", e.target.value)}
          aria-invalid={!!errors.needs}
          aria-describedby={errors.needs ? `${formId}-needs-error` : undefined}
          className={`${fieldClass} ${fieldBorder(!!errors.needs)} resize-y`}
        />
      </Field>

      <Field
        id={`${formId}-reference`}
        label="Referensi"
        error={errors.reference}
        hint="Tautan ke moodboard, akun media sosial, atau contoh gaya yang kamu suka (URL)."
      >
        <input
          id={`${formId}-reference`}
          name="reference"
          type="url"
          inputMode="url"
          placeholder="https://..."
          value={values.reference}
          onChange={(e) => update("reference", e.target.value)}
          aria-invalid={!!errors.reference}
          aria-describedby={
            errors.reference ? `${formId}-reference-error` : undefined
          }
          className={`${fieldClass} ${fieldBorder(!!errors.reference)}`}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">
          Kolom bertanda <span className="text-accent">*</span> wajib diisi.
          Pengajuan akan ditinjau secara manual, bukan diputuskan otomatis.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm tracking-wide text-background transition-colors hover:bg-accent disabled:opacity-60"
        >
          {status === "submitting" ? "Mengirim…" : "Kirim Pengajuan"}
        </button>
      </div>
    </form>
  );
}
