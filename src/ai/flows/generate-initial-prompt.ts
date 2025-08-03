// src/ai/flows/generate-initial-prompt.ts
'use server';

/**
 * @fileOverview Generates initial example prompts for new users.
 *
 * - generateInitialPrompts - A function that returns a list of example prompts.
 * - GenerateInitialPromptsOutput - The return type for the generateInitialPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialPromptsOutputSchema = z.array(
  z.string().describe('An example prompt for the user to try.')
);
export type GenerateInitialPromptsOutput = z.infer<
  typeof GenerateInitialPromptsOutputSchema
>;

export async function generateInitialPrompts(): Promise<GenerateInitialPromptsOutput> {
  return generateInitialPromptsFlow();
}

const prompt = ai.definePrompt({
  name: 'generateInitialPromptsPrompt',
  output: {schema: GenerateInitialPromptsOutputSchema},
  prompt: `You are an AI assistant designed to help new users understand how to interact with a language model.

  Generate a list of diverse example prompts that showcase the capabilities of the language model. The prompts should be clear, concise, and engaging, encouraging users to explore different functionalities and use cases.

  Return the prompts as a JSON array of strings.

  Example:
  [
    "Summarize the plot of Hamlet.",
    "Write a poem about the ocean.",
    "Translate 'Hello, world!' into Spanish.",
    "What are the benefits of meditation?",
    "Compose an email to my boss requesting a raise."
  ]
  `,
});

const generateInitialPromptsFlow = ai.defineFlow({
  name: 'generateInitialPromptsFlow',
  outputSchema: GenerateInitialPromptsOutputSchema,
}, async () => {
  const {output} = await prompt({});
  return output!;
});
