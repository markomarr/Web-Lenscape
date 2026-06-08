import { defineField, defineType } from "sanity";

// Mirrors lib/types.ts `Category` ({ title, slug }). prd.md Section 5 marks
// this document type itself as [KONFIRMASI] ("hanya jika kategori dinamis") —
// modeled here as a real document type so `project.category` can reference it.
export const category = defineType({
  name: "category",
  title: "Kategori",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nama kategori",
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
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
