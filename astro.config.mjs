// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

const setLayout = () => {
  // @ts-ignore
  return function (_, file) {
    file.data.astro.frontmatter.layout =
      file.data.astro.frontmatter.layout || "@layouts/markdown.astro";
  };
};

// https://astro.build/config
export default defineConfig({
  prefetch: {
    defaultStrategy: "viewport",
  },
  markdown: {
    remarkPlugins: [setLayout],
  },
  site: "https://tam11a.dev",
  integrations: [
    mdx(),
    tailwind(),
    icon({
      include: {
        lucide: ["*"],
        "vscode-icons": ["*"],
      },
    }),
    sitemap(),
  ],
});
