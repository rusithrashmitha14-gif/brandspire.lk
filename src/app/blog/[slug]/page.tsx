import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';

interface BlogPostProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostDetail({ params }: BlogPostProps) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from('blog_posts')
        .select(`
            *,
            team ( name, photo )
        `)
        .eq('slug', slug)
        .single();

    if (error || !post) {
        notFound();
    }

    return <BlogDetailClient post={post} />;
}
