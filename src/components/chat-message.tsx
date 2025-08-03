'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Bot, LoaderCircle, User } from 'lucide-react';
import Markdown from 'react-markdown';

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
        <Avatar className="h-8 w-8 border bg-background">
          <AvatarFallback className="bg-transparent">
            <Bot className="h-5 w-5 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-lg p-3 text-sm shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground'
        )}
      >
        <article className="prose prose-sm max-w-none text-current prose-p:m-0 prose-headings:m-0">
          <Markdown>{message.content}</Markdown>
        </article>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 border bg-background">
          <AvatarFallback className="bg-transparent">
            <User className="h-5 w-5 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}
