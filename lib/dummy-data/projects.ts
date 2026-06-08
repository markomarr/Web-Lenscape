import type { Project } from "@/lib/types";

// Stand-in for Sanity `project` documents (PRD Section 5). Images are sourced
// from a seeded placeholder service so every load is stable; coverImage uses
// a 4:5 aspect, gallery images a 4:3 aspect — both are illustrative only.
const cover = (seed: string) => `https://picsum.photos/seed/${seed}/800/1000`;
const shot = (seed: string, i: number) =>
  `https://picsum.photos/seed/${seed}-${i}/1200/900`;

const gallery = (seed: string, count: number) =>
  Array.from({ length: count }, (_, i) => shot(seed, i + 1));

export const projects: Project[] = [
  {
    title: "Pernikahan Adat Jawa, Andra & Salsa",
    slug: "pernikahan-andra-salsa",
    category: "wedding",
    coverImage: cover("pernikahan-andra-salsa"),
    gallery: gallery("pernikahan-andra-salsa", 6),
    description:
      "Liputan prosesi adat hingga resepsi di Yogyakarta, dari siraman pagi hari sampai tarian terakhir di lantai dansa. Fokus pada momen-momen kecil yang luput dari mata tamu undangan.",
    order: 1,
  },
  {
    title: "Prewedding di Tepi Danau, Galih & Hana",
    slug: "prewedding-galih-hana",
    category: "prewedding",
    coverImage: cover("prewedding-galih-hana"),
    gallery: gallery("prewedding-galih-hana", 5),
    description:
      "Sesi golden hour di tepi danau dengan palet warna hangat. Konsep santai, lebih banyak berjalan dan mengobrol daripada berpose kaku, sehingga hasilnya foto yang terasa jujur.",
    order: 2,
  },
  {
    title: "Katalog Sepatu Kanvas Footwear",
    slug: "katalog-kanvas-footwear",
    category: "product",
    coverImage: cover("katalog-kanvas-footwear"),
    gallery: gallery("katalog-kanvas-footwear", 5),
    description:
      "Sesi katalog untuk koleksi musim panas Kanvas Footwear. Pencahayaan studio konsisten agar warna produk akurat di seluruh rangkaian foto, siap pakai untuk e-commerce dan materi cetak.",
    order: 3,
  },
  {
    title: "Resepsi Garden Party, Bima & Citra",
    slug: "resepsi-bima-citra",
    category: "wedding",
    coverImage: cover("resepsi-bima-citra"),
    gallery: gallery("resepsi-bima-citra", 6),
    description:
      "Resepsi outdoor bertema garden party menjelang senja. Liputan dua fotografer untuk menangkap momen di pelaminan sekaligus interaksi spontan para tamu.",
    order: 4,
  },
  {
    title: "Golden Hour di Perbukitan, Irfan & Joya",
    slug: "prewedding-irfan-joya",
    category: "prewedding",
    coverImage: cover("prewedding-irfan-joya"),
    gallery: gallery("prewedding-irfan-joya", 5),
    description:
      "Perjalanan singkat ke perbukitan untuk mengejar cahaya sore. Lokasi dipilih bersama pasangan agar suasana terasa personal, bukan sekadar latar belakang.",
    order: 5,
  },
  {
    title: "Sesi Produk Seduh Kopi Nusantara",
    slug: "produk-seduh-kopi",
    category: "product",
    coverImage: cover("produk-seduh-kopi"),
    gallery: gallery("produk-seduh-kopi", 4),
    description:
      "Still life untuk peluncuran varian biji kopi baru. Komposisi hangat dan tekstur dekat untuk menonjolkan detail kemasan serta proses seduh.",
    order: 6,
  },
  {
    title: "Pernikahan Intimate, Faisal & Nadia",
    slug: "pernikahan-faisal-nadia",
    category: "wedding",
    coverImage: cover("pernikahan-faisal-nadia"),
    gallery: gallery("pernikahan-faisal-nadia", 5),
    description:
      "Pemberkatan intimate dengan tamu terbatas di sebuah rumah tua. Suasana hangat dan dekat membuat dokumentasi terasa lebih seperti album keluarga.",
    order: 7,
  },
  {
    title: "Prewedding Konsep Urban, Kevin & Lara",
    slug: "prewedding-kevin-lara",
    category: "prewedding",
    coverImage: cover("prewedding-kevin-lara"),
    gallery: gallery("prewedding-kevin-lara", 5),
    description:
      "Eksplorasi sudut-sudut kota, gang sempit, neon toko, dan trotoar sore hari. Cocok untuk pasangan yang ingin nuansa candid dan modern.",
    order: 8,
  },
  {
    title: "Lookbook Aksesori Rana Jewelry",
    slug: "lookbook-rana-jewelry",
    category: "product",
    coverImage: cover("lookbook-rana-jewelry"),
    gallery: gallery("lookbook-rana-jewelry", 4),
    description:
      "Lookbook koleksi perhiasan musim ini, memadukan flatlay close-up dengan sesi on-model untuk memperlihatkan skala dan cara pakai setiap potongan.",
    order: 9,
  },
];
