import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import BlogForm from '../BlogForm';
import layoutStyles from '../../admin-table.module.css';

export default async function EditBlogPostPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !post) {
        notFound();
    }

    return (
        <div>
            <div className={layoutStyles.pageHeader}>
                <h1>Edit Blog Post: {post.title}</h1>
            </div>
            <BlogForm post={post} />
        </div>
    );
}
