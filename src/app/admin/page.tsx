import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Stats for Expiry (This Month)
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    // Fetch counts and stats
    const [
        { count: servicesCount },
        { count: activeProjectsCount },
        { count: pendingProjectsCount },
        { data: expirations }
    ] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'in_progress'),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('domain_hosting').select('id, renewal_paid').gte('expiry_date', firstDay).lte('expiry_date', lastDay)
    ]);

    const unpaidRenewals = expirations?.filter(e => !e.renewal_paid).length || 0;
    
    // Get user profile for role check
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase.from('team').select('is_admin').eq('email', user?.email).single();
    const isAdmin = profile?.is_admin === true;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Dashboard</h1>
                <p>{isAdmin ? "Agency Administrator Overview" : "Your active website build projects"}</p>
            </div>

            <div className={styles.dashboardGrid}>
                {/* Column 1: Operations Focus */}
                <div className={styles.mainCol}>
                    <div className={styles.welcomeCard}>
                        <h2>Website Build Pipeline</h2>
                        <p>You have <strong>{activeProjectsCount || 0} projects in progress</strong> and <strong>{pendingProjectsCount || 0} projects pending</strong> to start.</p>
                        <div className={styles.actions}>
                            <Link href="/admin/projects" className={styles.primaryBtn}>Open Project Board</Link>
                            <Link href="/admin/projects/new" className={styles.secondaryBtn}>+ New Project</Link>
                        </div>
                    </div>

                    {isAdmin && (
                        <div className={styles.statsRow}>
                            <div className={styles.miniStat}>
                                <span className={styles.miniLabel}>Total Services</span>
                                <span className={styles.miniVal}>{servicesCount || 0}</span>
                            </div>
                            <div className={styles.miniStat}>
                                <span className={styles.miniLabel}>Team Members</span>
                                <span className={styles.miniVal}>3</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Column 2: High Priority Alerts */}
                <div className={styles.sideCol}>
                    {isAdmin && (
                        <div className={`${styles.alertCard} ${unpaidRenewals > 0 ? styles.urgent : ''}`}>
                            <div className={styles.alertHeader}>
                                <h3>Domain & Hosting Expiration</h3>
                                <span className={styles.monthBadge}>{now.toLocaleString('default', { month: 'short' })}</span>
                            </div>
                            <div className={styles.alertBody}>
                                <p className={styles.alertMain}>{unpaidRenewals} Pending Payments</p>
                                <p className={styles.alertSub}>Domain & hosting renewals due this month.</p>
                            </div>
                            <Link href="/admin/subscriptions/expiry" className={styles.alertLink}>
                                View Tracker →
                            </Link>
                        </div>
                    )}

                    <div className={styles.quickLinks}>
                        <Link href="/admin/case-studies/new" className={styles.quickBtn}>+ New Case Study</Link>
                        {isAdmin && (
                            <>
                                <Link href="/admin/invoices/new" className={styles.quickBtn}>+ New Invoice</Link>
                                <Link href="/admin/subscriptions/new" className={styles.quickBtn}>+ Add Domain/Hosting</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
