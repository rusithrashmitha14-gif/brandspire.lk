'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createTeamMember(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const photoFile = formData.get('photo') as File
  let photoUrl = ''

  if (photoFile && photoFile.size > 0) {
    const fileName = `${Date.now()}-${photoFile.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('brandspire')
      .upload(`team/${fileName}`, photoFile)

    if (uploadError) {
      return { error: `Upload failed: ${uploadError.message}` }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('brandspire')
      .getPublicUrl(uploadData.path)
    
    photoUrl = publicUrl
  }

  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    role: formData.get('role') as string,
    is_admin: formData.get('is_admin') === 'on',
    photo: photoUrl,
  }

  const { error } = await supabase.from('team').insert([data])

  if (error) {
     return { error: error.message }
  }

  revalidatePath('/admin/team')
  revalidatePath('/about')
  redirect('/admin/team')
}

export async function updateTeamMember(id: string, prevState: any, formData: FormData) {
    const supabase = await createClient()

    const photoFile = formData.get('photo') as File
    let photoUrl = formData.get('current_photo_url') as string

    if (photoFile && photoFile.size > 0) {
        const fileName = `${Date.now()}-${photoFile.name}`
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('brandspire')
            .upload(`team/${fileName}`, photoFile)

        if (uploadError) {
            return { error: `Upload failed: ${uploadError.message}` }
        }

        const { data: { publicUrl } } = supabase.storage
            .from('brandspire')
            .getPublicUrl(uploadData.path)
        
        photoUrl = publicUrl
    }

    const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        role: formData.get('role') as string,
        is_admin: formData.get('is_admin') === 'on',
        photo: photoUrl,
    }

    const { error } = await supabase.from('team').update(data).eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/team')
    revalidatePath('/about')
    redirect('/admin/team')
}

export async function deleteTeamMember(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('team').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/team')
    revalidatePath('/about')
    redirect('/admin/team')
}
