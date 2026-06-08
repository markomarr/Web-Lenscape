"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "@/lib/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

// Embedded Studio config — served at /studio (app/studio/[[...tool]]/page.tsx).
export default defineConfig({
  basePath: "/studio",
  name: "lenscape",
  title: "Lenscape Studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
