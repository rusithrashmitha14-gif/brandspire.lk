import TeamForm from '../TeamForm';
import layoutStyles from '../../admin-table.module.css';

export default function NewTeamMemberPage() {
    return (
        <div>
            <div className={layoutStyles.pageHeader}>
                <h1>Add New Team Member</h1>
            </div>
            <TeamForm />
        </div>
    );
}
