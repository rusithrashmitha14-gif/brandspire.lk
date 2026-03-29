import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import styles from '../admin-table.module.css';

export default async function ClientsPage() {
    const supabase = await createClient();
    const { data: clients } = await supabase.from('clients').select('*').order('created_at', { ascending: false });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1>Client Management</h1>
                    <p>Manage your clients and their contact information.</p>
                </div>
                <Link href="/admin/clients/new" className={styles.addBtn}>
                    + Add New Client
                </Link>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients && clients.length > 0 ? (
                            clients.map((client) => (
                                <tr key={client.id}>
                                    <td><strong>{client.name}</strong></td>
                                    <td>{client.email || '-'}</td>
                                    <td>{client.phone || '-'}</td>
                                    <td>{client.address || '-'}</td>
                                    <td className={styles.actions}>
                                        <Link href={`/admin/clients/${client.id}`} className={styles.editBtn}>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className={styles.empty}>No clients found. Add your first client to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
