import { createClient } from '@/utils/supabase/server';
import InvoiceForm from '../InvoiceForm';
import { getNextInvoiceNumber } from '../actions';
import styles from '../../dashboard.module.css';

export default async function NewInvoicePage() {
    const supabase = await createClient();
    const { data: clients } = await supabase.from('clients').select('id, name').order('name');
    const nextInvoiceNumber = await getNextInvoiceNumber();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Create New Invoice</h1>
                <p>Generate a professional invoice for your client.</p>
            </div>
            <InvoiceForm clients={clients || []} nextInvoiceNumber={nextInvoiceNumber} />
        </div>
    );
}
