'use client'

import { deleteSubscription } from './actions'
import { useState } from 'react'

export default function DeleteSubscriptionButton({ id }: { id: string }) {
    const [isPending, setIsPending] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this subscription?')) return;
        setIsPending(true);
        try {
            await deleteSubscription(id);
        } catch (err) {
            alert('Failed to delete');
            setIsPending(false);
        }
    }

    return (
        <button 
            onClick={handleDelete} 
            disabled={isPending}
            style={{ 
                background: '#fef2f2', 
                color: '#ef4444', 
                border: '1px solid #fee2e2', 
                padding: '6px 12px', 
                borderRadius: '6px', 
                fontSize: '13px', 
                cursor: 'pointer',
                fontWeight: '600'
            }}
        >
            {isPending ? '...' : 'Delete'}
        </button>
    )
}
