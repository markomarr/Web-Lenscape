// Per the build brief: env vars used here must guard clearly — throw an
// informative error in development rather than silently producing a broken
// client (e.g. requests to project id "undefined").

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Variabel lingkungan ${name} belum diset. Isi nilainya di .env.local ` +
        `(lihat komentar di file tersebut untuk cara mendapatkannya dari sanity.io/manage).`
    );
  }
  return value;
}

export const projectId = required(
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
);

export const dataset = required(
  "NEXT_PUBLIC_SANITY_DATASET",
  process.env.NEXT_PUBLIC_SANITY_DATASET
);

export const apiVersion = "2025-01-01";
