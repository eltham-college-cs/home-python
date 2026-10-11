// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypePython from './src/lib/rehype-python.ts';
import videoCheck from './src/lib/video-check.ts';

export default defineConfig({
  site: 'https://eltham-college-cs.github.io',
  base: '/home-python',
  trailingSlash: 'always',
  integrations: [mdx(), videoCheck()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [rehypePython],
  },
  build: { format: 'directory' },
});
