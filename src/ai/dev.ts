import { config } from 'dotenv';
config({ path: '.env' });

import '@/ai/flows/summarize-conversation.ts';
import '@/ai/flows/generate-initial-prompt.ts';
import '@/ai/flows/chat.ts';
import '@/ai/flows/generate-image.ts';
import '@/ai/flows/process-audio.ts';
