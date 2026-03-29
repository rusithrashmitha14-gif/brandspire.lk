'use client'

import { useTransition } from 'react'
import { deleteService } from './actions'
import styles from '../admin-table.module.css'

export default function DeleteServiceButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
            startTransition(() => {
                deleteService(id);
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
