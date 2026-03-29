'use client'

import { useTransition } from 'react'
import { deleteCaseStudy } from './actions'
import styles from '../admin-table.module.css'

export default function DeleteCaseStudyButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this case study? This action cannot be undone.")) {
            startTransition(() => {
                deleteCaseStudy(id);
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
