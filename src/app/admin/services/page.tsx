import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import DeleteServiceButton from './DeleteServiceButton';
import styles from '../admin-table.module.css';

export default async function AdminServices() {
    const supabase = await createClient();
    const { data: services } = await supabase.from('services').select('*').order('created_at', { ascending: false });

    return (
        <div>
            <div className={styles.pageHeader}>
                <h1>Services</h1>
                <Link href="/admin/services/new" className={styles.addBtn}>
                    + Add New Service
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Icon</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services && services.length > 0 ? (
                            services.map((service) => (
                                <tr key={service.id}>
                                    <td><strong>{service.title}</strong></td>
                                    <td>{service.slug}</td>
                                    <td>{service.icon || '-'}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/services/${service.id}`} className={styles.editBtn}>
                                                Edit
                                            </Link>
                                            <DeleteServiceButton id={service.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>
                                    <div className={styles.emptyState}>No services found.</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
