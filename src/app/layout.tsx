import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: {
    default: 'Auravo AI - Your Intelligent Chat Assistant',
    template: '%s | Auravo AI',
  },
  description:
    "Engage in intelligent conversations, generate images, and get instant answers with Auravo AI, a modern chat application powered by Google's Gemini models.",
  keywords: [
    'AI Chat',
    'Intelligent Assistant',
    'Gemini AI',
    'Next.js',
    'Auravo AI',
    'Chatbot',
    'Image Generation',
    'AI assistant',
    'Conversational AI',
  ],
  authors: [{ name: 'Aditya Choudhary', url: 'https://auravoai.vercel.app' }],
  creator: 'Aditya Choudhary',
  publisher: 'Auravo AI',
  metadataBase: new URL('https://auravoai.vercel.app'),
  manifest: '/manifest.json',
  openGraph: {
    title: 'Auravo AI - Your Intelligent Chat Assistant',
    description:
      'Engage in intelligent conversations, generate images, and get instant answers with Auravo AI.',
    url: 'https://auravoai.vercel.app',
    siteName: 'Auravo AI',
    images: [
      {
        url: 'https://auravoai.vercel.app/og-image.png',
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
    description:
      'Engage in intelligent conversations, generate images, and get instant answers with Auravo AI.',
    creator: '@adityacodes',
    images: ['https://auravoai.vercel.app/twitter-image.png'],
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
  icons: {
    icon: 'https://auravoai.vercel.app/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Auravo AI',
    url: 'https://auravoai.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://auravoai.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="msvalidate.01" content="2395AC146C62BB5D66E421F75E9E7DCF" />
        <meta name="google-site-verification" content="YX_PQiZx-77ddG15mAgILKKK1bfUrvCMgc4zbSd0Hgs" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen dark">
        <AuthProvider>
          <div className="flex-1 flex flex-col">{children}</div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
