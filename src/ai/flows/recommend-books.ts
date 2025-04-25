'use server';
/**
 * @fileOverview A book recommendation AI agent that suggests books based on user prompts and interests, categorized by difficulty levels.
 *
 * - recommendBooks - A function that handles the book recommendation process.
 * - RecommendBooksInput - The input type for the recommendBooks function.
 * - RecommendBooksOutput - The return type for the recommendBooks function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getBookRecommendations} from '@/services/book-recommendation';

const RecommendBooksInputSchema = z.object({
  prompt: z.string().describe('The user prompt requesting book recommendations.'),
  interests: z.array(z.string()).describe('A list of the user\'s interests.'),
});
export type RecommendBooksInput = z.infer<typeof RecommendBooksInputSchema>;

const RecommendBooksOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      title: z.string().describe('The title of the book.'),
      author: z.string().describe('The author of the book.'),
      difficulty: z.string().describe('The difficulty level of the book (Beginner, Intermediate, Advanced).'),
    })
  ).describe('A list of book recommendations based on the prompt.'),
});
export type RecommendBooksOutput = z.infer<typeof RecommendBooksOutputSchema>;

export async function recommendBooks(input: RecommendBooksInput): Promise<RecommendBooksOutput> {
  return recommendBooksFlow(input);
}

const recommendBooksPrompt = ai.definePrompt({
  name: 'recommendBooksPrompt',
  input: {
    schema: z.object({
      prompt: z.string().describe('The user prompt requesting book recommendations.'),
      interests: z.array(z.string()).describe('A list of the user\'s interests.'),
    }),
  },
  output: {
    schema: z.object({
      recommendations: z.array(
        z.object({
          title: z.string().describe('The title of the book.'),
          author: z.string().describe('The author of the book.'),
          difficulty: z.string().describe('The difficulty level of the book (Beginner, Intermediate, Advanced).'),
        })
      ).describe('A list of book recommendations based on the prompt.'),
    }),
  },
  prompt: `You are a book recommendation expert. Based on the user's prompt and interests, you will provide a list of book recommendations.

  User Prompt: {{{prompt}}}
  User Interests: {{interests}}

  Return an array of book recommendations. The difficulty level should be appropriate for the user's background in computer science. If interests includes "AI", then make sure to include AI related books.
  `,
});

const recommendBooksFlow = ai.defineFlow<
  typeof RecommendBooksInputSchema,
  typeof RecommendBooksOutputSchema
>({
  name: 'recommendBooksFlow',
  inputSchema: RecommendBooksInputSchema,
  outputSchema: RecommendBooksOutputSchema,
}, async (input) => {
  // Call the getBookRecommendations service to get initial recommendations
  // based on interest and difficulty.
  const recommendations = await getBookRecommendations(input.interests, 'Beginner');
  const { output } = await recommendBooksPrompt(input);

  return {
    recommendations: output!.recommendations,
  };
});
