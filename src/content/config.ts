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
    ogImage: z.string().optional(),
    ogpTitle: z.string().optional(),
    ogpTemplate: z.enum([
      'corporate-light',
      'corporate-dark',
      'corporate-editorial',
      'photo-overlay',
      'hero-stat-dominant',
      'magazine-editorial',
      'diagonal-asymmetric',
    ]).optional(),
    heroStat: z.object({
      label: z.string(),
      value: z.string(),
      percent: z.number().optional(),
    }).optional(),
    draft: z.boolean().default(false),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).optional(),
    series: z.enum([
      'amr',
      'vaccine-adult',
      'vaccine-rsv',
      'sti',
      'travel',
      'outbreak-news',
      'pediatric',
      'other',
    ]).optional(),
    isPillar: z.boolean().default(false),
    relatedSlugs: z.array(z.string()).optional(),
  }),
});

export const SERIES_LABELS: Record<string, string> = {
  'amr': '薬剤耐性菌・抗菌薬選択',
  'vaccine-adult': '成人ワクチン',
  'vaccine-rsv': 'RSウイルス予防',
  'sti': '性感染症（STI）',
  'travel': '渡航・帰国後',
  'outbreak-news': '流行ニュース',
  'pediatric': '小児・親世代向け',
  'other': 'その他',
};

export const collections = { blog };
