// Mirrors the data model sketched in prd.md Section 5.
// Fields marked [KONFIRMASI] in the PRD are intentionally omitted —
// only fields the PRD already confirms are modeled here.

export type Category = {
  title: string;
  slug: string;
};

export type Project = {
  title: string;
  slug: string;
  category: Category["slug"];
  coverImage: string;
  gallery: string[];
  description: string;
  /** Manual display order from CMS (lower = shown first). */
  order: number;
};

/**
 * Illustrative-only content for the Packages page (PRD Open Question:
 * "Packages" isn't defined in the PRD — built per user direction as
 * informational copy with no pricing, no booking/checkout).
 */
export type ServicePackage = {
  title: string;
  category: Category["slug"];
  summary: string;
  includes: string[];
};
