'use server';
/**
 * @fileOverview This file implements a Genkit flow to suggest relevant tags and dependencies for a given task description.
 *
 * - suggestTaskAttributes - An async function that provides AI-powered suggestions for task tags and dependencies.
 * - SuggestTaskAttributesInput - The input type for the suggestTaskAttributes function.
 * - SuggestTaskAttributesOutput - The return type for the suggestTaskAttributes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestTaskAttributesInputSchema = z.object({
  taskDescription: z
    .string()
    .describe(
      'The detailed description of the task for which attributes are to be suggested.'
    ),
  existingProjectContext: z
    .string()
    .optional()
    .describe(
      'A summary or list of existing tasks and their attributes within the project, used to inform tag and dependency suggestions.'
    ),
});
export type SuggestTaskAttributesInput = z.infer<
  typeof SuggestTaskAttributesInputSchema
>;

const SuggestTaskAttributesOutputSchema = z.object({
  suggestedTags: z
    .array(z.string())
    .describe('A list of relevant tags suggested for the task.'),
  suggestedDependencies: z
    .array(z.string())
    .describe(
      'A list of potential tasks (by name or identifier) that this task might depend on, or tasks that might depend on this task.'
    ),
});
export type SuggestTaskAttributesOutput = z.infer<
  typeof SuggestTaskAttributesOutputSchema
>;

export async function suggestTaskAttributes(
  input: SuggestTaskAttributesInput
): Promise<SuggestTaskAttributesOutput> {
  return suggestTaskAttributesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskAttributesPrompt',
  input: { schema: SuggestTaskAttributesInputSchema },
  output: { schema: SuggestTaskAttributesOutputSchema },
  prompt: `You are an AI assistant specialized in project management. Your role is to help users categorize and link tasks more efficiently by suggesting relevant tags and potential dependencies.

Analyze the following task description and the provided project context to suggest suitable tags and dependencies.

Task Description:
{{{taskDescription}}}

Project Context:
{{{existingProjectContext}}}

Based on the above, provide:
1. A list of up to 5 relevant tags (single words or short phrases).
2. A list of up to 3 potential dependencies (names of other tasks that might be related or prerequisite). If no dependencies are obvious, return an empty array for dependencies.

Your output must be a JSON object with 'suggestedTags' and 'suggestedDependencies' arrays.`,
});

const suggestTaskAttributesFlow = ai.defineFlow(
  {
    name: 'suggestTaskAttributesFlow',
    inputSchema: SuggestTaskAttributesInputSchema,
    outputSchema: SuggestTaskAttributesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
