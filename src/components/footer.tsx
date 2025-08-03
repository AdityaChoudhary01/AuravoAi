
'use client';

import Link from 'next/link';
import { GeminiIcon } from './gemini-icon';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-6 md:flex-row flex-col gap-4">
        <div className="flex items-center gap-2">
          <GeminiIcon className="h-6 w-6" />
          <p className="text-lg font-semibold">Auravo AI</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
          <Link href="/donate" className="transition-colors hover:text-foreground">
            Donate
          </Link>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Auravo AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
