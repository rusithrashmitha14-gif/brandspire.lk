import { createClient } from '@/utils/supabase/server';
import ProjectForm from '../ProjectForm';
import Link from 'next/link';

export default async function NewProjectPage() {
    const supabase = await createClient();
    
    // Fetch Clients for the dropdown
    const { data: clients } = await supabase
        .from('clients')
        .select('id, name')
        .order('name');

    return (
        <div style={{ maxWidth: '800px', padding: '24px' }}>
            <div style={{ marginBottom: '32px' }}>
                <Link href="/admin/projects" style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    ← Back to Projects Board
                </Link>
                <h1 style={{ marginTop: '16px', fontSize: '32px', fontWeight: '800', color: '#0f172a' }}>Create New Project</h1>
                <p style={{ color: '#64748b', marginTop: '8px' }}>Set up a new website build project for a client.</p>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <ProjectForm clients={clients || []} />
            </div>
        </div>
    );
}
