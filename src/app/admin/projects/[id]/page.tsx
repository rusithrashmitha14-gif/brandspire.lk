import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './project-detail.module.css';
import StatusButtons from './StatusButtons';
import { getUserProfile } from '@/utils/supabase/auth';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    
    // Fetch Project with Client and its Domain/Hosting
    // We fetch team separately or handle failure gracefully in case the migration hasn't been run
    const { data: project, error: projectError } = await supabase
        .from('projects')
        .select(`
            *,
            clients ( name, email, phone ),
            domain_hosting ( * )
        `)
        .eq('id', id)
        .single();

    if (!project || projectError) notFound();

    // Try to fetch builder details if builder_id exists
    let builderName = null;
    if (project.builder_id) {
        const { data: teamData } = await supabase
            .from('team')
            .select('name')
            .eq('id', project.builder_id)
            .single();
        builderName = teamData?.name;
    }

    const getDueStatus = (dueDate: string) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return { label: 'Overdue', color: '#ef4444' };
        if (diffDays <= 7) return { label: `Due in ${diffDays} days`, color: '#f59e0b' };
        return { label: `Due on ${new Date(dueDate).toLocaleDateString()}`, color: '#10b981' };
    }

    const dueInfo = project.due_date ? getDueStatus(project.due_date) : null;

    const profile = await getUserProfile();
    const isAdmin = profile?.is_admin === true;

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumb}>
                <Link href="/admin/projects">Projects</Link> / <span>{project.name}</span>
            </div>

            <header className={styles.header}>
                <div className={styles.titleArea}>
                    <h1>{project.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        <span className={styles.statusBadge} data-status={project.status}>
                            {project.status.toUpperCase()}
                        </span>
                        {dueInfo && (
                            <span style={{ fontSize: '13px', fontWeight: '700', color: dueInfo.color }}>
                                📅 {dueInfo.label}
                            </span>
                        )}
                        {builderName && (
                            <span style={{ fontSize: '13px', color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px', fontWeight: '500' }}>
                                👤 Builder: <strong>{builderName}</strong>
                            </span>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', height: 'fit-content' }}>
                    <StatusButtons 
                        projectId={project.id} 
                        currentStatus={project.status} 
                        builderId={project.builder_id}
                        userProfile={profile}
                    />
                    
                    {isAdmin && (
                        <Link href={`/admin/projects/${project.id}/edit`} style={{ 
                            background: '#e2e8f0', 
                            color: '#475569', 
                            padding: '8px 16px', 
                            borderRadius: '8px', 
                            textDecoration: 'none', 
                            fontSize: '13px', 
                            fontWeight: '600' 
                        }}>
                            Edit Project
                        </Link>
                    )}
                </div>
            </header>

            <div className={styles.grid}>
                {/* Main Content: Brief & Requirements */}
                <div className={styles.mainContent}>
                    <section className={styles.section}>
                        <h2>Project Brief & Requirements</h2>
                        <div className={styles.briefContent}>
                            {project.brief ? (
                                project.brief.split('\n').map((line: string, i: number) => (
                                    <p key={i}>{line}</p>
                                ))
                            ) : (
                                <p className={styles.empty}>No brief provided yet.</p>
                            )}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Technical Credentials</h2>
                        <div className={styles.credentialsBox}>
                            {project.credentials?.notes ? (
                                <pre>{project.credentials.notes}</pre>
                            ) : (
                                <p className={styles.empty}>No credentials stored.</p>
                            )}
                        </div>
                    </section>
                </div>

                {/* Sidebar: Client & Services */}
                <aside className={styles.sidebar}>
                    <section className={styles.sideSection}>
                        <h3>Client Information</h3>
                        <div className={styles.clientCard}>
                            <strong>{project.clients?.name}</strong>
                            <p>✉️ {project.clients?.email || 'No email'}</p>
                            <p>📞 {project.clients?.phone || 'No phone'}</p>
                        </div>
                    </section>

                    <section className={styles.sideSection}>
                        <h3>Linked Services</h3>
                        {project.domain_hosting && project.domain_hosting.length > 0 ? (
                            project.domain_hosting.map((service: any) => (
                                <div key={service.id} className={styles.serviceCard}>
                                    <div className={styles.serviceHeader}>
                                        <span className={styles.serviceType}>{service.type.toUpperCase()}</span>
                                        <span className={styles.serviceStatus} data-status={service.status}>{service.status}</span>
                                    </div>
                                    <strong>{service.name}</strong>
                                    <p>Expiry: {new Date(service.expiry_date).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className={styles.empty}>No domain or hosting linked.</p>
                        )}
                        <Link href="/admin/subscriptions/new" className={styles.linkBtn}>+ Add New Domain/Hosting</Link>
                    </section>
                </aside>
            </div>
        </div>
    );
}
