"use client";

import { useMemo, useState } from "react";
import type { Category, Project } from "@/lib/types";
import { ProjectCard } from "@/components/work/project-card";

type Props = {
  categories: Category[];
  projects: Project[];
  initialCategory?: string;
};

export function CategoryFilter({ categories, projects, initialCategory }: Props) {
  const validInitial =
    initialCategory && categories.some((c) => c.slug === initialCategory)
      ? initialCategory
      : "all";
  const [active, setActive] = useState<string>(validInitial);

  const chips = useMemo(
    () => [{ title: "Semua", slug: "all" }, ...categories],
    [categories]
  );

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((project) => project.category === active),
    [active, projects]
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter kategori karya"
        className="flex flex-wrap gap-3"
      >
        {chips.map((chip) => {
          const selected = chip.slug === active;
          return (
            <button
              key={chip.slug}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(chip.slug)}
              className={`rounded-full border px-5 py-2 text-sm tracking-wide transition-colors ${
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {chip.title}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Menampilkan {filtered.length} dari {projects.length} proyek
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-muted">
          Belum ada proyek pada kategori ini.
        </p>
      )}
    </div>
  );
}
