import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { supabase } from '@/lib/supabase'
import type { ArtworkCard } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Home',
}

// ============================================================
// Static fallback artworks (from Phase 0 audit — original site)
// Used when no artworks exist yet in Supabase
// ============================================================
const STATIC_ARTWORKS = [
  {
    id: 's1',
    title: 'Essence of Heritage',
    image: '/images/art_1.jpeg',
    desc: 'A vibrant portrait blending traditional Zambian headwraps with contemporary drip techniques.',
  },
  {
    id: 's2',
    title: 'The Golden King',
    image: '/images/art_2.png',
    desc: 'A breathtakingly detailed study of a lion, capturing the raw power and majestic spirit of the wild.',
  },
  {
    id: 's3',
    title: 'Silent Watcher',
    image: '/images/art_3.jpeg',
    desc: 'A stunning depiction of a leopard in its natural habitat, showcasing the fusion of grace and stealth.',
  },
  {
    id: 's4',
    title: 'Soul of the Earth',
    image: '/images/imgi_6_503707270_17951653043988088_8550495450761454133_n.webp',
    desc: 'A colorful exploration of the profound connection between human consciousness and the natural world.',
  },
  {
    id: 's5',
    title: 'Urban Rhythms',
    image: '/images/imgi_7_503491440_2282999415481065_1420846027009664502_n.jpg',
    desc: 'A playful and vibrant piece featuring a gorilla with headphones, bridging nature and modern life.',
  },
  {
    id: 's6',
    title: 'Portrait of Clarity',
    image: '/images/imgi_19_502994347_1012766621045347_4347946975305116768_n.jpg',
    desc: 'A detailed and realistic portrait capturing the warmth and intelligent gaze of a contemporary subject.',
  },
]

const GALLERY_IMAGES = [
  '/images/imgi_13_404938762_3568360836750612_1887008418461972666_n.webp',
  '/images/imgi_14_497708204_1389339539057967_8003441831935422710_n.jpg',
  '/images/imgi_16_370893617_844235444074204_1986366304308298869_n.webp',
  '/images/imgi_17_368563575_231595023199897_2176719553945154078_n.webp',
  '/images/imgi_18_367974136_944994879936853_2212797598883280501_n.webp',
  '/images/imgi_2_541585573_784292327300820_5774064417838363883_n.jpg',
  '/images/imgi_5_511423417_1273254824200708_6020192274025453734_n.jpg',
  '/images/imgi_11_417723206_279096861856334_6513708195784109389_n.webp',
]

const SERVICES = [
  {
    title: 'Custom Commissions',
    desc: 'Personalized artworks tailored to your vision, created with care and precision.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Corporate Art',
    desc: 'Distinctive pieces for offices and institutions that inspire and elevate your space.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Art Exhibitions',
    desc: 'Curated showcases and gallery events celebrating Zambian artistic heritage.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Artist Collaboration',
    desc: 'Supporting local Zambian artists and communities through meaningful partnerships.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

// ============================================================
// Featured artworks — fetched from Supabase, fallback to static
// ============================================================
async function FeaturedArtworkGrid() {
  const { data } = await supabase
    .from('artworks')
    .select('id, title, price, currency, status, image_urls, featured')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  const hasLiveData = data && data.length > 0

  if (hasLiveData) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {(data as ArtworkCard[]).map((art) => (
          <Link
            key={art.id}
            href={`/shop/${art.id}`}
            className="art-card bg-white rounded-2xl overflow-hidden shadow-md group"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={art.image_urls[0]}
                alt={art.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span
                className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                  art.status === 'available'
                    ? 'badge-available'
                    : art.status === 'reserved'
                    ? 'badge-reserved'
                    : 'badge-sold'
                }`}
              >
                {art.status.charAt(0).toUpperCase() + art.status.slice(1)}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-display font-bold text-charcoal mb-1">{art.title}</h3>
              <p className="text-purple-500 font-semibold">
                {art.currency} {art.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  // Static fallback while shop is being stocked
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {STATIC_ARTWORKS.map((art) => (
        <Link
          key={art.id}
          href="/shop"
          className="art-card bg-white rounded-2xl overflow-hidden shadow-md group"
        >
          <div className="relative h-64 overflow-hidden">
            <Image
              src={art.image}
              alt={art.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-display font-bold text-charcoal mb-2">{art.title}</h3>
            <p className="text-charcoal-muted text-sm leading-relaxed">{art.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

// ============================================================
// Home page
// ============================================================
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* ── HERO ────────────────────────────────────────────── */}
        <section
          id="home"
          className="hero-gradient min-h-screen flex items-center md:pt-24 pb-16 px-4"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-7 fade-in-up">
                <span className="inline-block text-sm font-semibold tracking-widest text-purple-400 uppercase">
                  Livingstone, Zambia
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-charcoal leading-tight">
                  Celebrating Heritage Through Art
                </h1>
                <p className="text-xl text-charcoal-muted leading-relaxed max-w-lg">
                  Contemporary Zambian artistry that inspires communities and preserves culture — one brushstroke at a time.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/shop"
                    id="hero-view-shop"
                    className="btn-ripple bg-purple-300 text-charcoal px-8 py-4 rounded-xl hover:bg-purple-400 transition-all font-semibold shadow-lg text-base"
                  >
                    View Pieces for Sale
                  </Link>
                  <Link
                    href="/contact"
                    id="hero-contact"
                    className="btn-ripple border-2 border-charcoal text-charcoal px-8 py-4 rounded-xl hover:bg-charcoal hover:text-white transition-all font-semibold text-base"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>

              <div className="float fade-in-up-delay">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://i.imgur.com/I7jSXjr.jpg"
                    alt="Teddy Mzumara Arts — featured artwork"
                    width={640}
                    height={720}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────────── */}
        <section id="about" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-5">
                About Teddy Mzumara Arts
              </h2>
              <p className="text-lg text-charcoal-muted max-w-2xl mx-auto">
                A creative enterprise dedicated to producing, showcasing, and selling unique artworks and cultural crafts.
              </p>
            </div>

            {/* Story */}
            <div className="grid md:grid-cols-2 gap-14 items-center mb-20">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <Image
                  src="https://i.imgur.com/RhVEJ6O.jpg"
                  alt="Teddy Mzumara in the studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl font-display font-bold text-charcoal">Our Story</h3>
                <p className="text-charcoal-muted leading-relaxed text-lg">
                  Founded by Teddy Mzumara, our creative enterprise embodies a passion for artistic expression, innovation, and cultural preservation. Based in the vibrant city of Livingstone, Zambia, we are committed to inspiring communities through art while creating sustainable opportunities for local artists.
                </p>
                <p className="text-charcoal-muted leading-relaxed">
                  Every piece we create tells a story — stories of heritage, tradition, and the contemporary African experience. We bridge the gap between traditional craftsmanship and modern artistic innovation, celebrating the rich cultural tapestry of Zambia and beyond.
                </p>
                <Link
                  href="/shop"
                  className="btn-ripple inline-block bg-purple-300 text-charcoal px-7 py-3.5 rounded-xl hover:bg-purple-400 transition-all font-semibold shadow-md"
                >
                  Explore Our Work
                </Link>
              </div>
            </div>

            {/* Vision / Mission / Values */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Our Vision',
                  desc: 'To become a leading hub for contemporary art in Zambia and beyond, fostering creativity and cultural pride.',
                  icon: '👁️',
                },
                {
                  title: 'Our Mission',
                  desc: 'To deliver high-quality, authentic artworks that celebrate heritage, empower artists, and enrich society through creativity.',
                  icon: '🎯',
                },
                {
                  title: 'Core Values',
                  desc: 'Creativity, Integrity, Community, and Excellence guide everything we create and every relationship we build.',
                  icon: '✨',
                },
              ].map(({ title, desc, icon }) => (
                <div
                  key={title}
                  className="text-center p-10 bg-cream rounded-2xl hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-5">{icon}</div>
                  <h3 className="text-xl font-display font-bold text-charcoal mb-3">{title}</h3>
                  <p className="text-charcoal-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ────────────────────────────────────────── */}
        <section id="services" className="py-24 px-4 bg-cream">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-5">
                Services We Offer
              </h2>
              <p className="text-lg text-charcoal-muted max-w-2xl mx-auto">
                Comprehensive art solutions for collectors, corporations, and cultural institutions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map(({ title, desc, icon }) => (
                <div
                  key={title}
                  className="p-8 bg-white rounded-2xl text-center hover:shadow-xl transition-all group"
                >
                  <div className="w-16 h-16 bg-purple-200 rounded-full mx-auto mb-6 flex items-center justify-center text-purple-500 group-hover:bg-purple-300 transition-colors">
                    {icon}
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-3">{title}</h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED ARTWORKS ───────────────────────────────── */}
        <section id="portfolio" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-5">
                Featured Artworks
              </h2>
              <p className="text-lg text-charcoal-muted max-w-2xl mx-auto">
                A collection of contemporary pieces celebrating Zambian heritage — each available to purchase or commission.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-cream rounded-2xl h-80 animate-pulse" />
                  ))}
                </div>
              }
            >
              <FeaturedArtworkGrid />
            </Suspense>

            <div className="text-center mt-12">
              <Link
                href="/shop"
                id="view-all-shop"
                className="btn-ripple inline-block bg-charcoal text-white px-10 py-4 rounded-xl hover:bg-charcoal-light transition-all font-semibold shadow-lg"
              >
                View All Pieces for Sale →
              </Link>
            </div>
          </div>
        </section>

        {/* ── GALLERY SHOWCASE ────────────────────────────────── */}
        <section className="py-24 px-4 bg-cream">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-5">
                Recent Work
              </h2>
              <p className="text-lg text-charcoal-muted">A glimpse into the studio</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY_IMAGES.map((src, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-shadow aspect-square group"
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-purple-200 rounded-3xl p-12 md:p-16 shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-charcoal mb-6">
                Ready to Bring Your Vision to Life?
              </h2>
              <p className="text-lg text-charcoal-light mb-10 max-w-2xl mx-auto leading-relaxed">
                Whether you&apos;re looking for a custom commission, corporate art, or simply want to explore our collection — we&apos;re here to help you find the perfect piece.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  id="cta-start-project"
                  className="btn-ripple bg-charcoal text-white px-10 py-4 rounded-xl hover:bg-charcoal-light transition-all font-semibold shadow-lg"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/shop"
                  id="cta-browse"
                  className="btn-ripple border-2 border-charcoal text-charcoal px-10 py-4 rounded-xl hover:bg-charcoal hover:text-white transition-all font-semibold"
                >
                  Browse the Shop
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-8 text-charcoal-light">
                {['Custom Designs', 'Authentic Craftsmanship', 'Cultural Heritage'].map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
