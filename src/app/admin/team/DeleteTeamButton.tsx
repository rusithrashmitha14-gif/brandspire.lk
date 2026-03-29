'use client'

import { useTransition } from 'react'
import { deleteTeamMember } from './actions'
import styles from '../admin-table.module.css'

export default function DeleteTeamButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to remove this team member?")) {
            startTransition(() => {
                deleteTeamMember(id);
            });
        }
    };

    return (
        <button 
            className={styles.deleteBtn} 
            onClick={handleDelete}
            disabled={isPending}
        >
            {isPending ? 'Removing...' : 'Delete'}
        </button>
    );
}
