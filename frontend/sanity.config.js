import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { codeInput } from "@sanity/code-input";

export default defineConfig({
  name: "default",
  title: "Ria Choi Blog",
  basePath: "/studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lvpvhyay",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "blog",

  plugins: [
    structureTool(),
    codeInput(),
  ],

    releases: {
        enabled: false,
    },

  schema: {
    types: schemaTypes,
  },
});