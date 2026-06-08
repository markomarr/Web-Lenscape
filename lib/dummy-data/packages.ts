import type { ServicePackage } from "@/lib/types";

// Illustrative-only — "Packages" isn't defined in prd.md. Per user direction
// this is informational copy (what's included), deliberately with NO pricing
// and NO booking/checkout, to stay inside the PRD's stated out-of-scope
// boundary on payments & scheduling (Section 1.5).
export const packages: ServicePackage[] = [
  {
    title: "Liputan Wedding Penuh",
    category: "wedding",
    summary:
      "Cakupan satu hari penuh, dari persiapan pagi hingga resepsi malam, dengan tim dua fotografer.",
    includes: [
      "Liputan hingga 10 jam",
      "2 fotografer",
      "Galeri digital teredit",
      "Cetak album pilihan",
    ],
  },
  {
    title: "Liputan Wedding Akad atau Resepsi Saja",
    category: "wedding",
    summary:
      "Cocok untuk pasangan yang hanya membutuhkan dokumentasi salah satu acara inti.",
    includes: [
      "Liputan hingga 5 jam",
      "1 fotografer",
      "Galeri digital teredit",
    ],
  },
  {
    title: "Prewedding Eksplorasi Lokasi",
    category: "prewedding",
    summary:
      "Sesi santai di satu lokasi pilihan, fokus pada cahaya alami dan momen candid.",
    includes: [
      "Sesi 2–3 jam",
      "1 lokasi",
      "Konsultasi konsep & wardrobe",
      "Galeri digital teredit",
    ],
  },
  {
    title: "Prewedding Dua Lokasi",
    category: "prewedding",
    summary:
      "Untuk pasangan yang ingin dua suasana berbeda dalam satu sesi pemotretan.",
    includes: [
      "Sesi setengah hari",
      "2 lokasi",
      "Konsultasi konsep & wardrobe",
      "Galeri digital teredit",
    ],
  },
  {
    title: "Katalog Produk E-commerce",
    category: "product",
    summary:
      "Foto produk konsisten untuk kebutuhan listing toko daring, latar polos atau sesuai brand guideline.",
    includes: [
      "Hingga 20 produk",
      "Pencahayaan studio",
      "Edit warna & crop siap unggah",
    ],
  },
  {
    title: "Lookbook & Lifestyle Produk",
    category: "product",
    summary:
      "Kombinasi flatlay dan sesi suasana untuk materi promosi yang lebih bercerita.",
    includes: [
      "Sesi setengah hari",
      "Flatlay & on-model/lifestyle",
      "Galeri digital teredit",
    ],
  },
];
