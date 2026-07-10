import { createClient, type ClientConfig } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config: ClientConfig = {
  projectId: '6s8gofp5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
};

export const sanityClient = createClient(config);

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

export interface IngredientGroup {
  heading?: string;
  items: string[];
}

export interface SanityImage {
  asset?: { _ref: string };
  alt?: string;
}

export interface Recipe {
  _id: string;
  title: string;
  slug: string;
  ingress: string;
  heroImage?: SanityImage;
  servings?: number;
  prepTime?: string;
  totalTime?: string;
  difficulty?: string;
  category?: string;
  tags: string[];
  ingredientGroups: IngredientGroup[];
  instructions: string[];
  tips: string[];
  publishedAt: string;
}

const recipeProjection = `{
  _id,
  title,
  "slug": slug.current,
  ingress,
  heroImage,
  servings,
  prepTime,
  totalTime,
  difficulty,
  category,
  "tags": coalesce(tags, []),
  "ingredientGroups": coalesce(ingredientGroups, []),
  "instructions": coalesce(instructions, []),
  "tips": coalesce(tips, []),
  publishedAt
}`;

export async function getRecipes(): Promise<Recipe[]> {
  return sanityClient.fetch(
    `*[_type == "recipe" && defined(slug.current)] | order(publishedAt desc) ${recipeProjection}`
  );
}

export async function getRecipeSlugs(): Promise<string[]> {
  return sanityClient.fetch(
    `*[_type == "recipe" && defined(slug.current)].slug.current`
  );
}

export async function getRecipe(slug: string): Promise<Recipe | null> {
  return sanityClient.fetch(
    `*[_type == "recipe" && slug.current == $slug][0] ${recipeProjection}`,
    { slug }
  );
}
