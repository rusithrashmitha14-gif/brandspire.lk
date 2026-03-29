'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'

export async function submitContactForm(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const data = {
    full_name: formData.get('name') as string,
    email: formData.get('email') as string,
    service: formData.get('service') as string,
    message: formData.get('message') as string,
  }

  // Basic validation
  if (!data.full_name || !data.email || !data.message) {
    return { error: 'Please fill in all required fields.' }
  }

  // 1. Save to Supabase
  const { error } = await supabase.from('contacts').insert([data])

  if (error) {
    console.error('Submission error:', error)
    return { error: 'Something went wrong. Please try again later.' }
  }

  // 2. Send Alert via Resend
  try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const contactEmailTo = process.env.CONTACT_EMAIL_TO || 'rusithrashmitha14@gmail.com';
      
      await resend.emails.send({
          from: 'Brandspire Contact <onboarding@resend.dev>',
          to: contactEmailTo,
          subject: `New Inquiry: ${data.service} - ${data.full_name}`,
          html: `
            <div style="font-family: sans-serif; color: #111;">
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${data.full_name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Service Requested:</strong> ${data.service}</p>
                <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap; font-size: 16px;">${data.message}</p>
            </div>
          `
      });
  } catch (err) {
      console.error('Email failed to send:', err);
      // We don't fail the user interaction if just the email alert fails
  }

  return { success: true }
}
