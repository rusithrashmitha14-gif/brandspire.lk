import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import CaseStudyForm from '../CaseStudyForm';
import layoutStyles from '../../admin-table.module.css';

export default async function EditCaseStudyPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: caseStudy, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !caseStudy) {
        notFound();
    }

    return (
        <div>
            <div className={layoutStyles.pageHeader}>
                <h1>Edit Case Study: {caseStudy.client_name}</h1>
            </div>
            <CaseStudyForm caseStudy={caseStudy} />
        </div>
    );
}
