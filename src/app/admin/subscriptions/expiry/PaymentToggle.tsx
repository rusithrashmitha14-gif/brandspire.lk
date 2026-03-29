'use client'

import { useTransition } from 'react'
import { toggleSubscriptionPaid } from '../actions'
import styles from './expiry-dashboard.module.css'

export default function PaymentToggle({ id, isPaid }: { id: string, isPaid: boolean }) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            const result = await toggleSubscriptionPaid(id, isPaid);
            if (result?.error) {
                alert(result.error);
            }
        });
    };

    return (
        <button 
            onClick={handleToggle} 
            disabled={isPending}
            className={isPaid ? styles.paidToggleBtn : styles.unpaidToggleBtn}
        >
            {isPending ? 'Updating...' : (isPaid ? '✓ Paid' : 'Mark as Paid')}
        </button>
    );
}
