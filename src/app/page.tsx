'use client';

import { chat, type ChatInput } from '@/ai/flows/chat';
import { generateInitialPrompts } from '@/ai/flows/generate-initial-prompt';
import { ChatMessage, type ChatMessageProps } from '@/components/chat-message';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Bot, LoaderCircle, SendHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

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
    <div className="flex h-screen w-full bg-background">
      <main className="flex h-full w-full flex-col">
        <header className="border-b p-4 shadow-sm">
          <div className="container mx-auto flex items-center justify-center gap-2 text-center font-headline text-xl font-semibold sm:text-2xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <h1 className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Auravo AI</h1>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <ScrollArea className="h-full flex-1">
            <div className="container mx-auto flex h-full flex-col justify-between p-4 md:p-6">
              <div className="flex-1 space-y-6 pb-24">
                {messages.length === 0 && !isLoading ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-full bg-primary/10 p-4">
                      <Bot size={40} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      How can I help you today?
                    </h2>
                    <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                      {initialPrompts.map((prompt, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          className="h-auto min-h-14 whitespace-normal rounded-lg border-dashed text-left text-sm"
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
            </div>
          </ScrollArea>
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-10 bg-background/50 p-4 backdrop-blur-sm">
          <div className="container mx-auto">
            <form
              onSubmit={handleFormSubmit}
              className="relative mx-auto flex w-full max-w-3xl items-end space-x-2 rounded-2xl border bg-secondary/50 p-2 shadow-lg"
            >
              <Textarea
                as={TextareaAutosize}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 resize-none border-none bg-transparent shadow-none focus-visible:ring-0"
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                maxRows={5}
                rows={1}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="h-9 w-9 shrink-0 rounded-full"
              >
                {isLoading ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <SendHorizontal className="h-5 w-5" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
