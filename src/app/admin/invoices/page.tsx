import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import styles from '../admin-table.module.css';

export default async function InvoicesPage() {
    const supabase = await createClient();
    
    // Fetch invoices with client names
    const { data: invoices } = await supabase
        .from('invoices')
        .select(`
            *,
            clients (
                name
            )
        `)
        .order('created_at', { ascending: false });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1>Invoices</h1>
                    <p>Generate and manage client invoices.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                        href="/admin/invoices/settings"
                        style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', border: '1px solid #e2e8f0', background: 'white', color: '#334155' }}
                    >
                        🏦 Bank Details
                    </Link>
                    <Link href="/admin/invoices/new" className={styles.addBtn}>
                        + Create New Invoice
                    </Link>
                </div>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Date</th>
                            <th>Client</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices && invoices.length > 0 ? (
                            invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td><strong>{invoice.invoice_number}</strong></td>
                                    <td>{new Date(invoice.date).toLocaleDateString()}</td>
                                    <td>{invoice.clients?.name || 'Deleted Client'}</td>
                                    <td>{invoice.currency === 'USD' ? '$' : 'Rs. '}{invoice.final_price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[invoice.status]}`}>
                                            {invoice.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <Link href={`/admin/invoices/preview/${invoice.id}`} className={styles.viewBtn}>
                                            Preview
                                        </Link>
                                        <Link href={`/admin/invoices/${invoice.id}`} className={styles.editBtn}>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className={styles.empty}>No invoices found. Create your first invoice to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
