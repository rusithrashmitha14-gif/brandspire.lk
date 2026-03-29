import { createClient } from '@/utils/supabase/server';
import CaseStudiesClient from './CaseStudiesClient';

export default async function CaseStudies() {
    const supabase = await createClient();
    const { data: caseStudies } = await supabase.from('case_studies').select('*');
    
    return <CaseStudiesClient caseStudies={caseStudies || []} />;
}
