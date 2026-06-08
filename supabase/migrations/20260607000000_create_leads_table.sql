-- Fitur 3 / 4 (prd.md) — tabel pendaftar/calon klien ("leads").
-- Kolom mengikuti field di components/contact/qualification-form.tsx, yang
-- ditandai "subject to change" — PRD Section 8 Open Question #1 (daftar field
-- form belum final/[KONFIRMASI]).
--
-- Status hanya tiga nilai untuk MVP per keputusan Open Question #4 (tidak ada
-- "ditolak"/arsip).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'baru'
    check (status in ('baru', 'ditinjau', 'disetujui')),

  name text not null,
  email text not null,
  phone text,
  category text not null,
  event_date date,
  needs text not null,
  budget text,
  reference text
);

comment on table public.leads is
  'Pendaftar/calon klien dari form kualifikasi publik (Fitur 3, prd.md). Berisi PII — dilindungi via RLS di bawah.';

alter table public.leads enable row level security;

-- INSERT: tidak ada policy untuk anon/authenticated — baris hanya bisa masuk
-- lewat server action yang memakai Supabase service_role key (yang melewati
-- RLS sepenuhnya). Ini mencerminkan "INSERT hanya dari server" di prd.md.

-- SELECT & UPDATE: hanya untuk admin yang sudah login (Supabase Auth).
-- Skala kecil — satu akun admin (PRD Section 1.3) — sehingga "authenticated"
-- sudah cukup tanpa kolom role tambahan.
create policy "Admin terautentikasi dapat melihat leads"
  on public.leads
  for select
  to authenticated
  using (true);

create policy "Admin terautentikasi dapat memperbarui status leads"
  on public.leads
  for update
  to authenticated
  using (true)
  with check (true);
