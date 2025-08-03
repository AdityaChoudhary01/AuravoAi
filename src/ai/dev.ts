import { config } from 'dotenv';
config({ path: '.env.local' });

import '@/ai/flows/summarize-conversation.ts';
import '@/ai/flows/generate-initial-prompt.ts';
import '@/ai/flows/chat.ts';
