'use client'

import { useActionState } from 'react'
import { submitContactForm } from './actions'
import Button from '@/components/Button/Button'
import styles from './contact.module.css'

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitContactForm, null)

    if (state?.success) {
        return (
            <div className={styles.successMessage}>
                <h2>Thank you for reaching out!</h2>
                <p>Your message has been received. We'll get back to you shortly.</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className={styles.resetBtn}
                >
                    Send another message
                </button>
            </div>
        )
    }

    return (
        <form action={formAction} className={styles.formContainer}>
            {state?.error && (
                <div className={styles.errorAlert}>{state.error}</div>
            )}
            
            <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    required 
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="john@example.com" 
                    required 
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="service">Service Interested In</label>
                <select id="service" name="service">
                    <option value="web-design">Web Design</option>
                    <option value="web-development">Web Development</option>
                    <option value="seo">SEO</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="message">Project Details</label>
                <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    placeholder="Tell us about your project..." 
                    required
                ></textarea>
            </div>
            <Button type="submit" size="lg" disabled={isPending}>
                {isPending ? 'Sending...' : 'Send Message'}
            </Button>
        </form>
    )
}
