'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createCaseStudy, updateCaseStudy } from './actions'
import styles from '../admin-form.module.css'

type FormState = { error?: string } | null;

export default function CaseStudyForm({ caseStudy }: { caseStudy?: any }) {
    const actionFunction = caseStudy 
        ? updateCaseStudy.bind(null, caseStudy.id) 
        : createCaseStudy;
        
    const [state, formAction, isPending] = useActionState<FormState, FormData>(actionFunction, null);

    return (
        <form className={styles.formContainer} action={formAction}>
            <div className={styles.form}>
                {state?.error && (
                    <div className={styles.errorAlert}>{state.error}</div>
                )}
                
                <div className={styles.inputGroup}>
                    <label htmlFor="client_name">Client Name *</label>
                    <input 
                        type="text" 
                        id="client_name" 
                        name="client_name" 
                        required 
                        defaultValue={caseStudy?.client_name}
                        placeholder="e.g. EcoGoods Sri Lanka"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="industry">Industry</label>
                    <input 
                        type="text" 
                        id="industry" 
                        name="industry" 
                        defaultValue={caseStudy?.industry}
                        placeholder="e.g. Retail & E-commerce"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="problem">The Problem *</label>
                    <textarea 
                        id="problem" 
                        name="problem" 
                        required 
                        defaultValue={caseStudy?.problem}
                        placeholder="What challenge did the client face?"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="solution">Our Solution *</label>
                    <textarea 
                        id="solution" 
                        name="solution" 
                        required 
                        defaultValue={caseStudy?.solution}
                        placeholder="How did we help them?"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="results">The Results *</label>
                    <textarea 
                        id="results" 
                        name="results" 
                        required 
                        defaultValue={caseStudy?.results}
                        placeholder="What was the outcome? (e.g. 150% growth)"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="website_url">Live Website URL</label>
                    <input 
                        type="url" 
                        id="website_url" 
                        name="website_url" 
                        defaultValue={caseStudy?.website_url}
                        placeholder="e.g. https://www.example.com"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="tech_stack">Tech Stack (comma separated)</label>
                    <input 
                        type="text" 
                        id="tech_stack" 
                        name="tech_stack" 
                        defaultValue={caseStudy?.tech_stack?.join(', ')}
                        placeholder="e.g. Next.js, Supabase, Stripe"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="image">Featured Image</label>
                    <input 
                        type="file" 
                        id="image" 
                        name="image" 
                        accept="image/*"
                    />
                    {caseStudy?.images?.[0] && (
                        <div className={styles.currentFile}>
                            <span>Current: </span>
                            <img src={caseStudy.images[0]} alt="current" style={{ height: '60px', width: '100px', objectFit: 'cover' }} />
                        </div>
                    )}
                    <input type="hidden" name="current_image_url" defaultValue={caseStudy?.images?.[0]} />
                </div>

                <div className={styles.formActions}>
                    <Link href="/admin/case-studies" className={styles.cancelBtn}>
                        Cancel
                    </Link>
                    <button type="submit" className={styles.submitBtn} disabled={isPending}>
                        {isPending ? 'Saving...' : (caseStudy ? 'Update Case Study' : 'Create Case Study')}
                    </button>
                </div>
            </div>
        </form>
    );
}
