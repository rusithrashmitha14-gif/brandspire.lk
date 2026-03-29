'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getUserProfile } from '@/utils/supabase/auth'

// --- Project Actions ---
export async function createProject(prevState: any, formData: FormData) {
    const supabase = await createClient()
    
    // 1. Create Project
    const projectData = {
        client_id: formData.get('client_id') || null,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        brief: formData.get('brief') as string,
        due_date: formData.get('due_date') || null,
        credentials: { notes: formData.get('credentials') },
        status: formData.get('status') || 'pending'
    }

    const { data: project, error: pError } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single()

    if (pError) return { error: pError.message }

    // 2. Insert Domain if provided
    const domainName = formData.get('domain_name') as string;
    if (domainName) {
        await supabase.from('domain_hosting').insert([{
            project_id: project.id,
            client_id: projectData.client_id,
            type: 'domain',
            name: domainName,
            expiry_date: formData.get('domain_expiry') || null,
            cost: parseFloat(formData.get('domain_cost') as string || '0'),
            billing_cycle: formData.get('domain_billing_cycle') || 'yearly',
            renewal_paid: false,
            status: 'active'
        }]);
    }

    // 3. Insert Hosting if provided
    const hostingName = formData.get('hosting_name') as string;
    if (hostingName) {
        await supabase.from('domain_hosting').insert([{
            project_id: project.id,
            client_id: projectData.client_id,
            type: 'hosting',
            name: hostingName,
            provider: formData.get('hosting_provider') as string,
            expiry_date: formData.get('hosting_expiry') || null,
            cost: parseFloat(formData.get('hosting_cost') as string || '0'),
            billing_cycle: formData.get('hosting_billing_cycle') || 'yearly',
            renewal_paid: false,
            status: 'active'
        }]);
    }
    
    revalidatePath('/admin/projects')
    redirect('/admin/projects')
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
    const supabase = await createClient()
    
    // 1. Update Project basic details
    const data = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        brief: formData.get('brief') as string,
        due_date: formData.get('due_date') || null,
        credentials: { notes: formData.get('credentials') },
        status: formData.get('status') as string,
        builder_id: formData.get('builder_id') || null,
        updated_at: new Date().toISOString()
    }

    const { error: projectError } = await supabase.from('projects').update(data).eq('id', id)
    if (projectError) return { error: projectError.message }

    // 2. Handle Domain update/create
    const domainName = formData.get('domain_name') as string;
    const domainId = formData.get('domain_id') as string;
    
    if (domainName) {
        const domainData = {
            name: domainName,
            expiry_date: formData.get('domain_expiry') || null,
            cost: parseFloat(formData.get('domain_cost') as string || '0'),
            billing_cycle: formData.get('domain_billing_cycle') || 'yearly',
            status: 'active'
        };

        if (domainId) {
            await supabase.from('domain_hosting').update(domainData).eq('id', domainId);
        } else {
            // Get client_id if not in form
            const { data: proj } = await supabase.from('projects').select('client_id').eq('id', id).single();
            await supabase.from('domain_hosting').insert([{
                ...domainData,
                project_id: id,
                client_id: proj?.client_id,
                type: 'domain',
                renewal_paid: false
            }]);
        }
    }

    // 3. Handle Hosting update/create
    const hostingName = formData.get('hosting_name') as string;
    const hostingId = formData.get('hosting_id') as string;

    if (hostingName) {
        const hostingData = {
            name: hostingName,
            provider: formData.get('hosting_provider') as string,
            expiry_date: formData.get('hosting_expiry') || null,
            cost: parseFloat(formData.get('hosting_cost') as string || '0'),
            billing_cycle: formData.get('hosting_billing_cycle') || 'yearly',
            status: 'active'
        };

        if (hostingId) {
            await supabase.from('domain_hosting').update(hostingData).eq('id', hostingId);
        } else {
            // Get client_id if not in form
            const { data: proj } = await supabase.from('projects').select('client_id').eq('id', id).single();
            await supabase.from('domain_hosting').insert([{
                ...hostingData,
                project_id: id,
                client_id: proj?.client_id,
                type: 'hosting',
                renewal_paid: false
            }]);
        }
    }
    
    revalidatePath(`/admin/projects/${id}`)
    revalidatePath('/admin/projects')
    redirect('/admin/projects')
}

export async function updateProjectStatus(id: string, status: string) {
    const supabase = await createClient()
    const profile = await getUserProfile()
    
    if (!profile) return { error: 'Unauthorized' }

    // 1. If moving to IN PROGRESS, set the builder_id
    if (status === 'in_progress') {
        const { error } = await supabase
            .from('projects')
            .update({ 
                status, 
                builder_id: profile.id,
                updated_at: new Date().toISOString() 
            })
            .eq('id', id)
        
        if (error) return { error: error.message }
    } 
    // 2. If moving to COMPLETED, check permissions
    else if (status === 'completed') {
        // Fetch current project to check builder_id
        const { data: project } = await supabase
            .from('projects')
            .select('builder_id')
            .eq('id', id)
            .single()

        const isAuthorized = profile.is_admin || (project?.builder_id === profile.id)

        if (!isAuthorized) {
            return { error: 'Only the assigned builder or an admin can mark this project as finished.' }
        }

        const { error } = await supabase
            .from('projects')
            .update({ 
                status, 
                updated_at: new Date().toISOString() 
            })
            .eq('id', id)
        
        if (error) return { error: error.message }
    }
    // 3. Other status changes (e.g. back to pending)
    else {
        const { error } = await supabase
            .from('projects')
            .update({ 
                status, 
                updated_at: new Date().toISOString() 
            })
            .eq('id', id)
        
        if (error) return { error: error.message }
    }

    revalidatePath(`/admin/projects/${id}`)
    revalidatePath('/admin/projects')
}

export async function deleteProject(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) return { error: error.message }
    revalidatePath('/admin/projects')
    redirect('/admin/projects')
}
