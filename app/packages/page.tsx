import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPackages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Packages · Lenscape",
  description:
    "Gambaran cakupan layanan Lenscape per kategori, berupa informasi umum tanpa harga untuk bahan diskusi awal sebelum mengajukan kerja sama.",
};

const categoryLabels: Record<string, string> = {
  wedding: "Wedding",
  prewedding: "Prewedding",
  product: "Product",
};

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="Gambaran layanan"
        title="Packages"
        description="Setiap kebutuhan berbeda-beda, jadi cakupan kerja selalu disesuaikan lewat diskusi singkat lebih dulu. Daftar berikut sekadar gambaran umum apa yang biasanya termasuk, bukan daftar harga."
      />

      <p className="mt-4 max-w-2xl text-sm text-muted">
        Untuk detail biaya dan ketersediaan jadwal, silakan ajukan lewat
        formulir kontak, dan Lenscape akan meninjau serta membalas dengan
        penawaran yang sesuai kebutuhanmu.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.title}
            className="flex flex-col rounded-2xl border border-border p-7"
          >
            <span className="text-xs uppercase tracking-[0.18em] text-accent">
              {categoryLabels[pkg.category] ?? pkg.category}
            </span>
            <h3 className="mt-3 font-display text-xl font-medium text-foreground">
              {pkg.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {pkg.summary}
            </p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/90">
              {pkg.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-[2px] text-accent">
                    ＋
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start gap-6 rounded-2xl border border-border bg-surface/60 px-7 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-medium text-foreground">
            Tidak menemukan yang sesuai?
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
            Tidak masalah, ceritakan saja kebutuhanmu apa adanya. Banyak
            kerja sama justru dimulai dari kebutuhan yang spesifik.
          </p>
        </div>
        <LinkButton href="/contact" variant="primary" className="shrink-0">
          Ajukan Kerja Sama
        </LinkButton>
      </div>
    </div>
  );
}
