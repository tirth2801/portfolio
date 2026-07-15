import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    repoUrl: z.string().url(),
    liveUrl: z.string().url().optional(),
    image: z.string().optional(),
    icon: z.string().optional(),
    order: z.number(),
    featured: z.boolean().default(true),
    stack: z.array(z.string()).optional(),
    outcome: z.string().optional(),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dates: z.string(),
    image: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { projects, work };
