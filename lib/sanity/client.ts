import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// SANITY_API_READ_TOKEN is intentionally optional (no throw-if-missing guard):
// the `production` dataset is readable publicly, so the client works without
// it. When present it's used so reads aren't subject to anonymous rate limits
// and can later read drafts if preview mode is added.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_READ_TOKEN || undefined,
  useCdn: true,
  perspective: "published",
});
