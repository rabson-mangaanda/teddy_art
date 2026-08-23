'use client'

import { useActionState } from 'react'
import { submitPurchaseRequest } from '@/app/actions'

type Props = {
  artworkId: string
  artworkTitle: string
  status: 'available' | 'reserved' | 'sold'
}

export default function PurchaseRequestForm({ artworkId, artworkTitle, status }: Props) {
  const [state, action, pending] = useActionState(submitPurchaseRequest, null)

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in "${artworkTitle}". Could you tell me more?`
  )
  const whatsappUrl = `https://wa.me/260973089341?text=${whatsappMsg}`

  if (state?.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-3">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-display font-bold text-charcoal">Request sent!</h3>
        <p className="text-charcoal-muted">
          Thank you for your interest in <strong>{artworkTitle}</strong>. We&apos;ll reach out within 24 hours.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ripple inline-flex items-center gap-2 mt-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all"
        >
          <WhatsAppIcon /> Follow up on WhatsApp
        </a>
      </div>
    )
  }

  if (status === 'sold') {
    return (
      <div className="space-y-5">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-charcoal-muted font-medium mb-1">This piece has been sold</p>
          <p className="text-sm text-charcoal-muted">
            Contact us to commission a similar work or explore our available pieces.
          </p>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ripple w-full flex items-center justify-center gap-2 bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-md"
        >
          <WhatsAppIcon /> Ask About Similar Works
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* WhatsApp — always prominent */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp-enquiry"
        className="btn-ripple w-full flex items-center justify-center gap-2 bg-green-500 text-white py-4 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-md text-base"
      >
        <WhatsAppIcon /> Ask on WhatsApp
      </a>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-cream-deeper" />
        <span className="text-sm text-charcoal-muted">or fill in a request</span>
        <div className="flex-1 h-px bg-cream-deeper" />
      </div>

      {/* Purchase form */}
      <form action={action} className="space-y-4" noValidate>
        <input type="hidden" name="artwork_id" value={artworkId} />

        <div>
          <label htmlFor="customer_name" className="block text-sm font-semibold text-charcoal mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id="customer_name"
            name="customer_name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-1.5">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+260 ..."
            className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Any questions or details about this piece..."
            className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all resize-none"
          />
        </div>

        {state?.error && (
          <p className="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-xl border border-red-100">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          id="submit-purchase-request"
          disabled={pending}
          className="btn-ripple w-full bg-purple-300 text-charcoal py-4 rounded-xl font-semibold hover:bg-purple-400 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {pending ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending…
            </>
          ) : (
            'Send Purchase Request'
          )}
        </button>
      </form>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.48C18.25 1.23 15.3 0 12.12 0 5.81 0 .65 5.16.65 11.48c0 2.02.53 4.01 1.54 5.76L.65 23.35l6.35-2.04c1.68.91 3.57 1.39 5.52 1.39 6.31 0 11.48-5.16 11.48-11.48 0-3.06-1.23-5.94-3.47-8.18zm-8.4 17.62c-1.73 0-3.42-.46-4.9-1.32l-.35-.21-3.64 1.17 1.19-3.56-.23-.36c-.95-1.52-1.45-3.27-1.45-5.05 0-5.25 4.27-9.52 9.52-9.52 2.54 0 4.93 1 6.74 2.81 1.81 1.81 2.81 4.2 2.81 6.74 0 5.25-4.27 9.52-9.52 9.52z" />
    </svg>
  )
}
