import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    slides: z.array(z.string()).optional(),
    shopItem: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const shop = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    currency: z.string().default('JPY'),
    gumroadUrl: z.string().optional(),
    previewImages: z.array(z.string()).default([]),
    category: z.enum(['svg-icons', 'pptx-template', 'guide']),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, shop };
