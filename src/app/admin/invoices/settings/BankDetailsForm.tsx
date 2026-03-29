'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { updateInvoiceSettingsAction } from './actions'
import styles from '../../admin-form.module.css'

export default function BankDetailsForm({ 
    initialBankDetails, 
    initialContactDetails 
}: { 
    initialBankDetails?: any; 
    initialContactDetails?: any; 
}) {
    const [state, formAction, isPending] = useActionState(updateInvoiceSettingsAction, null);

    return (
        <form className={styles.formContainer} action={formAction} style={{ maxWidth: '800px' }}>
            <div className={styles.form}>
                {state?.error && <div className={styles.errorAlert}>{state.error}</div>}
                {state?.success && <div style={{ color: '#10b981', background: '#ecfdf5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '600' }}>✅ Settings updated successfully!</div>}
                
                {/* Bank Details Section */}
                <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: '700' }}>🏦 Bank Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className={styles.inputGroup}>
                        <label>Bank Name</label>
                        <input type="text" name="bank_name" defaultValue={initialBankDetails?.bank_name} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Account Name</label>
                        <input type="text" name="account_name" defaultValue={initialBankDetails?.account_name} required />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className={styles.inputGroup}>
                        <label>Account Number</label>
                        <input type="text" name="account_number" defaultValue={initialBankDetails?.account_number} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Branch</label>
                        <input type="text" name="branch" defaultValue={initialBankDetails?.branch} required />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>SWIFT / BIC Code</label>
                    <input type="text" name="swift_code" defaultValue={initialBankDetails?.swift_code} required />
                </div>

                <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />

                {/* Contact Details Section */}
                <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: '700' }}>📞 Contact Details (Footer)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className={styles.inputGroup}>
                        <label>Website URL</label>
                        <input type="text" name="website" defaultValue={initialContactDetails?.website} placeholder="brandspire.lk" required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Contact Email</label>
                        <input type="email" name="email" defaultValue={initialContactDetails?.email} placeholder="hello@brandspire.lk" required />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label>Phone Numbers</label>
                    <input type="text" name="phones" defaultValue={initialContactDetails?.phones} placeholder="+94 701 239 020 / +94 766 721 645" required />
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Separate multiple numbers with a slash ( / )</p>
                </div>

                <div className={styles.formActions}>
                    <Link href="/admin/invoices" className={styles.cancelBtn}>Back</Link>
                    <button type="submit" className={styles.submitBtn} disabled={isPending}>
                        {isPending ? 'Saving...' : 'Update Invoice Settings'}
                    </button>
                </div>
            </div>
        </form>
    )
}
