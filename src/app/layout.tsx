
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: {
    default: 'Auravo AI - Your Intelligent Chat Assistant',
    template: '%s | Auravo AI',
  },
  description: 'Engage in intelligent conversations, generate images, and get instant answers with Auravo AI, a modern chat application powered by Google\'s Gemini models.',
  keywords: ['AI Chat', 'Intelligent Assistant', 'Gemini AI', 'Next.js', 'Auravo AI', 'Chatbot', 'Image Generation', 'AI assistant', 'Conversational AI'],
  authors: [{ name: 'Aditya Choudhary', url: 'https://www.auravo.ai' }],
  creator: 'Aditya Choudhary',
  publisher: 'Auravo AI',
  metadataBase: new URL('https://www.auravo.ai'),
  openGraph: {
    title: 'Auravo AI - Your Intelligent Chat Assistant',
    description: 'Engage in intelligent conversations, generate images, and get instant answers with Auravo AI.',
    url: 'https://www.auravo.ai',
    siteName: 'Auravo AI',
    images: [
        {
            url: '/og-image.png', // Must be an absolute URL
            width: 1200,
            height: 630,
            alt: 'Auravo AI in action',
        },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auravo AI - Your Intelligent Chat Assistant',
    description: 'Engage in intelligent conversations, generate images, and get instant answers with Auravo AI.',
    creator: '@adityacodes',
    images: ['/twitter-image.png'], // Must be an absolute URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Auravo AI',
    'url': 'https://www.auravo.ai',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://www.auravo.ai/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen dark">
        <AuthProvider>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
