import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { QualificationForm } from "@/components/contact/qualification-form";
import { getCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact · Lenscape",
  description:
    "Ajukan kerja sama dengan Lenscape lewat formulir singkat. Ceritakan kebutuhanmu, dan tim akan meninjau secara manual.",
};

export default async function ContactPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Mulai dari sini"
            title="Ajukan kerja sama"
            description="Isi formulir berikut dengan data yang sebenarnya. Setiap pengajuan ditinjau secara manual, bukan diputuskan otomatis, dan akan dibalas lewat email atau telepon yang kamu cantumkan."
          />

          <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted">
            <div>
              <p className="text-foreground">Email</p>
              <a
                href="mailto:halo@lenscape.id"
                className="transition-colors hover:text-accent"
              >
                halo@lenscape.id
              </a>
            </div>
            <div>
              <p className="text-foreground">Berbasis di</p>
              <p>Indonesia, terbuka untuk kerja sama lintas kota</p>
            </div>
            <p className="border-t border-border/70 pt-6 text-xs text-muted">
              Validasi gagal? Kamu akan melihat keterangan pada kolom yang
              perlu diperbaiki, dan formulir tidak akan terkirim sampai semua
              terisi dengan benar.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-6 sm:p-9">
          <QualificationForm categories={categories} />
        </div>
      </div>
    </div>
  );
}
