import ServiceForm from '../ServiceForm';
import layoutStyles from '../../admin-table.module.css';

export default function NewServicePage() {
    return (
        <div>
            <div className={layoutStyles.pageHeader}>
                <h1>Add New Service</h1>
            </div>
            <ServiceForm />
        </div>
    );
}
