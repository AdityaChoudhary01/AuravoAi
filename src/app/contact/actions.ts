
'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

/**
 * Server action to handle the contact form submission.
 * This now uses Nodemailer to send the submission as an email.
 */
export async function submitContactForm(values: z.infer<typeof contactFormSchema>) {
  // Validate the form values
  const validatedData = contactFormSchema.parse(values);

  // Create a transporter using your email service's SMTP settings.
  // These should be stored in your .env.local file.
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send the email
    await transporter.sendMail({
      from: `"${validatedData.name}" <${process.env.SMTP_USER}>`, // Sender's name and authorized email
      to: process.env.MAIL_TO, // Your receiving email address
      replyTo: validatedData.email, // Set the reply-to to the user's email
      subject: `New Contact Form Message from ${validatedData.name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <hr />
        <h2>Message:</h2>
        <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return { success: true, message: 'Your message has been sent successfully!' };
  } catch (error) {
    console.error('Failed to send email:', error);
    // In a real app, you might want more sophisticated error handling.
    // For now, we'll throw a generic error.
    throw new Error('Failed to send message. Please try again later.');
  }
}
