import Link from 'next/link';
import { signOut } from '../login/actions';
import { getUserProfile } from '@/utils/supabase/auth';
import styles from './admin-layout.module.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getUserProfile();
  const isAdmin = profile?.is_admin === true;

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h2>Brandspire Admin</h2>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>Dashboard</Link>
          
          <div className={styles.navDivider}>Content Manager</div>
          {isAdmin && <Link href="/admin/services" className={styles.navLink}>Services</Link>}
          <Link href="/admin/case-studies" className={styles.navLink}>Case Studies</Link>
          {isAdmin && (
            <>
              <Link href="/admin/blog" className={styles.navLink}>Blog Posts</Link>
              <Link href="/admin/team" className={styles.navLink}>Team Members</Link>
            </>
          )}
          
          <div className={styles.navDivider}>Operations</div>
          {isAdmin && (
            <>
              <Link href="/admin/subscriptions" className={styles.navLink}>Domain & Hosting</Link>
              <Link href="/admin/subscriptions/expiry" className={styles.navLink}>Expiration 🔴</Link>
            </>
          )}
          <Link href="/admin/projects" className={styles.navLink}>Projects</Link>

          {isAdmin && (
            <>
              <div className={styles.navDivider}>Financials</div>
              <Link href="/admin/clients" className={styles.navLink}>Clients</Link>
              <Link href="/admin/invoices" className={styles.navLink}>Invoices</Link>
            </>
          )}
        </nav>

        <div className={styles.sidebarFooter}>
            <form action={signOut}>
                <button type="submit" className={styles.signOutBtn}>
                    Sign Out
                </button>
            </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Simple Topbar */}
        <header className={styles.topbar}>
            <div className={styles.topbarContent}>
                <span className={styles.userBadge}>
                    {profile?.name} {isAdmin ? '(Admin)' : '(Builder)'}
                </span>
            </div>
        </header>
        
        {/* Page Content */}
        <div className={styles.pageContent}>
            {children}
        </div>
      </main>
    </div>
  );
}
