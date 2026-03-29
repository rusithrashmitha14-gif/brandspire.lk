import { createClient } from '@/utils/supabase/server';
import SubscriptionForm from '../SubscriptionForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditSubscriptionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    
    // Fetch subscription details
    const { data: subscription } = await supabase
        .from('domain_hosting')
        .select('*')
        .eq('id', id)
        .single();

    if (!subscription) notFound();

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
                <h1 style={{ marginTop: '12px' }}>Edit Service</h1>
                <p style={{ color: '#64748b' }}>Update the details for this service below.</p>
            </div>

            <SubscriptionForm subscription={subscription} clients={clients || []} />
        </div>
    );
}
