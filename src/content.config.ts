import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const featured = defineCollection({
  type: "content_layer",
  loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/pages/work" }),
  schema: z.object({
    index: z.number(),
    name: z.string(),
    logo: z.string(),
    featured: z.string().optional(),
    role: z.string(),
    type: z.string(),
    timeline: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  featured,
};
