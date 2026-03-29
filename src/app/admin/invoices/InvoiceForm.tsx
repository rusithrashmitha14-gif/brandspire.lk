'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createInvoiceAction, updateInvoiceAction } from './actions'

interface InvoiceItem {
    item_name: string;
    description: string;
    price: number;
    discount_percent: number;
    total: number;
}

interface InvoiceFormProps {
    clients: any[];
    initialData?: any;
    nextInvoiceNumber?: string;
}

export default function InvoiceForm({ clients, initialData, nextInvoiceNumber }: InvoiceFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [clientId, setClientId] = useState(initialData?.client_id || '');
    const [invoiceNumber, setInvoiceNumber] = useState(initialData?.invoice_number || nextInvoiceNumber || '');
    const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
    const [currency, setCurrency] = useState<'USD' | 'LKR'>(initialData?.currency || 'USD');
    const [status, setStatus] = useState(initialData?.status || 'draft');
    const [items, setItems] = useState<InvoiceItem[]>(initialData?.invoice_items || [
        { item_name: '', description: '', price: 0, discount_percent: 0, total: 0 }
    ]);

    const sym = currency === 'USD' ? '$' : 'Rs.';

    const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
        const newItems = [...items];
        const item = { ...newItems[index], [field]: value };
        if (field === 'price' || field === 'discount_percent') {
            const price = field === 'price' ? Number(value) : Number(item.price);
            const discount = Math.min(100, field === 'discount_percent' ? Number(value) : Number(item.discount_percent));
            item.total = Math.max(0, price * (1 - discount / 100));
        }
        newItems[index] = item;
        setItems(newItems);
    }

    const addItem = () => setItems([...items, { item_name: '', description: '', price: 0, discount_percent: 0, total: 0 }]);
    const removeItem = (index: number) => { if (items.length > 1) setItems(items.filter((_, i) => i !== index)); }

    const subtotal = items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
    const totalDiscount = items.reduce((acc, item) => acc + (Number(item.price) * (Math.min(100, Number(item.discount_percent)) / 100) || 0), 0);
    const finalPrice = items.reduce((acc, item) => acc + (Number(item.total) || 0), 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);
        try {
            const formData = { client_id: clientId, invoice_number: invoiceNumber, date, currency, status, discount_total: totalDiscount, final_price: finalPrice, items };
            const result = initialData ? await updateInvoiceAction(initialData.id, formData) : await createInvoiceAction(formData);
            if (result.error) { setError(result.error); } 
            else { router.push(`/admin/invoices/preview/${result.id}`); }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsPending(false);
        }
    }

    const statusColors: Record<string, string> = { draft: '#f59e0b', sent: '#3b82f6', paid: '#10b981' };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '900px' }}>
            {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                    ⚠️ {error}
                </div>
            )}

            {/* ── Section 1: Invoice Details ── */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ width: '32px', height: '32px', background: '#0f172a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '14px' }}>1</div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Invoice Details</h2>
                        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Basic information about this invoice</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                        <label style={labelStyle}>Bill To (Client) *</label>
                        <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#94a3b8' }}>Select the client this invoice is for</p>
                        <select value={clientId} onChange={e => setClientId(e.target.value)} required style={selectStyle}>
                            <option value="">— Choose a client —</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <Link href="/admin/clients/new" style={{ fontSize: '12px', color: '#6366f1', marginTop: '6px', display: 'inline-block' }}>
                            + Create new client
                        </Link>
                    </div>

                    <div>
                        <label style={labelStyle}>Invoice Number *</label>
                        <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#94a3b8' }}>Auto-generated, but you can edit it</p>
                        <input type="text" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} required style={inputStyle} placeholder="e.g. #WD12" />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                    <div>
                        <label style={labelStyle}>Invoice Date *</label>
                        <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#94a3b8' }}>Date the invoice was issued</p>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={inputStyle} />
                    </div>

                    <div>
                        <label style={labelStyle}>Currency</label>
                        <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#94a3b8' }}>All item prices use this currency</p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {(['USD', 'LKR'] as const).map(c => (
                                <button key={c} type="button" onClick={() => setCurrency(c)} style={{
                                    flex: 1, padding: '10px', border: '2px solid', borderColor: currency === c ? '#0f172a' : '#e2e8f0',
                                    borderRadius: '8px', background: currency === c ? '#0f172a' : 'white',
                                    color: currency === c ? 'white' : '#475569', fontWeight: '600', fontSize: '14px', cursor: 'pointer'
                                }}>
                                    {c === 'USD' ? '$ USD' : 'Rs. LKR'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Payment Status</label>
                        <p style={{ margin: '0 0 6px', fontSize: '12px', color: '#94a3b8' }}>Track where this invoice stands</p>
                        <select value={status} onChange={e => setStatus(e.target.value)} style={{ ...selectStyle, borderColor: statusColors[status], color: statusColors[status], fontWeight: '600' }}>
                            <option value="draft">🟡 Draft</option>
                            <option value="sent">🔵 Sent to Client</option>
                            <option value="paid">🟢 Paid</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ── Section 2: Line Items ── */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', background: '#0f172a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '14px' }}>2</div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Services / Items</h2>
                            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>List every service or product you're billing for</p>
                        </div>
                    </div>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>{items.length} item{items.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Column Headers */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2.5fr 130px 120px 120px 40px', gap: '12px', padding: '0 8px 10px', marginBottom: '4px' }}>
                    {['Service / Item Name', 'Description (Optional)', `Price (${sym})`, 'Discount %', `Total (${sym})`, ''].map((h, i) => (
                        <span key={i} style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</span>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {items.map((item, index) => (
                        <div key={index} style={{ display: 'grid', gridTemplateColumns: '2fr 2.5fr 130px 120px 120px 40px', gap: '12px', background: '#f8fafc', borderRadius: '10px', padding: '12px 8px', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                            <input
                                type="text"
                                placeholder="e.g. Logo Design"
                                value={item.item_name}
                                onChange={e => updateItem(index, 'item_name', e.target.value)}
                                required
                                style={{ ...inputStyle, background: 'white' }}
                            />
                            <input
                                type="text"
                                placeholder="e.g. Primary logo + variations"
                                value={item.description}
                                onChange={e => updateItem(index, 'description', e.target.value)}
                                style={{ ...inputStyle, background: 'white' }}
                            />
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '14px' }}>{sym}</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.price}
                                    onChange={e => updateItem(index, 'price', e.target.value)}
                                    required
                                    style={{ ...inputStyle, background: 'white', paddingLeft: currency === 'USD' ? '28px' : '40px' }}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="0"
                                    value={item.discount_percent}
                                    onChange={e => updateItem(index, 'discount_percent', e.target.value)}
                                    style={{ ...inputStyle, background: 'white', paddingRight: '28px' }}
                                />
                                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '14px', pointerEvents: 'none' }}>%</span>
                            </div>
                            <div style={{ background: '#0f172a', color: 'white', borderRadius: '8px', padding: '10px', textAlign: 'center', fontWeight: '700', fontSize: '14px' }}>
                                {sym}{Number(item.total).toFixed(2)}
                            </div>
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                title="Remove this item"
                                style={{ width: '32px', height: '32px', border: '1px solid #fecaca', background: '#fef2f2', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <button type="button" onClick={addItem} style={{ marginTop: '12px', width: '100%', padding: '12px', border: '2px dashed #cbd5e1', borderRadius: '10px', background: 'transparent', color: '#64748b', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#0f172a', e.currentTarget.style.color = '#0f172a')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#cbd5e1', e.currentTarget.style.color = '#64748b')}
                >
                    + Add Another Item
                </button>
            </div>

            {/* ── Section 3: Summary ── */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ width: '32px', height: '32px', background: '#0f172a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '14px' }}>3</div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>Summary</h2>
                        <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Review the totals before saving</p>
                    </div>
                </div>
                <div style={{ maxWidth: '340px', marginLeft: 'auto' }}>
                    <div style={summaryRowStyle}><span style={{ color: '#64748b' }}>Subtotal (before discount)</span><span>{sym}{subtotal.toFixed(2)}</span></div>
                    <div style={{ ...summaryRowStyle, color: totalDiscount > 0 ? '#10b981' : '#94a3b8' }}><span>Total Discount Applied</span><span>−{sym}{totalDiscount.toFixed(2)}</span></div>
                    <div style={{ ...summaryRowStyle, borderTop: '2px solid #0f172a', paddingTop: '14px', marginTop: '8px', fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                        <span>Amount Due</span><span>{sym}{finalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* ── Actions ── */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Link href="/admin/invoices" style={{ padding: '12px 24px', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#475569', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>
                    Discard
                </Link>
                <button type="submit" disabled={isPending} style={{ padding: '12px 28px', background: isPending ? '#94a3b8' : '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: isPending ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isPending ? '⏳ Saving...' : (initialData ? '💾 Update Invoice' : '🚀 Create & Preview Invoice')}
                </button>
            </div>
        </form>
    );
}

// ── Shared Styles ──
const labelStyle: React.CSSProperties = {
    fontSize: '13px', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '2px'
};

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px',
    fontSize: '14px', color: '#0f172a', boxSizing: 'border-box', fontFamily: 'inherit',
    outline: 'none', transition: 'border-color 0.2s'
};

const selectStyle: React.CSSProperties = {
    ...inputStyle, background: 'white', cursor: 'pointer'
};

const summaryRowStyle: React.CSSProperties = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '10px 0', fontSize: '14px', fontWeight: '600',
    borderBottom: '1px solid #f1f5f9'
};
