import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function ManageProjectsPage() {
    const supabase = await createClient();
    
    const { data: projects } = await supabase
        .from('projects')
        .select(`
            *,
            clients ( name )
        `)
        .order('created_at', { ascending: false });

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>Manage Projects</h1>
                    <p style={{ color: '#64748b', marginTop: '4px' }}>Administrative list of all website builds.</p>
                </div>
                <Link href="/admin/projects" style={{ 
                    background: '#f1f5f9', 
                    color: '#475569', 
                    padding: '10px 20px', 
                    borderRadius: '8px', 
                    textDecoration: 'none', 
                    fontWeight: '600', 
                    fontSize: '14px' 
                }}>
                    ← Back to Board
                </Link>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Project Name</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Client</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                            <th style={{ padding: '16px', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Due Date</th>
                            <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects?.map((project) => (
                            <tr key={project.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '16px' }}>
                                    <Link href={`/admin/projects/${project.id}`} style={{ fontWeight: '700', color: '#0f172a', textDecoration: 'none' }}>
                                        {project.name}
                                    </Link>
                                </td>
                                <td style={{ padding: '16px', color: '#475569' }}>{project.clients?.name || 'Internal'}</td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{ 
                                        fontSize: '11px', 
                                        fontWeight: '700', 
                                        padding: '4px 8px', 
                                        borderRadius: '6px',
                                        textTransform: 'uppercase',
                                        background: project.status === 'completed' ? '#dcfce7' : project.status === 'in_progress' ? '#dbeafe' : '#fef9c3',
                                        color: project.status === 'completed' ? '#166534' : project.status === 'in_progress' ? '#1e40af' : '#854d0e'
                                    }}>
                                        {project.status.replace('_', ' ')}
                                    </span>
                                </td>
                                <td style={{ padding: '16px', color: '#64748b' }}>
                                    {project.due_date ? new Date(project.due_date).toLocaleDateString() : 'No date'}
                                </td>
                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                    <Link href={`/admin/projects/${project.id}/edit`} style={{ color: '#3b82f6', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
