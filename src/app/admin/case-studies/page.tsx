import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import DeleteCaseStudyButton from './DeleteCaseStudyButton';
import styles from '../admin-table.module.css';

export default async function AdminCaseStudies() {
    const supabase = await createClient();
    const { data: caseStudies } = await supabase.from('case_studies').select('*').order('created_at', { ascending: false });

    return (
        <div>
            <div className={styles.pageHeader}>
                <h1>Case Studies</h1>
                <Link href="/admin/case-studies/new" className={styles.addBtn}>
                    + Add Case Study
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Industry</th>
                            <th>Slug</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {caseStudies && caseStudies.length > 0 ? (
                            caseStudies.map((project: any) => (
                                <tr key={project.id}>
                                    <td><strong>{project.client_name}</strong></td>
                                    <td>{project.industry}</td>
                                    <td>{project.slug}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/case-studies/${project.id}`} className={styles.editBtn}>
                                                Edit
                                            </Link>
                                            <DeleteCaseStudyButton id={project.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>
                                    <div className={styles.emptyState}>No case studies found.</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
