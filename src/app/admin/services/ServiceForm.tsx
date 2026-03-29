'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createService, updateService } from './actions'
import styles from '../admin-form.module.css'

type FormState = { error?: string } | null;

export default function ServiceForm({ service }: { service?: any }) {
    // Determine the action based on whether a service object was passed in
    const actionFunction = service 
        ? updateService.bind(null, service.id) 
        : createService;
        
    const [state, formAction, isPending] = useActionState<FormState, FormData>(actionFunction, null);

    return (
        <form className={styles.formContainer} action={formAction}>
            <div className={styles.form}>
                {state?.error && (
                    <div className={styles.errorAlert}>{state.error}</div>
                )}
                
                <div className={styles.inputGroup}>
                    <label htmlFor="title">Service Title *</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        required 
                        defaultValue={service?.title}
                        placeholder="e.g. Web Development"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="description">Description *</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        required 
                        defaultValue={service?.description}
                        placeholder="Describe the service..."
                        rows={4}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="features">Key Features (One per line) *</label>
                    <textarea 
                        id="features" 
                        name="features" 
                        defaultValue={service?.features?.join('\n')}
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        rows={6}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="icon">Service Icon / Image</label>
                    <input 
                        type="file" 
                        id="icon" 
                        name="icon" 
                        accept="image/*"
                    />
                    {service?.icon && (
                        <div className={styles.currentFile}>
                            <span>Current: </span>
                            <img src={service.icon} alt="current icon" style={{ height: '40px', width: '40px', objectFit: 'cover' }} />
                        </div>
                    )}
                    <input type="hidden" name="current_icon_url" defaultValue={service?.icon} />
                    <span className={styles.helperText}>Upload a square icon or image.</span>
                </div>

                <div className={styles.formActions}>
                    <Link href="/admin/services" className={styles.cancelBtn}>
                        Cancel
                    </Link>
                    <button type="submit" className={styles.submitBtn} disabled={isPending}>
                        {isPending ? 'Saving...' : (service ? 'Update Service' : 'Create Service')}
                    </button>
                </div>
            </div>
        </form>
    );
}
