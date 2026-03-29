import { createClient } from '@/utils/supabase/server';
import AboutClient from './AboutClient';

export default async function About() {
    const supabase = await createClient();
    const { data: teamMembers } = await supabase.from('team').select('*').order('is_admin', { ascending: false }).order('created_at', { ascending: true });

    return <AboutClient teamMembers={teamMembers || []} />;
}
