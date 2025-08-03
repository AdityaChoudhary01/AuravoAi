'use client';

import { chat, type ChatInput } from '@/ai/flows/chat';
import { generateInitialPrompts } from '@/ai/flows/generate-initial-prompt';
import { ChatMessage, type ChatMessageProps } from '@/components/chat-message';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Bot, LoaderCircle, SendHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Message = ChatMessageProps['message'];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialPrompts, setInitialPrompts] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPrompts() {
      try {
        const prompts = await generateInitialPrompts();
        setInitialPrompts(prompts.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch initial prompts:', error);
      }
    }
    fetchPrompts();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (prompt?: string) => {
    const userMessageContent = prompt || input;
    if (!userMessageContent.trim()) return;

    setIsLoading(true);
    const newUserMessage: Message = { role: 'user', content: userMessageContent };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    if (!prompt) {
      setInput('');
    }

    try {
      const history = newMessages
        .slice(0, -1)
        .map((m) => ({ role: m.role, content: m.content }));
      const chatInput: ChatInput = { history, prompt: userMessageContent };
      const result = await chat(chatInput);

      const aiMessage: Message = { role: 'model', content: result.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling chat AI:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <Card className="flex h-full w-full max-w-4xl flex-col shadow-2xl">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center justify-center gap-2 text-center font-headline text-xl font-semibold sm:text-2xl">
            <Bot className="h-7 w-7 text-primary" />
            Auravo AI
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-2 sm:p-4 md:p-6">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              {messages.length === 0 && !isLoading ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <Bot size={40} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    How can I help you today?
                  </h2>
                  <div className="mt-8 grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
                    {initialPrompts.map((prompt, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="h-auto min-h-12 whitespace-normal text-left text-sm"
                        onClick={() => handleSendMessage(prompt)}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <ChatMessage key={index} message={msg} />
                ))
              )}
              {isLoading && <ChatMessage isLoading />}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t pt-4 sm:pt-6">
          <form
            onSubmit={handleFormSubmit}
            className="flex w-full items-start space-x-2"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 resize-none"
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              {isLoading ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <SendHorizontal className="h-5 w-5" />
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
