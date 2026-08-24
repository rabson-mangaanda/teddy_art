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
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}
