import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import ProjectBoardClient from './ProjectBoardClient';

export default async function ProjectsBoardPage() {
    const supabase = await createClient();
    
    // Fetch all Projects with Client info
    const { data: projects } = await supabase
        .from('projects')
        .select(`
            *,
            clients ( name )
        `)
        .order('created_at', { ascending: false });

    // Fetch all builders (team members)
    const { data: builders } = await supabase
        .from('team')
        .select('id, name')
        .order('name');

    return (
        <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', margin: 0, color: '#0f172a' }}>Projects</h1>
                    <p style={{ margin: '8px 0 0', color: '#64748b' }}>Track your active website builds and their progress.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link href="/admin/projects/new" style={{ 
                        background: '#3b82f6', 
                        color: 'white', 
                        padding: '12px 24px', 
                        borderRadius: '12px', 
                        textDecoration: 'none', 
                        fontWeight: '700', 
                        fontSize: '14px',
                        boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2)'
                    }}>
                        + New Project
                    </Link>
                </div>
            </div>

            <ProjectBoardClient 
                initialProjects={projects || []} 
                builders={builders || []} 
            />
        </div>
    );
}
