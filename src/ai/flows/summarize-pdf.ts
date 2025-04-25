// Implemented PDF summarization and question generation flow.
'use server';
/**
 * @fileOverview A PDF summarization and question generation AI agent.
 *
 * - summarizePdf - A function that handles the PDF summarization and question generation process.
 * - SummarizePdfInput - The input type for the summarizePdf function.
 * - SummarizePdfOutput - The return type for the summarizePdf function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizePdfInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizePdfInput = z.infer<typeof SummarizePdfInputSchema>;

const SummarizePdfOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the PDF document.'),
  twoMarkQuestions: z.array(z.string()).describe('A list of possible 2-mark questions based on the PDF content.'),
  tenMarkQuestions: z.array(z.string()).describe('A list of possible 10-mark questions based on the PDF content.'),
  sixteenMarkQuestions: z.array(z.string()).describe('A list of possible 16-mark questions based on the PDF content.'),
});
export type SummarizePdfOutput = z.infer<typeof SummarizePdfOutputSchema>;

export async function summarizePdf(input: SummarizePdfInput): Promise<SummarizePdfOutput> {
  return summarizePdfFlow(input);
}

const summarizePdfPrompt = ai.definePrompt({
  name: 'summarizePdfPrompt',
  input: {
    schema: z.object({
      pdfDataUri: z
        .string()
        .describe(
          "A PDF document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise summary of the PDF document.'),
      twoMarkQuestions: z.array(z.string()).describe('A list of possible 2-mark questions based on the PDF content.'),
      tenMarkQuestions: z.array(z.string()).describe('A list of possible 10-mark questions based on the PDF content.'),
      sixteenMarkQuestions: z.array(z.string()).describe('A list of possible 16-mark questions based on the PDF content.'),
    }),
  },
  prompt: `You are an AI assistant specialized in summarizing PDF documents and generating potential questions for learning purposes.\n\nYou will receive a PDF document as input, and your task is to:\n\n1.  Provide a concise summary of the document's content.\n2.  Generate a list of potential 2-mark questions that can be answered based on the document.\n3.  Generate a list of potential 10-mark questions that require a more in-depth understanding of the document.\n4.  Generate a list of potential 16-mark questions that require critical thinking and application of the document's concepts.\n\nHere is the PDF document:\n{{media url=pdfDataUri}}
\nEnsure that the questions are relevant to the document's content and cover a range of difficulty levels.\n\nOutput the summary and questions in the following JSON format:\n{
  "summary": "[Summary of the PDF document]",
  "twoMarkQuestions": ["Question 1", "Question 2", ...],
  "tenMarkQuestions": ["Question 1", "Question 2", ...],
  "sixteenMarkQuestions": ["Question 1", "Question 2", ...]
}`,
});

const summarizePdfFlow = ai.defineFlow<
  typeof SummarizePdfInputSchema,
  typeof SummarizePdfOutputSchema
>(
  {
    name: 'summarizePdfFlow',
    inputSchema: SummarizePdfInputSchema,
    outputSchema: SummarizePdfOutputSchema,
  },
  async input => {
    const {output} = await summarizePdfPrompt(input);
    return output!;
  }
);
