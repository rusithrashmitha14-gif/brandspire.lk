import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ClientForm from '../ClientForm';
import styles from '../../dashboard.module.css';

export default async function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: client } = await supabase.from('clients').select('*').eq('id', id).single();

    if (!client) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Edit Client</h1>
                <p>Update information for {client.name}.</p>
            </div>
            <ClientForm client={client} />
        </div>
    );
}
