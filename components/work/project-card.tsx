import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  wedding: "Wedding",
  prewedding: "Prewedding",
  product: "Product",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface">
        <Image
          src={project.coverImage}
          alt={`Sampul proyek ${project.title}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-medium leading-snug text-foreground">
          {project.title}
        </h3>
        <span className="mt-1 shrink-0 text-xs uppercase tracking-[0.18em] text-muted">
          {categoryLabels[project.category] ?? project.category}
        </span>
      </div>
    </Link>
  );
}
