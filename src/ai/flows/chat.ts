'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { generateImage } from './generate-image';

const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string()
  })),
  prompt: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    if (input.prompt.startsWith('/imagine ')) {
      const imagePrompt = input.prompt.replace('/imagine ', '');
      const { imageUrl } = await generateImage({ prompt: imagePrompt });
      return { response: imageUrl };
    }

    const history = input.history.map(msg => ({
      role: msg.role,
      content: [{ text: msg.content }]
    }));

    const systemPrompt = `You are Auravo AI, a helpful and modern AI assistant. Your main goal is to provide helpful, accurate, and engaging content to the user.

RULES:
- Your responses should be informative, friendly, and engaging.
- Use markdown for formatting when appropriate (e.g., # for headings, - for lists, ** for bold).
- Use emojis to make the conversation more lively and visually appealing. For example: ✨, 🚀, 👍.
- Structure longer answers with clear headings and paragraphs to improve readability.`;

    const fullHistory = [
        { role: 'user' as const, content: [{ text: systemPrompt }] },
        { role: 'model' as const, content: [{ text: "Okay, I'm ready to chat! How can I help you today? ✨" }] },
        ...history,
    ];

    const resp = await ai.generate({
      prompt: input.prompt,
      history: fullHistory,
    });

    return { response: resp.text };
  }
);

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}
