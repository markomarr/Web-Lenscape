import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { CategoryFilter } from "@/components/work/category-filter";
import { getCategories, getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work · Lenscape",
  description:
    "Jelajahi portofolio Lenscape: dokumentasi wedding, prewedding, dan product, dapat difilter per kategori.",
};

type Props = {
  searchParams: Promise<{ kategori?: string }>;
};

export default async function WorkPage({ searchParams }: Props) {
  const { kategori } = await searchParams;
  const [projects, categories] = await Promise.all([
    getProjects(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="Portofolio"
        title="Work"
        description="Kumpulan proyek yang pernah didokumentasikan Lenscape. Pilih kategori untuk menyaring, atau klik salah satu karya untuk melihat ceritanya secara lengkap."
      />

      <div className="mt-12">
        <CategoryFilter
          categories={categories}
          projects={projects}
          initialCategory={kategori}
        />
      </div>
    </div>
  );
}
