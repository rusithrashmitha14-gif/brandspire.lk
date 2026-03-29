'use client'

import styles from '../../invoice-preview.module.css';

export default function PrintButton() {
    return (
        <button onClick={() => window.print()} className={styles.printBtn}>
            Print / Save as PDF
        </button>
    );
}
