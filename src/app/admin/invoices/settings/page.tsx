import { createClient } from '@/utils/supabase/server';
import BankDetailsForm from './BankDetailsForm';
import styles from '../../dashboard.module.css';

export default async function InvoiceSettingsPage() {
    const supabase = await createClient();
    
    // Fetch all settings
    const { data: settings } = await supabase
        .from('settings')
        .select();

    const bankData = settings?.find(s => s.key === 'bank_details')?.value;
    const contactData = settings?.find(s => s.key === 'contact_details')?.value;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Invoice Settings</h1>
                <p>Manage your bank and contact details shown on invoices.</p>
            </div>
            <BankDetailsForm 
                initialBankDetails={bankData} 
                initialContactDetails={contactData} 
            />
        </div>
    );
}
