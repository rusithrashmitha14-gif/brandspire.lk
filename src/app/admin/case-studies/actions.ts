'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createCaseStudy(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const imageFile = formData.get('image') as File
  let imageUrls: string[] = []

  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('brandspire')
      .upload(`case-studies/${fileName}`, imageFile)

    if (uploadError) {
      return { error: `Upload failed: ${uploadError.message}` }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('brandspire')
      .getPublicUrl(uploadData.path)
    
    imageUrls = [publicUrl]
  }

  const data = {
    client_name: formData.get('client_name') as string,
    industry: formData.get('industry') as string,
    website_url: formData.get('website_url') as string,
    problem: formData.get('problem') as string,
    solution: formData.get('solution') as string,
    results: formData.get('results') as string,
    slug: formData.get('client_name')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') as string,
    tech_stack: (formData.get('tech_stack') as string)?.split(',').map(s => s.trim()).filter(Boolean),
    images: imageUrls,
  }

  const { error } = await supabase.from('case_studies').insert([data])

  if (error) {
     return { error: error.message }
  }

  revalidatePath('/admin/case-studies')
  revalidatePath('/case-studies')
  revalidatePath('/')
  redirect('/admin/case-studies')
}

export async function updateCaseStudy(id: string, prevState: any, formData: FormData) {
    const supabase = await createClient()

    const imageFile = formData.get('image') as File
    let imageUrls: string[] = []
    const currentImageUrl = formData.get('current_image_url') as string
    
    if (currentImageUrl) {
        imageUrls = [currentImageUrl]
    }

    if (imageFile && imageFile.size > 0) {
        const fileName = `${Date.now()}-${imageFile.name}`
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('brandspire')
            .upload(`case-studies/${fileName}`, imageFile)

        if (uploadError) {
            return { error: `Upload failed: ${uploadError.message}` }
        }

        const { data: { publicUrl } } = supabase.storage
            .from('brandspire')
            .getPublicUrl(uploadData.path)
        
        imageUrls = [publicUrl]
    }

    const data = {
        client_name: formData.get('client_name') as string,
        industry: formData.get('industry') as string,
        website_url: formData.get('website_url') as string,
        problem: formData.get('problem') as string,
        solution: formData.get('solution') as string,
        results: formData.get('results') as string,
        slug: formData.get('client_name')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') as string,
        tech_stack: (formData.get('tech_stack') as string)?.split(',').map(s => s.trim()).filter(Boolean),
        images: imageUrls,
    }

    const { error } = await supabase.from('case_studies').update(data).eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/case-studies')
    revalidatePath(`/case-studies/${data.slug}`)
    revalidatePath('/case-studies')
    revalidatePath('/')
    redirect('/admin/case-studies')
}

export async function deleteCaseStudy(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('case_studies').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/case-studies')
    revalidatePath('/case-studies')
    redirect('/admin/case-studies')
}
