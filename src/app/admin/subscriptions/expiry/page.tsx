import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import styles from './expiry-dashboard.module.css';
import PaymentToggle from './PaymentToggle';

export default async function ExpiryDashboardPage() {
    const supabase = await createClient();
    
    // Get start and end of current month
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    // Fetch subscriptions expiring this month with client info
    const { data: expiringThisMonth } = await supabase
        .from('domain_hosting')
        .select(`
            *,
            clients ( id, name, email, phone )
        `)
        .gte('expiry_date', firstDay)
        .lte('expiry_date', lastDay)
        .order('expiry_date');

    const paid = expiringThisMonth?.filter(s => s.renewal_paid) || [];
    const unpaid = expiringThisMonth?.filter(s => !s.renewal_paid) || [];

    // Grouping helper
    const groupByClient = (list: any[]) => {
        return list.reduce((acc: any, item: any) => {
            const clientId = item.client_id;
            if (!acc[clientId]) {
                acc[clientId] = {
                    client: item.clients,
                    items: []
                };
            }
            acc[clientId].items.push(item);
            return acc;
        }, {});
    };

    const groupedUnpaid = groupByClient(unpaid);
    const groupedPaid = groupByClient(paid);

    const monthName = now.toLocaleString('default', { month: 'long' });

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>Domain & Hosting Expiration</h1>
                    <p>Manage renewals and track payments for {monthName}.</p>
                </div>
                <div className={styles.stats}>
                    <div className={styles.statBox}>
                        <span className={styles.statVal}>{unpaid.length}</span>
                        <span className={styles.statLabel}>Pending</span>
                    </div>
                    <div className={styles.statBox}>
                        <span className={styles.statVal}>{paid.length}</span>
                        <span className={styles.statLabel}>Paid</span>
                    </div>
                </div>
            </header>

            <div className={styles.sections}>
                {/* UNPAID SECTION */}
                <section className={styles.section}>
                    <h2 className={styles.unpaidTitle}>🔴 Pending Payments ({unpaid.length})</h2>
                    <div className={styles.list}>
                        {Object.values(groupedUnpaid).map((group: any) => (
                            <ClientGroupCard key={group.client.id} group={group} isPaid={false} />
                        ))}
                        {unpaid.length === 0 && <p className={styles.empty}>All renewals for this month are cleared!</p>}
                    </div>
                </section>

                {/* PAID SECTION */}
                <section className={styles.section}>
                    <h2 className={styles.paidTitle}>🟢 Received / Renewed ({paid.length})</h2>
                    <div className={styles.list}>
                        {Object.values(groupedPaid).map((group: any) => (
                            <ClientGroupCard key={group.client.id} group={group} isPaid={true} />
                        ))}
                        {paid.length === 0 && <p className={styles.empty}>No payments received yet for {monthName}.</p>}
                    </div>
                </section>
            </div>
        </div>
    );
}

function ClientGroupCard({ group, isPaid }: { group: any, isPaid: boolean }) {
    const totalCost = group.items.reduce((sum: number, item: any) => sum + (item.cost || 0), 0);
    const currency = group.items[0]?.currency === 'USD' ? '$' : 'Rs.';

    return (
        <div className={styles.clientGroupCard}>
            <div className={styles.clientHeader}>
                <div className={styles.clientInfo}>
                    <h3>{group.client?.name}</h3>
                    <div className={styles.clientContact}>
                        <span>✉️ {group.client?.email || '-'}</span>
                        <span>📞 {group.client?.phone || '-'}</span>
                    </div>
                </div>
                <div className={styles.groupTotal}>
                    <span className={styles.totalLabel}>Total Due:</span>
                    <span className={styles.totalAmount}>{currency} {totalCost.toLocaleString()}</span>
                </div>
            </div>
            
            <div className={styles.itemList}>
                {group.items.map((item: any) => (
                    <div key={item.id} className={styles.subItem}>
                        <div className={styles.subItemMain}>
                            <span className={styles.miniType}>{item.type.toUpperCase()}</span>
                            <div className={styles.subItemDetails}>
                                <strong>{item.name}</strong>
                                <span className={styles.miniExpiry}>Expires: {new Date(item.expiry_date).toLocaleDateString('en-GB')}</span>
                                {item.billing_cycle && <span className={styles.cycleBadge}>{item.billing_cycle}</span>}
                            </div>
                        </div>
                        <div className={styles.subItemActions}>
                            <div className={styles.priceInfo}>
                                {currency} {item.cost?.toLocaleString()}
                            </div>
                            <PaymentToggle id={item.id} isPaid={item.renewal_paid} />
                            <Link href={`/admin/subscriptions/${item.id}`} className={styles.miniEditBtn}>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
