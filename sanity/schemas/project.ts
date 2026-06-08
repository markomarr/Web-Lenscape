import { defineField, defineType } from "sanity";

// Mirrors lib/types.ts `Project`. prd.md Section 5 marks `category`'s type
// (reference vs. enum) and `description`'s format (text vs. portable text) as
// [KONFIRMASI] — modeled here as a reference to `category` and a plain text
// field, which is the minimum-reasonable reading of the PRD sketch and keeps
// `lib/data.ts`'s existing `Project` shape (string `category`, string
// `description`) intact after GROQ projection.
export const project = defineType({
  name: "project",
  title: "Proyek",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul proyek",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Gambar sampul",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galeri",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Urutan tampil",
      description: "Angka lebih kecil tampil lebih dulu.",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Urutan tampil",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "coverImage",
    },
  },
});
