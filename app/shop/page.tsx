import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '@/lib/supabase'
import type { Artwork, ArtworkStatus } from '@/lib/types'

export const metadata: Metadata = { title: 'Shop' }

const STATUS_FILTERS: { label: string; value: ArtworkStatus | 'all' }[] = [
  { label: 'All Pieces', value: 'all' },
  { label: 'Available',  value: 'available' },
  { label: 'Reserved',   value: 'reserved' },
  { label: 'Sold',       value: 'sold' },
]

const STATUS_BADGE: Record<ArtworkStatus, string> = {
  available: 'badge-available',
  reserved:  'badge-reserved',
  sold:      'badge-sold',
}

async function getArtworks(status?: string) {
  let query = supabase
    .from('artworks')
    .select('*')
    .order('created_at', { ascending: false })

  if (status && status !== 'all' && ['available', 'reserved', 'sold'].includes(status)) {
    query = query.eq('status', status)
  }

  const { data, error } = await query
  if (error) return []
  return data as Artwork[]
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const artworks = await getArtworks(status)
  const activeFilter = STATUS_FILTERS.find(f => f.value === (status || 'all')) ?? STATUS_FILTERS[0]

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* ── Page header ─────────────────────────────────── */}
        <section className="hero-gradient pt-28 md:pt-36 pb-14 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
            Original Artworks for Sale
          </h1>
          <p className="text-lg text-charcoal-muted max-w-xl mx-auto">
            Each piece is one-of-a-kind. Request to purchase directly — we&apos;ll be in touch within 24 hours.
          </p>
        </section>

        <div className="max-w-7xl mx-auto px-4 mt-10">
          {/* ── Status filter tabs ──────────────────────── */}
          <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter artworks by status">
            {STATUS_FILTERS.map(({ label, value }) => (
              <Link
                key={value}
                href={value === 'all' ? '/shop' : `/shop?status=${value}`}
                role="tab"
                aria-selected={activeFilter.value === value}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeFilter.value === value
                    ? 'bg-charcoal text-white shadow-sm'
                    : 'bg-white text-charcoal-light border border-cream-deeper hover:border-charcoal-muted'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Grid ────────────────────────────────────── */}
          {artworks.length === 0 ? (
            <EmptyState status={status} />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {artworks.map((art) => (
                <Link
                  key={art.id}
                  href={`/shop/${art.id}`}
                  className="art-card bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-deeper group"
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden bg-cream">
                    {art.image_urls[0] ? (
                      <Image
                        src={art.image_urls[0]}
                        alt={art.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-charcoal-muted">
                        <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {/* Status badge */}
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${STATUS_BADGE[art.status]}`}>
                      {art.status.charAt(0).toUpperCase() + art.status.slice(1)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h2 className="font-display font-bold text-charcoal text-lg mb-1 group-hover:text-purple-500 transition-colors">
                      {art.title}
                    </h2>
                    {art.medium && (
                      <p className="text-charcoal-muted text-xs mb-3">{art.medium}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-charcoal">
                        {art.currency} {Number(art.price).toLocaleString()}
                      </span>
                      <span className="text-xs text-purple-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

function EmptyState({ status }: { status?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 bg-cream-dark rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-charcoal-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 className="text-2xl font-display font-bold text-charcoal mb-3">
        {status && status !== 'all' ? `No ${status} pieces` : 'Shop coming soon'}
      </h2>
      <p className="text-charcoal-muted mb-8 max-w-sm">
        {status && status !== 'all'
          ? `No artworks with "${status}" status right now. Try browsing all pieces.`
          : 'New artworks are being added. In the meantime, request a custom commission.'}
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        {status && status !== 'all' && (
          <Link href="/shop" className="btn-ripple bg-charcoal text-white px-6 py-3 rounded-xl font-semibold">
            View All Pieces
          </Link>
        )}
        <Link href="/contact" className="btn-ripple bg-purple-300 text-charcoal px-6 py-3 rounded-xl font-semibold">
          Request a Commission
        </Link>
      </div>
    </div>
  )
}
