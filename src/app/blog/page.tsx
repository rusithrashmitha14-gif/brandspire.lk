import { createClient } from '@/utils/supabase/server';
import BlogClient from './BlogClient';

export default async function Blog() {
    const supabase = await createClient();
    const { data: posts } = await supabase.from('blog_posts').select('*');
    
    return <BlogClient posts={posts || []} />;
}
