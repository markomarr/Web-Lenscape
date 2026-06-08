// Guarded reads for Supabase env vars — informative throw in development
// rather than a silent failure (e.g. supabase-js connecting to "undefined").

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Variabel lingkungan ${name} belum diset. Isi nilainya di .env.local ` +
        `(lihat komentar di file tersebut untuk cara mendapatkannya dari supabase.com/dashboard).`
    );
  }
  return value;
}

export const supabaseUrl = required(
  "NEXT_PUBLIC_SUPABASE_URL",
  process.env.NEXT_PUBLIC_SUPABASE_URL
);

export const supabaseAnonKey = required(
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
