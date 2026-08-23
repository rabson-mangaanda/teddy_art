import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import PurchaseRequestForm from './PurchaseRequestForm'
import { supabase } from '@/lib/supabase'
import type { Artwork } from '@/lib/types'

// ── Metadata ────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const { data } = await supabase
    .from('artworks')
    .select('title, description')
    .eq('id', id)
    .single()

  if (!data) return { title: 'Artwork not found' }
  return {
    title: data.title,
    description: data.description ?? `Original artwork — ${data.title}`,
  }
}

// ── Page ─────────────────────────────────────────────────────
export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const art = data as Artwork

  const STATUS_LABEL: Record<string, string> = {
    available: 'Available',
    reserved:  'Reserved',
    sold:      'Sold',
  }
  const STATUS_CLASS: Record<string, string> = {
    available: 'badge-available',
    reserved:  'badge-reserved',
    sold:      'badge-sold',
  }

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in "${art.title}". Could you tell me more?`
  )

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* ── Breadcrumb ─────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 pt-28 md:pt-36 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-charcoal-muted">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-charcoal transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-charcoal font-medium truncate max-w-48">{art.title}</span>
          </nav>
        </div>

        {/* ── Detail layout ──────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* ── Images ─────────────────────────── */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-cream aspect-[4/5]">
                {art.image_urls[0] ? (
                  <Image
                    src={art.image_urls[0]}
                    alt={art.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-charcoal-muted">
                    <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Thumbnail strip (if more than 1 image) */}
              {art.image_urls.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {art.image_urls.map((url, i) => (
                    <div
                      key={i}
                      className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden shadow-sm border-2 border-cream-deeper"
                    >
                      <Image
                        src={url}
                        alt={`${art.title} — view ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Info + Form ─────────────────────── */}
            <div className="space-y-6 lg:sticky lg:top-28">
              {/* Status */}
              <span className={`inline-block text-sm font-semibold px-4 py-1.5 rounded-full ${STATUS_CLASS[art.status]}`}>
                {STATUS_LABEL[art.status]}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal leading-tight">
                {art.title}
              </h1>

              {/* Price */}
              <p className="text-3xl font-bold text-charcoal">
                {art.currency} {Number(art.price).toLocaleString()}
              </p>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2">
                {art.medium && (
                  <span className="px-3 py-1.5 bg-cream-dark text-charcoal-light rounded-full text-sm">
                    {art.medium}
                  </span>
                )}
                {art.dimensions && (
                  <span className="px-3 py-1.5 bg-cream-dark text-charcoal-light rounded-full text-sm">
                    {art.dimensions}
                  </span>
                )}
                {art.category && (
                  <span className="px-3 py-1.5 bg-purple-100 text-purple-500 rounded-full text-sm font-medium">
                    {art.category}
                  </span>
                )}
              </div>

              {/* Description */}
              {art.description && (
                <p className="text-charcoal-muted leading-relaxed text-lg">{art.description}</p>
              )}

              {/* Divider */}
              <hr className="border-cream-deeper" />

              {/* Purchase form / WhatsApp */}
              <PurchaseRequestForm
                artworkId={art.id}
                artworkTitle={art.title}
                status={art.status}
              />

              {/* Trust signals */}
              <div className="flex flex-wrap gap-6 pt-2 text-sm text-charcoal-muted">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                  <span>Original artwork</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                  <span>Ships worldwide</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Reply within 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Back to shop ───────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-charcoal-muted hover:text-charcoal transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to shop
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
