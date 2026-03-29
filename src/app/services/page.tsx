import { createClient } from '@/utils/supabase/server';
import ServicesClient from './ServicesClient';

export default async function Services() {
    const supabase = await createClient();
    const { data: services, error } = await supabase.from('services').select('*');
    
    const SERVICES = services || [];
    
    return <ServicesClient services={SERVICES} />;
}
