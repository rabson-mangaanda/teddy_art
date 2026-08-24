import type { Metadata } from 'next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact & Commissions',
  description: 'Get in touch with Teddy Mzumara Arts for general inquiries, collaborations, or custom artwork commissions.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-24 bg-cream">
        {/* ── Header ────────────────────────────────────────────── */}
        <section className="bg-charcoal text-white pt-36 pb-24 px-4 text-center rounded-b-3xl">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="inline-block text-sm font-semibold tracking-widest text-purple-400 uppercase">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
              Let&apos;s Create Something Beautiful
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Whether you want to discuss a custom commission, explore corporate art options, or just say hello — we&apos;d love to hear from you.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 -mt-10 md:-mt-16 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* ── Contact Info Cards ────────────────────────────── */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-md border border-cream-deeper">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-500 mb-5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-charcoal mb-2">Phone & WhatsApp</h2>
                <p className="text-charcoal-muted mb-4 text-sm">Available during business hours for quick inquiries.</p>
                <a href="https://wa.me/260973089341" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-purple-500 hover:text-purple-600 transition-colors">
                  +260 973 089 341
                </a>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-md border border-cream-deeper">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-500 mb-5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-charcoal mb-2">Email</h2>
                <p className="text-charcoal-muted mb-4 text-sm">For detailed commission specs or corporate requests.</p>
                <a href="mailto:teddymara4@gmail.com" className="text-lg font-semibold text-purple-500 hover:text-purple-600 transition-colors">
                  teddymara4@gmail.com
                </a>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-md border border-cream-deeper">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-500 mb-5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-charcoal mb-2">Location</h2>
                <p className="text-charcoal-muted mb-4 text-sm">MC 52 Maramba<br />Livingstone, Zambia</p>
                <hr className="border-cream-deeper my-4" />
                <div className="space-y-1">
                  <p className="text-sm text-charcoal-muted font-medium flex justify-between">
                    <span>Mon - Fri:</span> <span>9:00 AM - 5:00 PM</span>
                  </p>
                  <p className="text-sm text-charcoal-muted font-medium flex justify-between">
                    <span>Saturday:</span> <span>10:00 AM - 3:00 PM</span>
                  </p>
                </div>
              </div>
            </div>

            {/* ── Form Section ──────────────────────────────────── */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
