
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Footer } from '@/components/footer';

export default function PrivacyPolicyPage() {
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
            className="prose prose-invert max-w-none"
          >
            <h1>Privacy Policy for Auravo AI</h1>
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
            
            <p>
              Welcome to Auravo AI. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect via the Application includes:
            </p>
            <ul>
              <li>
                <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and profile picture, that you voluntarily give to us when you register with the Application.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Application, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Application.
              </li>
              <li>
                <strong>User Content:</strong> All data, text, and other content that you provide or upload to the Application, such as chat messages and prompts.
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:
            </p>
            <ul>
                <li>Create and manage your account.</li>
                <li>Email you regarding your account.</li>
                <li>Improve our Application and services.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the Application.</li>
                <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            </ul>

            <h2>Disclosure of Your Information</h2>
            <p>
              We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
            </p>
            <ul>
              <li>
                <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
              </li>
              <li>
                <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, and customer service.
              </li>
            </ul>

            <h2>Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us through our <Link href="/contact">contact page</Link>.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
