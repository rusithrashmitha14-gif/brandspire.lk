import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import DeleteTeamButton from './DeleteTeamButton';
import styles from '../admin-table.module.css';

export default async function AdminTeam() {
    const supabase = await createClient();
    const { data: teamMembers } = await supabase.from('team').select('*').order('created_at', { ascending: true });

    return (
        <div>
            <div className={styles.pageHeader}>
                <h1>Team Management</h1>
                <Link href="/admin/team/new" className={styles.addBtn}>
                    + Add Team Member
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role / Title</th>
                            <th>Login Email</th>
                            <th>Access</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembers && teamMembers.length > 0 ? (
                            teamMembers.map((member: any) => (
                                <tr key={member.id}>
                                    <td><strong>{member.name}</strong></td>
                                    <td>{member.role}</td>
                                    <td>{member.email || '-'}</td>
                                    <td>
                                        <span style={{ 
                                            background: member.is_admin ? '#dcfce7' : '#f1f5f9',
                                            color: member.is_admin ? '#15803d' : '#475569',
                                            padding: '2px 8px',
                                            borderRadius: '6px',
                                            fontSize: '11px',
                                            fontWeight: '700'
                                        }}>
                                            {member.is_admin ? 'ADMIN' : 'BUILDER'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/team/${member.id}`} className={styles.editBtn}>
                                                Edit
                                            </Link>
                                            <DeleteTeamButton id={member.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>
                                    <div className={styles.emptyState}>No team members found.</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
