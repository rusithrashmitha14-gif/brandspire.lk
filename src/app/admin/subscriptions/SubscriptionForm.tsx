'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createSubscription, updateSubscription } from './actions'
import styles from '../admin-form.module.css'

type FormState = { error?: string } | null;

export default function SubscriptionForm({ 
    subscription, 
    clients,
    projects = []
}: { 
    subscription?: any; 
    clients: any[];
    projects?: any[];
}) {
    const actionFunction = subscription 
        ? updateSubscription.bind(null, subscription.id) 
        : createSubscription;
        
    const [state, formAction, isPending] = useActionState<FormState, FormData>(actionFunction, null);

    return (
        <form className={styles.formContainer} action={formAction} style={{ maxWidth: '800px' }}>
            <div className={styles.form}>
                {state?.error && (
                    <div className={styles.errorAlert}>{state.error}</div>
                )}
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="client_id">Client *</label>
                        <select id="client_id" name="client_id" required defaultValue={subscription?.client_id}>
                            <option value="">— Select Client —</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="project_id">Link to Project (Optional)</label>
                        <select id="project_id" name="project_id" defaultValue={subscription?.project_id}>
                            <option value="">— No Specific Project —</option>
                            {projects.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="type">Service Type *</label>
                        <select id="type" name="type" required defaultValue={subscription?.type || 'domain'}>
                            <option value="domain">🌐 Domain Name</option>
                            <option value="hosting">🚀 Hosting Plan</option>
                            <option value="ssl">🔒 SSL Certificate</option>
                            <option value="other">📦 Other Service</option>
                        </select>
                    </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="name">Service / Domain Name *</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        defaultValue={subscription?.name}
                        placeholder="e.g. brandspire.lk or Pro Hosting Pack"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="provider">Provider / Registrar</label>
                        <input 
                            type="text" 
                            id="provider" 
                            name="provider" 
                            defaultValue={subscription?.provider}
                            placeholder="e.g. Namecheap, GoDaddy, Hostinger"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="expiry_date">Expiry Date *</label>
                        <input 
                            type="date" 
                            id="expiry_date" 
                            name="expiry_date" 
                            required 
                            defaultValue={subscription?.expiry_date}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="cost">Renewal Cost</label>
                        <input 
                            type="number" 
                            id="cost" 
                            name="cost" 
                            step="0.01"
                            defaultValue={subscription?.cost}
                            placeholder="0.00"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="currency">Currency</label>
                        <select id="currency" name="currency" defaultValue={subscription?.currency || 'USD'}>
                            <option value="USD">USD ($)</option>
                            <option value="LKR">LKR (Rs.)</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="status">Status</label>
                        <select id="status" name="status" defaultValue={subscription?.status || 'active'}>
                            <option value="active">🟢 Active</option>
                            <option value="expired">🔴 Expired</option>
                            <option value="cancelled">⚪ Cancelled</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="billing_cycle">Billing Cycle</label>
                        <select id="billing_cycle" name="billing_cycle" defaultValue={subscription?.billing_cycle || 'yearly'}>
                            <option value="monthly">📅 Monthly Plan</option>
                            <option value="yearly">🗓️ Yearly Plan</option>
                        </select>
                    </div>
                </div>

                <div className={styles.inputGroup} style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <input 
                        type="checkbox" 
                        id="renewal_paid" 
                        name="renewal_paid" 
                        defaultChecked={subscription?.renewal_paid}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <label htmlFor="renewal_paid" style={{ marginBottom: 0, cursor: 'pointer', fontWeight: '700', color: '#0f172a' }}>
                        Mark as Paid (Current Renewal Cycle)
                    </label>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="notes">Notes / Credentials (Visible only to Admin)</label>
                    <textarea 
                        id="notes" 
                        name="notes" 
                        defaultValue={subscription?.notes}
                        placeholder="Add any specific details or login hints here..."
                        rows={4}
                    />
                </div>

                <div className={styles.formActions}>
                    <Link href="/admin/subscriptions" className={styles.cancelBtn}>
                        Cancel
                    </Link>
                    <button type="submit" className={styles.submitBtn} disabled={isPending}>
                        {isPending ? 'Saving...' : (subscription ? 'Update Subscription' : 'Add Subscription')}
                    </button>
                </div>
            </div>
        </form>
    );
}
