'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import DeleteSubscriptionButton from './DeleteSubscriptionButton';
import styles from '../admin-table.module.css';

export default function SubscriptionTable({ initialSubscriptions }: { initialSubscriptions: any[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const getStatusColor = (status: string, expiryDate: string) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (status === 'expired' || diffDays < 0) return '#ef4444'; // Red
        if (diffDays <= 30) return '#f59e0b'; // Orange/Yellow
        return '#10b981'; // Green
    }

    const filteredSubscriptions = initialSubscriptions.filter(sub => {
        const query = searchQuery.toLowerCase();
        return (
            sub.name?.toLowerCase().includes(query) ||
            sub.clients?.name?.toLowerCase().includes(query) ||
            sub.provider?.toLowerCase().includes(query) ||
            sub.type?.toLowerCase().includes(query)
        );
    });

    // Grouping logic
    const groupedSubscriptions = filteredSubscriptions.reduce((acc: any, item: any) => {
        const clientId = item.client_id || 'unknown';
        if (!acc[clientId]) {
            acc[clientId] = {
                clientName: item.clients?.name || 'Unknown Client',
                items: []
            };
        }
        acc[clientId].items.push(item);
        return acc;
    }, {});

    return (
        <div className={styles.tableBlock}>
            <div className={styles.searchWrapper}>
                <input 
                    type="text" 
                    placeholder="Search by client, domain, or service name..." 
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Type</th>
                            <th>Billing</th>
                            <th>Provider</th>
                            <th>Expiry Date</th>
                            <th>Cost</th>
                            <th>Paid</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {Object.keys(groupedSubscriptions).length > 0 ? (
                        Object.values(groupedSubscriptions).map((group: any) => (
                            <React.Fragment key={group.clientName}>
                                <tbody key={`header-${group.clientName}`}>
                                    <tr>
                                        <td colSpan={9} className={styles.clientGroupRow}>
                                            {group.clientName} ({group.items.length})
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody key={`body-${group.clientName}`} className={styles.groupBody}>
                                    {group.items.map((sub: any) => {
                                        const statusColor = getStatusColor(sub.status, sub.expiry_date);
                                        const expiry = new Date(sub.expiry_date);
                                        const today = new Date();
                                        const isExpiringSoon = sub.status === 'active' && 
                                            (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 30;

                                        return (
                                            <tr key={sub.id}>
                                                <td style={{ paddingLeft: '40px' }}><strong>{sub.name}</strong></td>
                                                <td style={{ textTransform: 'capitalize' }}>{sub.type}</td>
                                                <td>
                                                    <span style={{ 
                                                        fontSize: '11px', 
                                                        background: '#eff6ff', 
                                                        color: '#3b82f6', 
                                                        padding: '2px 8px', 
                                                        borderRadius: '10px',
                                                        textTransform: 'capitalize',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {sub.billing_cycle || 'yearly'}
                                                    </span>
                                                </td>
                                                <td>{sub.provider || '-'}</td>
                                                <td>
                                                    <span style={{ 
                                                        color: statusColor, 
                                                        fontWeight: isExpiringSoon ? 'bold' : 'normal',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px'
                                                    }}>
                                                        {isExpiringSoon && '⚠️ '}
                                                        {new Date(sub.expiry_date).toLocaleDateString('en-GB')}
                                                    </span>
                                                </td>
                                                <td>{sub.currency === 'USD' ? '$' : 'Rs. '}{sub.cost?.toLocaleString()}</td>
                                                <td>
                                                    {sub.renewal_paid ? (
                                                        <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Paid</span>
                                                    ) : (
                                                        <span style={{ color: '#ef4444', fontWeight: 'bold' }}>✗ Pending</span>
                                                    )}
                                                </td>
                                                <td>
                                                    <span style={{ 
                                                        display: 'inline-block',
                                                        padding: '2px 8px',
                                                        borderRadius: '4px',
                                                        fontSize: '11px',
                                                        fontWeight: 'bold',
                                                        background: statusColor, 
                                                        color: 'white' 
                                                    }}>
                                                        {sub.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className={styles.actions}>
                                                    <Link href={`/admin/subscriptions/${sub.id}`} className={styles.editBtn}>
                                                        Edit
                                                    </Link>
                                                    <DeleteSubscriptionButton id={sub.id} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </React.Fragment>
                        ))
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={9} className={styles.emptyState}>
                                    {searchQuery ? `No results found for "${searchQuery}"` : 'No subscriptions found.'}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
