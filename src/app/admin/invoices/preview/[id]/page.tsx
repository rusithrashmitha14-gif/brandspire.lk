import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '../../invoice-preview.module.css';
import PrintButton from './PrintButton';

export default async function InvoicePreviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    
    // Fetch Invoice with Client and Items
    const { data: invoice } = await supabase
        .from('invoices')
        .select(`
            *,
            clients (*),
            invoice_items (*)
        `)
        .eq('id', id)
        .single();

    if (!invoice) notFound();

    // Fetch Settings from settings table
    const { data: settings } = await supabase
        .from('settings')
        .select();
    
    const bank = settings?.find(s => s.key === 'bank_details')?.value || {};
    const contact = settings?.find(s => s.key === 'contact_details')?.value || {
        website: 'brandspire.lk',
        email: 'hello@brandspire.lk',
        phones: '+94 701 239 020 / +94 766 721 645'
    };

    const symbol = invoice.currency === 'USD' ? '$' : 'Rs.';

    return (
        <div style={{ padding: '20px' }}>
            <div className={`${styles.controls} ${styles.noPrint}`}>
                <Link href="/admin/invoices" style={{ textDecoration: 'none', color: '#666' }}>← Back to Invoices</Link>
                <PrintButton />
            </div>

            <div className={styles.previewContainer}>
                <div className={styles.invoiceSideText}>Invoice.</div>

                <div className={styles.header}>
                    <div className={styles.logoArea}>
                        <img src="/brand-logo-dark.png" alt="Brandspire" className={styles.logoImg} />
                        
                        <div className={styles.invoiceInfo}>
                            <div className={styles.infoBlock}>
                                <h3>Invoice To:</h3>
                                <p>{invoice.clients?.name}</p>
                                <p style={{ whiteSpace: 'pre-line' }}>{invoice.clients?.address}</p>
                                <p>{invoice.clients?.phone}</p>
                            </div>

                            <div className={styles.infoBlock} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '5px' }}>
                                <strong>Invoice No:</strong> <span>{invoice.invoice_number}</span>
                                <strong>Invoice Date:</strong> <span>{new Date(invoice.date).toLocaleDateString('en-GB')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.tableSection}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.invoice_items?.map((item: any, index: number) => (
                                <tr key={index}>
                                    <td style={{ fontWeight: '600' }}>{item.item_name}</td>
                                    <td style={{ color: '#666' }}>{item.description || '-'}</td>
                                    <td>{symbol}{item.price.toLocaleString()}</td>
                                    <td>{item.discount_percent > 0 ? `${item.discount_percent}%` : '-'}</td>
                                    <td style={{ fontWeight: '600' }}>{symbol}{item.total.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.totalsSection}>
                        <div className={styles.totalRow}>
                            <span>Subtotal</span>
                            <span>{symbol}{invoice.invoice_items?.reduce((a: any, b: any) => a + Number(b.price), 0).toFixed(2)}</span>
                        </div>
                        {invoice.discount_total > 0 && (
                             <div className={styles.totalRow}>
                                <span>Discount</span>
                                <span>-{symbol}{invoice.discount_total.toFixed(2)}</span>
                            </div>
                        )}
                        <div className={styles.finalPriceRow}>
                            <span>Final Price</span>
                            <span>{symbol}{invoice.final_price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.footerLeft}>
                        <img src="/brand-icon-white.png" alt="Brandspire" className={styles.footerLogo} />
                        <div className={styles.footerContact}>
                            <p>{contact.website}</p>
                            <p>{contact.email}</p>
                            <p>{contact.phones}</p>
                        </div>
                    </div>
                    
                    <div className={styles.bankDetails}>
                        <h4>Bank Details</h4>
                        <p><strong>Bank:</strong> {bank.bank_name}</p>
                        <p><strong>A/C:</strong> {bank.account_number}</p>
                        <p><strong>Name:</strong> {bank.account_name}</p>
                        <p><strong>Branch:</strong> {bank.branch}</p>
                        <p><strong>SWIFT:</strong> {bank.swift_code}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
