'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createService(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const iconFile = formData.get('icon') as File
  let iconUrl = ''

  if (iconFile && iconFile.size > 0) {
    const fileName = `${Date.now()}-${iconFile.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('brandspire')
      .upload(`services/${fileName}`, iconFile)

    if (uploadError) {
      return { error: `Upload failed: ${uploadError.message}` }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('brandspire')
      .getPublicUrl(uploadData.path)
    
    iconUrl = publicUrl
  }

  // Process features array
  const featuresRaw = formData.get('features') as string
  const features = featuresRaw ? featuresRaw.split('\n').map(f => f.trim()).filter(f => f.length > 0) : []

  const data = {
    title: formData.get('title') as string,
    slug: formData.get('title')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') as string,
    description: formData.get('description') as string,
    icon: iconUrl,
    features: features
  }

  const { error } = await supabase.from('services').insert([data])

  if (error) {
     return { error: error.message }
  }

  revalidatePath('/admin/services')
  revalidatePath('/')
  redirect('/admin/services')
}

export async function updateService(id: string, prevState: any, formData: FormData) {
    const supabase = await createClient()

    const iconFile = formData.get('icon') as File
    let iconUrl = formData.get('current_icon_url') as string

    if (iconFile && iconFile.size > 0) {
        const fileName = `${Date.now()}-${iconFile.name}`
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('brandspire')
            .upload(`services/${fileName}`, iconFile)

        if (uploadError) {
            return { error: `Upload failed: ${uploadError.message}` }
        }

        const { data: { publicUrl } } = supabase.storage
            .from('brandspire')
            .getPublicUrl(uploadData.path)
        
        iconUrl = publicUrl
    }

    // Process features array
    const featuresRaw = formData.get('features') as string
    const features = featuresRaw ? featuresRaw.split('\n').map(f => f.trim()).filter(f => f.length > 0) : []

    const data = {
        title: formData.get('title') as string,
        slug: formData.get('title')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') as string,
        description: formData.get('description') as string,
        icon: iconUrl,
        features: features
    }

    const { error } = await supabase.from('services').update(data).eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/services')
    revalidatePath('/')
    redirect('/admin/services')
}

export async function deleteService(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('services').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/services')
    redirect('/admin/services')
}
