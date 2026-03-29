import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import DeleteBlogPostButton from './DeleteBlogPostButton';
import styles from '../admin-table.module.css';

export default async function AdminBlogPosts() {
    const supabase = await createClient();
    const { data: posts } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });

    return (
        <div>
            <div className={styles.pageHeader}>
                <h1>Blog Posts</h1>
                <Link href="/admin/blog/new" className={styles.addBtn}>
                    + Add Blog Post
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts && posts.length > 0 ? (
                            posts.map((post: any) => (
                                <tr key={post.id}>
                                    <td><strong>{post.title}</strong></td>
                                    <td>{post.slug}</td>
                                    <td>{new Date(post.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/blog/${post.id}`} className={styles.editBtn}>
                                                Edit
                                            </Link>
                                            <DeleteBlogPostButton id={post.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>
                                    <div className={styles.emptyState}>No blog posts found.</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
