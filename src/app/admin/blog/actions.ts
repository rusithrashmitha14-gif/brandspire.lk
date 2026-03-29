'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createBlogPost(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const imageFile = formData.get('featured_image') as File
  let imageUrl = ''

  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('brandspire')
      .upload(`blog/${fileName}`, imageFile)

    if (uploadError) {
      return { error: `Upload failed: ${uploadError.message}` }
    }

    const { data: { publicUrl } } = supabase.storage
      .from('brandspire')
      .getPublicUrl(uploadData.path)
    
    imageUrl = publicUrl
  }

  const data = {
    title: formData.get('title') as string,
    slug: formData.get('title')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') as string,
    content: formData.get('content') as string,
    meta_description: formData.get('meta_description') as string,
    featured_image: imageUrl,
  }

  const { error } = await supabase.from('blog_posts').insert([data])

  if (error) {
     return { error: error.message }
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  revalidatePath('/')
  redirect('/admin/blog')
}

export async function updateBlogPost(id: string, prevState: any, formData: FormData) {
    const supabase = await createClient()

    const imageFile = formData.get('featured_image') as File
    let imageUrl = formData.get('current_image_url') as string

    if (imageFile && imageFile.size > 0) {
        const fileName = `${Date.now()}-${imageFile.name}`
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('brandspire')
            .upload(`blog/${fileName}`, imageFile)

        if (uploadError) {
            return { error: `Upload failed: ${uploadError.message}` }
        }

        const { data: { publicUrl } } = supabase.storage
            .from('brandspire')
            .getPublicUrl(uploadData.path)
        
        imageUrl = publicUrl
    }

    const data = {
        title: formData.get('title') as string,
        slug: formData.get('title')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') as string,
        content: formData.get('content') as string,
        meta_description: formData.get('meta_description') as string,
        featured_image: imageUrl,
    }

    const { error } = await supabase.from('blog_posts').update(data).eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/blog')
    revalidatePath(`/blog/${data.slug}`)
    revalidatePath('/blog')
    revalidatePath('/')
    redirect('/admin/blog')
}

export async function deleteBlogPost(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    redirect('/admin/blog')
}
