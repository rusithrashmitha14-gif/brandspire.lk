import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import styles from '../admin-table.module.css';
import SubscriptionTable from './SubscriptionTable';

export default async function SubscriptionsPage() {
    const supabase = await createClient();
    
    // Fetch subscriptions with client names
    const { data: subscriptions } = await supabase
        .from('domain_hosting')
        .select(`
            *,
            clients (
                name
            )
        `)
        .order('expiry_date', { ascending: true });

    return (
        <div className={styles.container}>
            <div className={styles.pageHeader}>
                <div>
                    <h1>Domain & Hosting</h1>
                    <p>Track expiry dates and manage client subscriptions.</p>
                </div>
                <Link href="/admin/subscriptions/new" className={styles.addBtn}>
                    + Add New Service
                </Link>
            </div>

            <SubscriptionTable initialSubscriptions={subscriptions || []} />
        </div>
    );
}
