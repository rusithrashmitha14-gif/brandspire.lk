import { createClient } from '@/utils/supabase/server';
import ProjectForm from '../../ProjectForm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    
    // Fetch Project Details
    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (!project) notFound();

    // Fetch Clients for dropdown
    const { data: clients } = await supabase.from('clients').select('id, name').order('name');

    // Fetch all team members (builders)
    const { data: builders } = await supabase
        .from('team')
        .select('id, name')
        .order('name');

    // Fetch linked services (domain/hosting)
    const { data: subscriptions } = await supabase
        .from('domain_hosting')
        .select('*')
        .eq('project_id', id);

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
                <Link href={`/admin/projects/${id}`} style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>
                    ← Back to Project Hub
                </Link>
                <h1 style={{ fontSize: '24px', fontWeight: '800', marginTop: '12px' }}>Edit Project: {project.name}</h1>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <ProjectForm 
                    project={project} 
                    clients={clients || []} 
                    subscriptions={subscriptions || []} 
                    builders={builders || []}
                />
            </div>
        </div>
    );
}
