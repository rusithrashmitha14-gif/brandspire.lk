'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createClientAction(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    address: formData.get('address') as string,
  }

  const { error } = await supabase.from('clients').insert([data])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/clients')
  redirect('/admin/clients')
}

export async function updateClientAction(id: string, prevState: any, formData: FormData) {
  const supabase = await createClient()

  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    address: formData.get('address') as string,
  }

  const { error } = await supabase.from('clients').update(data).eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/clients')
  redirect('/admin/clients')
}

export async function deleteClientAction(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('clients').delete().eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/clients')
  redirect('/admin/clients')
}
