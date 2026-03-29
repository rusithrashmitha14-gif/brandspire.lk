'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createInvoiceAction(formData: any) {
  const supabase = await createClient()

  // formData here is a plain object passed from the client component
  const { items, ...invoiceData } = formData

  // 1. Insert Invoice
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert([invoiceData])
    .select()
    .single()

  if (invoiceError) {
    return { error: invoiceError.message }
  }

  // 2. Insert Items
  const itemsWithId = items.map((item: any) => ({
    ...item,
    invoice_id: invoice.id
  }))

  const { error: itemsError } = await supabase
    .from('invoice_items')
    .insert(itemsWithId)

  if (itemsError) {
    // Cleanup invoice if items fail
    await supabase.from('invoices').delete().eq('id', invoice.id)
    return { error: itemsError.message }
  }

  revalidatePath('/admin/invoices')
  return { success: true, id: invoice.id }
}

export async function updateInvoiceAction(id: string, formData: any) {
    const supabase = await createClient()
    const { items, ...invoiceData } = formData

    // 1. Update Invoice
    const { error: invoiceError } = await supabase
        .from('invoices')
        .update(invoiceData)
        .eq('id', id)

    if (invoiceError) {
        return { error: invoiceError.message }
    }

    // 2. Refresh Items (Delete and Re-insert is easiest for dynamic lists)
    await supabase.from('invoice_items').delete().eq('invoice_id', id)
    
    const itemsWithId = items.map((item: any) => ({
        ...item,
        invoice_id: id
    }))

    const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemsWithId)

    if (itemsError) {
        return { error: itemsError.message }
    }

    revalidatePath('/admin/invoices')
    revalidatePath(`/admin/invoices/preview/${id}`)
    return { success: true, id }
}

export async function deleteInvoiceAction(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('invoices').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/invoices')
    redirect('/admin/invoices')
}

export async function getNextInvoiceNumber() {
    const supabase = await createClient()
    const { data } = await supabase
        .from('invoices')
        .select('invoice_number')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    if (!data) return '#WD10'

    // Simple increment logic for #WDXX pattern
    const match = data.invoice_number.match(/#WD(\d+)/)
    if (match) {
        const nextNum = parseInt(match[1]) + 1
        return `#WD${nextNum}`
    }

    return `#WD${Math.floor(Math.random() * 1000)}`
}
