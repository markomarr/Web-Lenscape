import "server-only";
import { client } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { packages } from "@/lib/dummy-data/packages";
import type { Category, Project, ServicePackage } from "@/lib/types";
import type { Image } from "sanity";

// Real Sanity-backed implementations of the async getters described in
// prd.md Section 6. Signatures and return types are unchanged from the
// dummy-data version (lib/data.ts previously wrapped lib/dummy-data/*) — this
// is purely an implementation swap, so every page that imports from here
// keeps working untouched.
//
// `getPackages` stays on dummy data: "Packages" has no Sanity document type in
// scope (prd.md doesn't define it — see lib/types.ts `ServicePackage` comment).

const CACHE_TAGS = {
  categories: "sanity:category",
  projects: "sanity:project",
} as const;

type SanityCategory = {
  title: string;
  slug: string;
};

type SanityProject = {
  title: string;
  slug: string;
  category: string | null;
  coverImage: Image | null;
  gallery: Image[];
  description: string;
  order: number | null;
};

const categoryProjection = `{
  "title": title,
  "slug": slug.current
}`;

const projectProjection = `{
  "title": title,
  "slug": slug.current,
  "category": category->slug.current,
  "coverImage": coverImage,
  "gallery": gallery[],
  "description": description,
  "order": order
}`;

function toImageUrl(image: Image | null | undefined): string {
  if (!image) return "";
  return urlForImage(image).width(1600).fit("crop").url();
}

function mapCategory(doc: SanityCategory): Category {
  return { title: doc.title, slug: doc.slug };
}

function mapProject(doc: SanityProject, index: number): Project {
  return {
    title: doc.title,
    slug: doc.slug,
    category: doc.category ?? "",
    coverImage: toImageUrl(doc.coverImage),
    gallery: doc.gallery.map((image) => toImageUrl(image)),
    description: doc.description,
    // `order` is optional in the schema; fall back to document order so the
    // existing `.sort((a, b) => a.order - b.order)` callers stay stable.
    order: doc.order ?? index,
  };
}

export async function getCategories(): Promise<Category[]> {
  const docs = await client.fetch<SanityCategory[]>(
    `*[_type == "category"] | order(title asc) ${categoryProjection}`,
    {},
    { next: { tags: [CACHE_TAGS.categories] } }
  );
  return docs.map(mapCategory);
}

export async function getProjects(): Promise<Project[]> {
  const docs = await client.fetch<SanityProject[]>(
    `*[_type == "project"] | order(order asc) ${projectProjection}`,
    {},
    { next: { tags: [CACHE_TAGS.projects] } }
  );
  return docs.map(mapProject);
}

export async function getProjectsByCategory(
  categorySlug: string
): Promise<Project[]> {
  const all = await getProjects();
  if (categorySlug === "all") return all;
  return all.filter((project) => project.category === categorySlug);
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const doc = await client.fetch<SanityProject | null>(
    `*[_type == "project" && slug.current == $slug][0] ${projectProjection}`,
    { slug },
    { next: { tags: [CACHE_TAGS.projects] } }
  );
  if (!doc) return undefined;
  return mapProject(doc, 0);
}

export async function getFeaturedProjects(count = 4): Promise<Project[]> {
  const all = await getProjects();
  return all.slice(0, count);
}

export async function getPackages(): Promise<ServicePackage[]> {
  return packages;
}
