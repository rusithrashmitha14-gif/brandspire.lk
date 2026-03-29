import CaseStudyForm from '../CaseStudyForm';
import layoutStyles from '../../admin-table.module.css';

export default function NewCaseStudyPage() {
    return (
        <div>
            <div className={layoutStyles.pageHeader}>
                <h1>Add New Case Study</h1>
            </div>
            <CaseStudyForm />
        </div>
    );
}
