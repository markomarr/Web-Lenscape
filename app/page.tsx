import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/work/project-card";
import { getCategories, getFeaturedProjects } from "@/lib/data";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProjects(4),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden">
        <Image
          src="https://picsum.photos/seed/lenscape-hero/2000/1200"
          alt="Pasangan pengantin berjalan di tepi pantai saat matahari terbenam"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-32 sm:px-8 sm:pb-24">
          <p className="text-xs uppercase tracking-[0.25em] text-white/80">
            Fotografer · Wedding · Prewedding · Product
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Mengabadikan momen yang akan kamu ceritakan ulang bertahun-tahun
            kemudian.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
            Lenscape membantu kamu mendokumentasikan hari penting, mulai dari
            pernikahan, sesi prewedding, hingga kebutuhan foto produk, dengan
            pendekatan yang tenang dan personal.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/work" variant="primary" className="bg-white text-foreground hover:bg-accent hover:text-white">
              Lihat Karya
            </LinkButton>
            <LinkButton
              href="/contact"
              variant="secondary"
              className="border-white/50 text-white hover:border-accent hover:text-accent"
            >
              Ajukan Kerja Sama
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Identity teaser */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:gap-16">
          <SectionHeading
            eyebrow="Tentang Lenscape"
            title="Bercerita lewat foto, bukan sekadar dokumentasi."
          />
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>
              Lenscape adalah studio fotografi satu orang yang berfokus pada
              momen alami, gestur kecil, ekspresi spontan, dan suasana yang
              sering terlewat saat acara berlangsung. Pendekatan kerja dibuat
              santai agar kamu bisa menjadi diri sendiri di depan kamera.
            </p>
            <Link
              href="/service"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
            >
              Kenali layanan & cara kerja Lenscape
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="border-t border-border/70 bg-surface/60 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Pilihan karya"
              title="Beberapa proyek terbaru"
              description="Sebagian kecil dari dokumentasi yang pernah dikerjakan. Lihat lebih lengkap di halaman Work."
            />
            <LinkButton href="/work" variant="secondary">
              Lihat semua karya
            </LinkButton>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Category teaser */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Jenis layanan"
          title="Telusuri karya berdasarkan kategori"
          description="Setiap kategori punya nuansa dan pendekatan kerja yang berbeda."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/work?kategori=${category.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-border px-6 py-5 transition-colors hover:border-accent"
            >
              <span className="font-display text-lg font-medium text-foreground">
                {category.title}
              </span>
              <span
                aria-hidden="true"
                className="text-muted transition-colors group-hover:text-accent"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20 sm:px-8 sm:py-28 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            title="Punya rencana acara atau kebutuhan foto produk?"
            description="Ceritakan kebutuhanmu lewat formulir singkat, dan Lenscape akan meninjau serta menghubungi balik."
          />
          <LinkButton href="/contact" variant="primary" className="shrink-0">
            Ajukan Kerja Sama
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
