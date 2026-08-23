// ============================================================
// Database types — mirrors the Supabase schema exactly
// ============================================================

export type ArtworkStatus = 'available' | 'reserved' | 'sold'

export type Artwork = {
  id: string
  title: string
  description: string | null
  price: number
  currency: string
  medium: string | null
  dimensions: string | null
  category: string | null
  status: ArtworkStatus
  image_urls: string[]
  featured: boolean
  created_at: string
}

export type PurchaseRequestStatus = 'pending' | 'contacted' | 'confirmed' | 'declined'

export type PurchaseRequest = {
  id: string
  artwork_id: string
  customer_name: string
  email: string
  phone: string | null
  message: string | null
  status: PurchaseRequestStatus
  created_at: string
}

export type CommissionRequestStatus = 'pending' | 'contacted' | 'confirmed' | 'declined'

export type CommissionRequest = {
  id: string
  customer_name: string
  email: string
  phone: string | null
  budget_range: string | null
  size: string | null
  subject: string | null
  deadline: string | null
  message: string | null
  status: CommissionRequestStatus
  created_at: string
}

export type Sale = {
  id: string
  artwork_id: string
  request_id: string | null
  buyer_name: string
  sale_price: number
  sale_date: string
  payment_method: string | null
  notes: string | null
}

export type Profile = {
  id: string
  role: 'admin'
}

// Convenience type for artwork cards on the storefront
export type ArtworkCard = Pick<
  Artwork,
  'id' | 'title' | 'price' | 'currency' | 'status' | 'image_urls' | 'featured'
>
