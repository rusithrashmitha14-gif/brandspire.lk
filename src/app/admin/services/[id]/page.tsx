import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ServiceForm from '../ServiceForm';
import layoutStyles from '../../admin-table.module.css';

export default async function EditServicePage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: service, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !service) {
        notFound();
    }

    return (
        <div>
            <div className={layoutStyles.pageHeader}>
                <h1>Edit Service: {service.title}</h1>
            </div>
            <ServiceForm service={service} />
        </div>
    );
}
