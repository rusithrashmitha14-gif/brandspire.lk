import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import InvoiceForm from '../InvoiceForm';
import styles from '../../dashboard.module.css';

export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    
    // Fetch clients for the dropdown
    const { data: clients } = await supabase.from('clients').select('id, name').order('name');

    // Fetch Invoice with Items
    const { data: invoice } = await supabase
        .from('invoices')
        .select(`
            *,
            invoice_items (*)
        `)
        .eq('id', id)
        .single();

    if (!invoice) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Edit Invoice {invoice.invoice_number}</h1>
                <p>Update the details and items for this invoice.</p>
            </div>
            <InvoiceForm clients={clients || []} initialData={invoice} />
        </div>
    );
}
