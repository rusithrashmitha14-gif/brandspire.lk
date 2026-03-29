'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createClientAction, updateClientAction } from './actions'
import styles from '../admin-form.module.css'

type FormState = { error?: string } | null;

export default function ClientForm({ client }: { client?: any }) {
    const actionFunction = client 
        ? updateClientAction.bind(null, client.id) 
        : createClientAction;
        
    const [state, formAction, isPending] = useActionState<FormState, FormData>(actionFunction, null);

    return (
        <form className={styles.formContainer} action={formAction}>
            <div className={styles.form}>
                {state?.error && (
                    <div className={styles.errorAlert}>{state.error}</div>
                )}
                
                <div className={styles.inputGroup}>
                    <label htmlFor="name">Client/Company Name *</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        defaultValue={client?.name}
                        placeholder="e.g. Acme Corp"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        defaultValue={client?.email}
                        placeholder="client@example.com"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                        type="text" 
                        id="phone" 
                        name="phone" 
                        defaultValue={client?.phone}
                        placeholder="+94 ..."
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="address">Billing Address</label>
                    <textarea 
                        id="address" 
                        name="address" 
                        defaultValue={client?.address}
                        placeholder="7954 Winston Churchill Boulevard..."
                        rows={4}
                    />
                </div>

                <div className={styles.formActions}>
                    <Link href="/admin/clients" className={styles.cancelBtn}>
                        Cancel
                    </Link>
                    <button type="submit" className={styles.submitBtn} disabled={isPending}>
                        {isPending ? 'Saving...' : (client ? 'Update Client' : 'Create Client')}
                    </button>
                </div>
            </div>
        </form>
    );
}
