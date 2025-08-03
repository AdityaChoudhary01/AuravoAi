
'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

/**
 * Server action to handle the contact form submission.
 * In a real application, this would integrate with an email service (e.g., Resend, SendGrid)
 * or save the message to a database.
 */
export async function submitContactForm(values: z.infer<typeof contactFormSchema>) {
  // Validate the form values
  const validatedData = contactFormSchema.parse(values);

  // For now, we'll just log the data to the console.
  console.log('New contact form submission:');
  console.log('Name:', validatedData.name);
  console.log('Email:', validatedData.email);
  console.log('Message:', validatedData.message);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, you would add your logic here, e.g.:
  // await sendEmail({
  //   to: 'your-email@example.com',
  //   from: 'noreply@yourapp.com',
  //   subject: `New message from ${validatedData.name}`,
  //   html: `<p>Email: ${validatedData.email}</p><p>${validatedData.message}</p>`,
  // });

  return { success: true, message: 'Your message has been sent successfully!' };
}
