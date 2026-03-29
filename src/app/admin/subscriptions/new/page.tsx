import { createClient } from '@/utils/supabase/server';
import SubscriptionForm from '../SubscriptionForm';
import Link from 'next/link';

export default async function NewSubscriptionPage() {
    const supabase = await createClient();
    
    // Fetch clients for the dropdown
    const { data: clients } = await supabase
        .from('clients')
        .select('id, name')
        .order('name');

    return (
        <div style={{ maxWidth: '800px' }}>
            <div style={{ marginBottom: '24px' }}>
                <Link href="/admin/subscriptions" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    ← Back to List
                </Link>
                <h1 style={{ marginTop: '12px' }}>Add Domain or Hosting</h1>
                <p style={{ color: '#64748b' }}>Enter the details for the new service below.</p>
            </div>

            <SubscriptionForm clients={clients || []} />
        </div>
    );
}
