import Link from 'next/link';

export default function ProjectBoardCard({ project }: { project: any }) {
    const getDueStatus = (dueDate: string) => {
        if (!dueDate) return null;
        const today = new Date();
        const due = new Date(dueDate);
        const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return { label: 'Overdue', color: '#ef4444' };
        if (diffDays <= 7) return { label: `Due in ${diffDays}d`, color: '#f59e0b' };
        return { label: `Due ${new Date(dueDate).toLocaleDateString('en-GB')}`, color: '#64748b' };
    }

    const dueInfo = getDueStatus(project.due_date);

    return (
        <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'default'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
                    Website Build
                </span>
                {dueInfo && (
                    <span style={{ fontSize: '11px', color: dueInfo.color, fontWeight: '700' }}>
                        {dueInfo.label}
                    </span>
                )}
            </div>

            <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>
                {project.name}
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>
                Client: <strong>{project.clients?.name || 'Internal'}</strong>
            </p>

            {project.brief && (
                <p style={{ 
                    margin: '0 0 16px', 
                    fontSize: '12px', 
                    color: '#94a3b8', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden',
                    lineHeight: '1.5'
                }}>
                    {project.brief}
                </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <Link href={`/admin/projects/${project.id}`} style={{ 
                    fontSize: '12px', 
                    fontWeight: '700', 
                    color: '#3b82f6', 
                    textDecoration: 'none' 
                }}>
                    Open Project Hub →
                </Link>
                <Link href={`/admin/projects/${project.id}/edit`} style={{ 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    color: '#94a3b8', 
                    textDecoration: 'none' 
                }}>
                    Edit
                </Link>
            </div>
        </div>
    );
}
