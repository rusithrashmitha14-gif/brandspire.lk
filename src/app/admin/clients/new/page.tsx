import ClientForm from '../ClientForm';
import styles from '../../dashboard.module.css';

export default function NewClientPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Add New Client</h1>
                <p>Register a new client for invoicing.</p>
            </div>
            <ClientForm />
        </div>
    );
}
