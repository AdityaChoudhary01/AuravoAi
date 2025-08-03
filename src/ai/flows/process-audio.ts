'use server';
/**
 * @fileOverview Processes audio data URI to transcribe it to text.
 *
 * - processAudio - A function that transcribes audio.
 * - ProcessAudioInput - The input type for the processAudio function.
 * - ProcessAudioOutput - The return type for the processAudio function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProcessAudioInputSchema = z.object({
  audioDataUri: z.string().describe("A data URI of the audio to process. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
});
export type ProcessAudioInput = z.infer<typeof ProcessAudioInputSchema>;

const ProcessAudioOutputSchema = z.object({
  transcript: z.string().describe('The transcribed text from the audio.'),
});
export type ProcessAudioOutput = z.infer<typeof ProcessAudioOutputSchema>;

const processAudioFlow = ai.defineFlow(
  {
    name: 'processAudioFlow',
    inputSchema: ProcessAudioInputSchema,
    outputSchema: ProcessAudioOutputSchema,
  },
  async (input) => {
    const { text } = await ai.generate({
      model: ai.getModel(),
      prompt: [{ media: { url: input.audioDataUri } }, { text: "Transcribe this audio." }],
    });

    return { transcript: text };
  }
);

export async function processAudio(input: ProcessAudioInput): Promise<ProcessAudioOutput> {
    return processAudioFlow(input);
}
