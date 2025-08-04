
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Heart, Server, Sparkles } from 'lucide-react';

export default function DonatePage() {
    const upiQRCodeUrl = 'https://res.cloudinary.com/dmtnonxtt/image/upload/v1752488580/GooglePay_QR_xtgkh4.png';

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-background/50 px-4 shadow-sm backdrop-blur-sm">
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold text-primary">
                      Auravo AI
                    </Link>
                </div>
            </header>

            <main className="flex-1 px-4">
                <div className="container mx-auto max-w-4xl py-12 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Become a Supporter
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">
                            Auravo AI is a passion project. If you find our platform useful, please consider supporting us. Your contribution, no matter the size, makes a huge difference!
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-16"
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How Your Support Helps</h2>
                        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                            <Card className="text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Server className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Server Costs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Keeps the website online, fast, and accessible to everyone 24/7.</p>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Sparkles className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>New Features</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Allows for the development of new tools and improvements to the platform.</p>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Heart className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>Ad-Free Experience</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Ensures the platform remains clean, focused, and free of advertisements.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-16"
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">Ways to Contribute</h2>
                        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                             <Card className="flex flex-col items-center text-center">
                                <CardHeader>
                                    <CardTitle>UPI (for users in India)</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-1 flex-col items-center">
                                    <p className="text-muted-foreground mb-4">Scan the QR code with any UPI app like Google Pay, PhonePe, or Paytm.</p>
                                    <div className="p-2 border rounded-lg bg-white">
                                        <Image src={upiQRCodeUrl} alt="UPI QR Code" width={200} height={200} className="rounded-md" />
                                    </div>
                                    <p className="mt-4 font-semibold"><strong>UPI ID:</strong> adityanain55@oksbi</p>
                                </CardContent>
                            </Card>
                            <Card className="flex flex-col items-center text-center">
                                <CardHeader>
                                    <CardTitle>Buy Me a Coffee</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-1 flex-col items-center">
                                     <div className="flex flex-col items-center mb-4">
                                        <Image src="https://cdn.buymeacoffee.com/uploads/profile_pictures/2025/07/ZzlkIXLPpwCOJfAo.jpg@300w_0e.webp" alt="Aditya Choudhary" width={70} height={70} className="rounded-full object-cover mb-2 border-2 border-yellow-400" />
                                        <div className="font-bold text-yellow-400 text-lg">Aditya Choudhary</div>
                                        <div className="text-muted-foreground text-sm mb-2 text-center">Support my work and help keep Auravo AI ad-free!</div>
                                    </div>
                                    <p className="text-muted-foreground mb-4">A simple and secure way to show your support using a card or other payment methods.</p>
                                    <a href="https://coff.ee/adityachoudhary" target="_blank" rel="noopener noreferrer">
                                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                                            <Coffee className="mr-2" />
                                            Buy Me a Coffee
                                        </Button>
                                    </a>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
