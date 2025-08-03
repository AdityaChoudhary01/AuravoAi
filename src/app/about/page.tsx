
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Auravo AI',
    description: 'Learn about the mission and vision behind Auravo AI, a cutting-edge chat application designed to provide intelligent, helpful, and engaging conversations.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-background/50 px-4 shadow-sm backdrop-blur-sm">
        <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Auravo AI
            </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto max-w-4xl py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About Auravo AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Auravo AI is a cutting-edge chat application designed to provide intelligent, helpful, and engaging conversations. Our mission is to push the boundaries of artificial intelligence to create a seamless and intuitive user experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Our Vision</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We believe in a future where AI assistants are not just tools, but collaborative partners that help us learn, create, and solve problems more effectively. Auravo is our first step towards that future, built on a foundation of powerful large language models and a commitment to user-centric design.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">The Technology</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powered by Google's Gemini models, Auravo AI leverages state-of-the-art natural language processing to understand context, generate human-like text, create images, and more. The application is built with a modern tech stack, including Next.js, React, and Tailwind CSS, ensuring a fast, responsive, and scalable platform.
              </p>
            </div>

            <div className="text-center mt-12">
                <Link href="/contact">
                    <Button size="lg">Get in Touch</Button>
                </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
