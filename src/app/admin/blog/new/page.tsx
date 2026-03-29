import BlogForm from '../BlogForm';
import layoutStyles from '../../admin-table.module.css';

export default function NewBlogPostPage() {
    return (
        <div>
            <div className={layoutStyles.pageHeader}>
                <h1>Add New Blog Post</h1>
            </div>
            <BlogForm />
        </div>
    );
}
