'use server';
/**
 * @fileOverview A Genkit flow for summarizing long task comment threads.
 *
 * - summarizeTaskComments - A function that handles the task comment summarization process.
 * - SummarizeTaskCommentsInput - The input type for the summarizeTaskComments function.
 * - SummarizeTaskCommentsOutput - The return type for the summarizeTaskComments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTaskCommentsInputSchema = z.object({
  comments: z.array(z.string()).describe('An array of individual comments to be summarized.'),
});
export type SummarizeTaskCommentsInput = z.infer<typeof SummarizeTaskCommentsInputSchema>;

const SummarizeTaskCommentsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the provided comments, highlighting key discussion points and outcomes.'),
});
export type SummarizeTaskCommentsOutput = z.infer<typeof SummarizeTaskCommentsOutputSchema>;

export async function summarizeTaskComments(input: SummarizeTaskCommentsInput): Promise<SummarizeTaskCommentsOutput> {
  return summarizeTaskCommentsFlow(input);
}

const summarizeTaskCommentsPrompt = ai.definePrompt({
  name: 'summarizeTaskCommentsPrompt',
  input: {schema: SummarizeTaskCommentsInputSchema},
  output: {schema: SummarizeTaskCommentsOutputSchema},
  prompt: `You are an AI assistant specialized in summarizing discussion threads for project management. Your goal is to provide a concise and clear summary of the following task comments. The summary should capture the main points of the discussion, any decisions made, and the current status or next steps, without including extraneous details or conversational filler. Focus on the actionable items and overall progress.

Comments:
{{#each comments}}
- {{{this}}}
{{/each}}`,
});

const summarizeTaskCommentsFlow = ai.defineFlow(
  {
    name: 'summarizeTaskCommentsFlow',
    inputSchema: SummarizeTaskCommentsInputSchema,
    outputSchema: SummarizeTaskCommentsOutputSchema,
  },
  async input => {
    const {output} = await summarizeTaskCommentsPrompt(input);
    return output!;
  }
);
