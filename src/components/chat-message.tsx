
'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import Image from 'next/image';
import { GeminiIcon } from './gemini-icon';
import { useTypewriter } from '@/hooks/use-typewriter';

export type ChatMessageProps = {
  message?: {
    role: 'user' | 'model';
    content: string;
    isStreaming?: boolean;
  };
  isLoading?: boolean;
};

export function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (isLoading || !message) {
    return (
      <motion.div
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        className="flex items-start justify-start gap-3"
      >
        <Avatar className="h-8 w-8 border-none bg-transparent">
          <AvatarFallback className="bg-transparent">
            <GeminiIcon className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-center rounded-lg bg-secondary p-3 text-sm shadow-sm">
          <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
        </div>
      </motion.div>
    );
  }

  const displayedText = useTypewriter(message.content, message.isStreaming);
  const isUser = message.role === 'user';
  const isImage = message.content.startsWith('data:image');

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex items-start gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 border-none bg-transparent">
          <AvatarFallback className="bg-transparent">
            <GeminiIcon className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'rounded-lg p-3 text-sm',
          isUser
            ? 'max-w-[90%] bg-secondary text-secondary-foreground shadow-md sm:max-w-[80%]'
            : 'bg-transparent shadow-none',
          isImage ? 'p-0 overflow-hidden' : 'pt-0'
        )}
      >
        {isImage ? (
          <Image
            src={message.content}
            alt="Generated image"
            width={512}
            height={512}
            className="rounded-lg"
          />
        ) : (
          <article className="prose prose-invert max-w-none">
            <Markdown>{displayedText}</Markdown>
          </article>
        )}
      </div>
    </motion.div>
  );
}
