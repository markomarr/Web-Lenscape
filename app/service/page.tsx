import type { Metadata } from "next";
import Image from "next/image";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Service · Lenscape",
  description:
    "Kenali Lenscape: siapa di balik kamera, dan jenis layanan fotografi yang ditawarkan, yaitu wedding, prewedding, dan product.",
};

const serviceTypes = [
  {
    slug: "wedding",
    title: "Wedding",
    description:
      "Dokumentasi hari pernikahan secara menyeluruh, mulai dari persiapan pagi, prosesi adat, hingga resepsi malam. Fokus pada momen natural dan emosi yang tulus, bukan pose yang dipaksakan.",
    image: "https://picsum.photos/seed/service-wedding/900/700",
  },
  {
    slug: "prewedding",
    title: "Prewedding",
    description:
      "Sesi santai sebelum hari besar, di lokasi yang punya makna personal bagi kalian berdua. Lebih banyak mengobrol dan berjalan daripada berpose kaku, sehingga hasilnya foto yang terasa jujur.",
    image: "https://picsum.photos/seed/service-prewedding/900/700",
  },
  {
    slug: "product",
    title: "Product",
    description:
      "Foto produk untuk kebutuhan katalog, lookbook, atau konten promosi, dengan pencahayaan dan komposisi yang konsisten, siap dipakai untuk e-commerce maupun materi cetak.",
    image: "https://picsum.photos/seed/service-product/900/700",
  },
];

export default function ServicePage() {
  return (
    <div>
      {/* Intro / profile — merges the PRD's "About" content here */}
      <section className="mx-auto max-w-6xl px-6 pb-4 pt-20 sm:px-8 sm:pt-28">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center md:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface">
            <Image
              src="https://picsum.photos/seed/lenscape-profile/800/1000"
              alt="Potret fotografer Lenscape sedang memotret di lokasi"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              Tentang &amp; Layanan
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              Halo, saya yang akan ada di balik kamera.
            </h1>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Lenscape lahir dari kebiasaan kecil: selalu membawa kamera ke
                mana pun pergi, dan senang memperhatikan momen yang orang lain
                sering lewatkan. Dari situ, kebiasaan itu berkembang menjadi
                cara untuk membantu orang lain menyimpan momen penting mereka
                dengan jujur, tanpa berlebihan.
              </p>
              <p>
                Setiap sesi dikerjakan sendiri secara personal, mulai dari
                diskusi awal hingga penyerahan hasil akhir, supaya gaya dan
                kualitasnya tetap konsisten dari klien ke klien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service types */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Jenis layanan"
          title="Apa yang bisa Lenscape bantu"
          description="Tiga fokus layanan utama, masing-masing dengan pendekatan yang disesuaikan dengan kebutuhannya."
        />
        <div className="mt-12 space-y-16">
          {serviceTypes.map((service, index) => (
            <div
              key={service.slug}
              className={`grid gap-8 md:grid-cols-2 md:items-center md:gap-14 ${
                index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface">
                <Image
                  src={service.image}
                  alt={`Contoh hasil dokumentasi layanan ${service.title}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                  {service.description}
                </p>
                <LinkButton
                  href={`/work?kategori=${service.slug}`}
                  variant="secondary"
                  className="mt-6"
                >
                  Lihat karya {service.title.toLowerCase()}
                </LinkButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20 sm:px-8 sm:py-28 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            title="Tertarik bekerja sama?"
            description="Lihat ringkasan paket di halaman Packages, atau langsung ceritakan kebutuhanmu lewat formulir kontak."
          />
          <div className="flex shrink-0 flex-wrap gap-4">
            <LinkButton href="/packages" variant="secondary">
              Lihat Packages
            </LinkButton>
            <LinkButton href="/contact" variant="primary">
              Ajukan Kerja Sama
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
