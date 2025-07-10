// src/ai/flows/product-recommendations.ts
'use server';

/**
 * @fileOverview Flow for generating AI-powered product recommendations.
 *
 * - productRecommendations - A function that returns a list of product recommendations.
 * - ProductRecommendationsInput - The input type for the productRecommendations function.
 * - ProductRecommendationsOutput - The return type for the productRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  userPurchaseHistory: z
    .array(z.string())
    .describe('List of product IDs the user has purchased.'),
  userBrowsingHistory: z
    .array(z.string())
    .describe('List of product IDs the user has browsed.'),
  trendingProducts: z
    .array(z.string())
    .describe('List of trending product IDs in the store.'),
  newlyLaunchedProducts: z
    .array(z.string())
    .describe('List of newly launched product IDs in the store.'),
  ratingsAndReviews: z
    .record(z.string(), z.object({
      rating: z.number().min(1).max(5),
      review: z.string(),
    }))
    .describe('A map of product IDs to their ratings and reviews.'),
});
export type ProductRecommendationsInput = z.infer<
  typeof ProductRecommendationsInputSchema
>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProductIds: z
    .array(z.string())
    .describe('List of product IDs recommended for the user.'),
});
export type ProductRecommendationsOutput = z.infer<
  typeof ProductRecommendationsOutputSchema
>;

export async function productRecommendations(
  input: ProductRecommendationsInput
): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are an expert e-commerce product recommendation engine.

  Based on the user's purchase history, browsing history, trending products, and newly launched products, you will recommend a list of products that the user might be interested in.

  User Purchase History: {{userPurchaseHistory}}
  User Browsing History: {{userBrowsingHistory}}
  Trending Products: {{trendingProducts}}
  Newly Launched Products: {{newlyLaunchedProducts}}
  Ratings and Reviews: {{ratingsAndReviews}}

  Please provide a list of recommended product IDs.
  Ensure that the recommendations are relevant to the user's interests and preferences.
  Do not include product IDs that the user has already purchased.
  Consider the ratings and reviews of the products when making recommendations.
  The product recommendations should be diverse and cover a range of product categories.
  Prioritize trending and newly launched products that align with the user's interests.
  Only return a JSON array of product ids.
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

