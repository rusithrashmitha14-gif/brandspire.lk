import { createClient } from '@/utils/supabase/server';
import CaseStudiesClient from './CaseStudiesClient';

export default async function CaseStudies() {
    const supabase = await createClient();
    const { data: caseStudies } = await supabase.from('case_studies').select('*').order('created_at', { ascending: false });
    
    return <CaseStudiesClient caseStudies={caseStudies || []} />;
}
