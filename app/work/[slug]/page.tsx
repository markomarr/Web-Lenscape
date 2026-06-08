import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/ui/button";
import { getProjectBySlug, getProjects } from "@/lib/data";

const categoryLabels: Record<string, string> = {
  wedding: "Wedding",
  prewedding: "Prewedding",
  product: "Product",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} · Lenscape`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article>
      <header className="mx-auto max-w-6xl px-6 pt-16 sm:px-8 sm:pt-24">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <span aria-hidden="true">←</span> Kembali ke Work
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              {categoryLabels[project.category] ?? project.category}
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          {project.description}
        </p>
      </header>

      <div className="relative mx-auto mt-12 aspect-[16/10] w-full max-w-6xl overflow-hidden rounded-2xl px-0 sm:px-8">
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-surface sm:rounded-2xl">
          <Image
            src={project.coverImage}
            alt={`Foto sampul proyek ${project.title}`}
            fill
            priority
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <h2 className="font-display text-2xl font-medium text-foreground">
          Galeri
        </h2>
        <div className="mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {project.gallery.map((src, index) => (
            <div
              key={src}
              className="relative w-full overflow-hidden rounded-2xl bg-surface"
            >
              <Image
                src={src}
                alt={`Foto ${index + 1} dari proyek ${project.title}`}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:px-8 sm:py-20 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium text-foreground">
              Tertarik dengan gaya seperti ini?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Ceritakan rencana acara atau kebutuhan foto kamu, dan Lenscape
              akan meninjau serta menghubungi balik.
            </p>
          </div>
          <LinkButton href="/contact" variant="primary" className="shrink-0">
            Ajukan Kerja Sama
          </LinkButton>
        </div>
      </section>
    </article>
  );
}
