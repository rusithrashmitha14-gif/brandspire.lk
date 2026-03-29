'use client'

import { useTransition } from 'react'
import { deleteBlogPost } from './actions'
import styles from '../admin-table.module.css'

export default function DeleteBlogPostButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
            startTransition(() => {
                deleteBlogPost(id);
            });
        }
    };

    return (
        <button 
            className={styles.deleteBtn} 
            onClick={handleDelete}
            disabled={isPending}
        >
            {isPending ? 'Deleting...' : 'Delete'}
        </button>
    );
}
