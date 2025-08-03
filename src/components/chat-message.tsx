
'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Bot, LoaderCircle, User } from 'lucide-react';
import Markdown from 'react-markdown';
import Image from 'next/image';

export type ChatMessageProps = {
  message: {
    role: 'user' | 'model';
    content: string;
  };
  isLoading?: boolean;
};

export function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  if (isLoading) {
    return (
      <motion.div
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        className="flex items-start justify-start gap-3"
      >
        <Avatar className="h-8 w-8 border bg-background">
          <AvatarFallback className="bg-transparent">
            <Bot className="h-5 w-5 text-primary" />
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-center rounded-lg bg-secondary p-3 text-sm shadow-sm">
          <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
        </div>
      </motion.div>
    );
  }

  const isUser = message.role === 'user';
  const isImage = message.content.startsWith('data:image');

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex items-start gap-3',
        isUser ? 'justify-end' : 'justify-start w-full'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 border bg-background">
          <AvatarFallback className="bg-transparent">
            <Bot className="h-5 w-5 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'rounded-lg p-3 text-sm shadow-md',
          isUser
            ? 'max-w-[90%] bg-primary text-primary-foreground sm:max-w-[80%]'
            : 'w-full bg-secondary text-secondary-foreground',
          isImage && 'p-0 overflow-hidden'
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
          <article className="prose prose-sm max-w-none text-current prose-p:m-0 prose-headings:my-2 prose-headings:font-semibold prose-headings:text-current prose-ul:my-2 prose-li:my-0">
            <Markdown>{message.content}</Markdown>
          </article>
        )}
      </div>
    </motion.div>
  );
}
