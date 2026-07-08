import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      ingress: z.string(),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
          })
        )
        .optional(),
      servings: z.number().optional(),
      prepTime: z.string().optional(),
      cookTime: z.string().optional(),
      totalTime: z.string().optional(),
      difficulty: z.enum(['Enkel', 'Middels', 'Avansert']).optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).default([]),
      // Ingredienser kan grupperes, f.eks. "Deig" og "Fyll".
      ingredientGroups: z
        .array(
          z.object({
            heading: z.string().optional(),
            items: z.array(z.string()),
          })
        )
        .default([]),
      instructions: z.array(z.string()).default([]),
      tips: z.array(z.string()).default([]),
      publishedAt: z.coerce.date(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { recipes };
