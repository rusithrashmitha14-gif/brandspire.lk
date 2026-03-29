import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import TeamForm from '../TeamForm';
import layoutStyles from '../../admin-table.module.css';

export default async function EditTeamMemberPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: member, error } = await supabase
        .from('team')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !member) {
        notFound();
    }

    return (
        <div>
            <div className={layoutStyles.pageHeader}>
                <h1>Edit Team Member: {member.name}</h1>
            </div>
            <TeamForm member={member} />
        </div>
    );
}
