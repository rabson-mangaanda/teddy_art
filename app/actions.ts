'use server'

import { supabase } from '@/lib/supabase'

// ── Purchase Request ─────────────────────────────────────────
type PurchaseState = {
  success: boolean
  error?: string
} | null

export async function submitPurchaseRequest(
  _prev: PurchaseState,
  formData: FormData
): Promise<PurchaseState> {
  const artwork_id    = formData.get('artwork_id')    as string
  const customer_name = formData.get('customer_name') as string
  const email         = formData.get('email')         as string
  const phone         = formData.get('phone')         as string | null
  const message       = formData.get('message')       as string | null

  // Basic validation
  if (!customer_name?.trim()) return { success: false, error: 'Your name is required.' }
  if (!email?.trim())         return { success: false, error: 'Your email is required.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, error: 'Please enter a valid email address.' }
  if (!artwork_id)            return { success: false, error: 'Invalid artwork reference.' }

  const { error } = await supabase.from('purchase_requests').insert({
    artwork_id,
    customer_name: customer_name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    message: message?.trim() || null,
  })

  if (error) {
    console.error('Purchase request error:', error)
    return { success: false, error: 'Something went wrong. Please try again or contact us on WhatsApp.' }
  }

  return { success: true }
}

// ── Commission Request ───────────────────────────────────────
type CommissionState = {
  success: boolean
  error?: string
} | null

export async function submitCommissionRequest(
  _prev: CommissionState,
  formData: FormData
): Promise<CommissionState> {
  const customer_name = formData.get('customer_name') as string
  const email         = formData.get('email')         as string
  const phone         = formData.get('phone')         as string | null
  const budget_range  = formData.get('budget_range')  as string | null
  const size          = formData.get('size')          as string | null
  const subject       = formData.get('subject')       as string | null
  const deadline      = formData.get('deadline')      as string | null
  const message       = formData.get('message')       as string | null

  if (!customer_name?.trim()) return { success: false, error: 'Your name is required.' }
  if (!email?.trim())         return { success: false, error: 'Your email is required.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { success: false, error: 'Please enter a valid email address.' }

  const { error } = await supabase.from('commission_requests').insert({
    customer_name: customer_name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    budget_range: budget_range || null,
    size: size?.trim() || null,
    subject: subject?.trim() || null,
    deadline: deadline || null,
    message: message?.trim() || null,
  })

  if (error) {
    console.error('Commission request error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }

  return { success: true }
}
