'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateInvoiceSettingsAction(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const bankDetails = {
    bank_name: formData.get('bank_name') as string,
    account_name: formData.get('account_name') as string,
    account_number: formData.get('account_number') as string,
    branch: formData.get('branch') as string,
    swift_code: formData.get('swift_code') as string,
  }

  const contactDetails = {
    website: formData.get('website') as string,
    email: formData.get('email') as string,
    phones: formData.get('phones') as string,
  }

  const { error: bankError } = await supabase
    .from('settings')
    .upsert({ key: 'bank_details', value: bankDetails })

  const { error: contactError } = await supabase
    .from('settings')
    .upsert({ key: 'contact_details', value: contactDetails })

  if (bankError || contactError) {
    return { error: (bankError?.message || contactError?.message) }
  }

  revalidatePath('/admin/invoices')
  revalidatePath('/admin/invoices/preview/[id]', 'page')
  return { success: true }
}
