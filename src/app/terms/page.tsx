
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Footer } from '@/components/footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Read the Terms of Service for Auravo AI to understand the rules and guidelines for using our application.',
};

export default function TermsOfServicePage() {
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
            <h1>Terms of Service for Auravo AI</h1>
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

            <h2>1. Agreement to Terms</h2>
            <p>
              By using our application, Auravo AI ("Application"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the Application.
            </p>

            <h2>2. Changes to Terms or Services</h2>
            <p>
              We may modify the Terms at any time, in our sole discretion. If we do so, we’ll let you know either by posting the modified Terms on the site or through other communications. It’s important that you review the Terms whenever we modify them because if you continue to use the Application after we have posted modified Terms, you are indicating to us that you agree to be bound by the modified Terms.
            </p>

            <h2>3. Who May Use the Services</h2>
            <p>
              You may use the Application only if you are 13 years or older and are not barred from using the services under applicable law. To make a purchase via the services (if applicable), you must be 18 years or older and capable of forming a binding contract.
            </p>

            <h2>4. User Accounts</h2>
            <p>
              You are responsible for all activities that occur under your account, whether or not you know about them. You agree to notify us immediately of any unauthorized use of your account. We are not responsible for any loss or damage to you or any third party that may be incurred as a result of any unauthorized access and/or use of your account, or otherwise.
            </p>
            
            <h2>5. User Conduct</h2>
            <p>You agree not to do any of the following:</p>
            <ul>
                <li>Post, upload, publish, submit or transmit any Content that: (i) infringes, misappropriates or violates a third party’s patent, copyright, trademark, trade secret, moral rights or other intellectual property rights, or rights of publicity or privacy; (ii) violates, or encourages any conduct that would violate, any applicable law or regulation or would give rise to civil liability; (iii) is fraudulent, false, misleading or deceptive; (iv) is defamatory, obscene, pornographic, vulgar or offensive; (v) promotes discrimination, bigotry, racism, hatred, harassment or harm against any individual or group.</li>
                <li>Use, display, mirror or frame the Application or any individual element within the Application, Auravo AI’s name, any Auravo AI trademark, logo or other proprietary information, or the layout and design of any page or form contained on a page, without our express written consent.</li>
                <li>Attempt to probe, scan or test the vulnerability of any Auravo AI system or network or breach any security or authentication measures.</li>
            </ul>

            <h2>6. Termination</h2>
            <p>
              We may terminate your access to and use of the Application, at our sole discretion, at any time and without notice to you. You may cancel your account at any time by sending an email to us or using the account deletion functionality if available.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              NEITHER AURAVO AI NOR ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING, OR DELIVERING THE APPLICATION WILL BE LIABLE FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, LOSS OF DATA OR GOODWILL, SERVICE INTERRUPTION, COMPUTER DAMAGE OR SYSTEM FAILURE OR THE COST OF SUBSTITUTE SERVICES ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR FROM THE USE OF OR INABILITY TO USE THE APPLICATION.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us through our <Link href="/contact">contact page</Link>.
            </p>

          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
