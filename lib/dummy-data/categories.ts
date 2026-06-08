import type { Category } from "@/lib/types";

// Stand-in for Sanity `category` documents (PRD Section 5 — kategori dinamis,
// Open Question #8). Slugs double as filter keys on /work.
export const categories: Category[] = [
  { title: "Wedding", slug: "wedding" },
  { title: "Prewedding", slug: "prewedding" },
  { title: "Product", slug: "product" },
];
