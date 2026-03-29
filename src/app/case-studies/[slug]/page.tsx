import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import CaseStudyDetailClient from './CaseStudyDetailClient';

interface CaseStudyProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CaseStudyDetail({ params }: CaseStudyProps) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: caseStudy, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !caseStudy) {
        notFound();
    }

    return <CaseStudyDetailClient caseStudy={caseStudy} />;
}
