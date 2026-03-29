'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createSubscription(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const data = {
    client_id: formData.get('client_id') as string,
    project_id: formData.get('project_id') || null,
    type: formData.get('type') as string,
    name: formData.get('name') as string,
    provider: formData.get('provider') as string,
    expiry_date: formData.get('expiry_date') as string,
    cost: Number(formData.get('cost')) || 0,
    currency: formData.get('currency') as string || 'USD',
    status: formData.get('status') as string || 'active',
    renewal_paid: formData.get('renewal_paid') === 'on',
    billing_cycle: formData.get('billing_cycle') as string || 'yearly',
    notes: formData.get('notes') as string,
  }

  const { error } = await supabase.from('domain_hosting').insert([data])

  if (error) {
     return { error: error.message }
  }

  revalidatePath('/admin/subscriptions')
  redirect('/admin/subscriptions')
}

export async function updateSubscription(id: string, prevState: any, formData: FormData) {
    const supabase = await createClient()

    const data = {
        client_id: formData.get('client_id') as string,
        project_id: formData.get('project_id') || null,
        type: formData.get('type') as string,
        name: formData.get('name') as string,
        provider: formData.get('provider') as string,
        expiry_date: formData.get('expiry_date') as string,
        cost: Number(formData.get('cost')) || 0,
        currency: formData.get('currency') as string || 'USD',
        status: formData.get('status') as string || 'active',
        renewal_paid: formData.get('renewal_paid') === 'on',
        billing_cycle: formData.get('billing_cycle') as string || 'yearly',
        notes: formData.get('notes') as string,
        updated_at: new Date().toISOString()
    }

    const { error } = await supabase.from('domain_hosting').update(data).eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/subscriptions')
    redirect('/admin/subscriptions')
}

export async function deleteSubscription(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('domain_hosting').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/subscriptions')
    redirect('/admin/subscriptions')
}

export async function toggleSubscriptionPaid(id: string, currentStatus: boolean) {
    const supabase = await createClient()

    // Fetch the current subscription to get current expiry and billing cycle
    const { data: sub, error: fetchError } = await supabase
        .from('domain_hosting')
        .select('expiry_date, billing_cycle')
        .eq('id', id)
        .single();

    if (fetchError || !sub) {
        return { error: fetchError?.message || 'Subscription not found' };
    }

    const nextStatus = !currentStatus;
    const data: any = { 
        updated_at: new Date().toISOString()
    };

    // If marking as paid, increment the expiry date
    if (nextStatus === true) {
        const currentExpiry = new Date(sub.expiry_date);
        const billingCycle = sub.billing_cycle || 'yearly';

        if (billingCycle === 'yearly') {
            currentExpiry.setFullYear(currentExpiry.getFullYear() + 1);
        } else if (billingCycle === 'monthly') {
            currentExpiry.setMonth(currentExpiry.getMonth() + 1);
        }

        data.expiry_date = currentExpiry.toISOString().split('T')[0];
        // We set renewal_paid to false because it's now a NEW cycle
        data.renewal_paid = false;
    } else {
        // If unmarking (rare case), just set status
        data.renewal_paid = false;
    }

    const { error } = await supabase
        .from('domain_hosting')
        .update(data)
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/subscriptions/expiry')
    revalidatePath('/admin/subscriptions')
    return { success: true }
}
