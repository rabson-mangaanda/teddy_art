'use client'

import { useActionState } from 'react'
import { submitCommissionRequest } from '@/app/actions'

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitCommissionRequest, null)

  const whatsappUrl = `https://wa.me/260973089341`

  if (state?.success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-display font-bold text-charcoal">Message Sent!</h3>
        <p className="text-charcoal-muted text-lg max-w-md mx-auto">
          Thank you for reaching out. We have received your request and will get back to you within 24 hours.
        </p>
        <div className="pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ripple inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-green-600 transition-all shadow-md"
          >
            <WhatsAppIcon /> Or chat with us on WhatsApp
          </a>
        </div>
      </div>
    )
  }

  return (
    <form action={action} className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-cream-deeper space-y-6" noValidate>
      <div>
        <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Send a Message</h2>
        <p className="text-charcoal-muted text-sm">
          Fill out the form below for general inquiries or to request a custom commission.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
            className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-cream/50 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
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
            className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-cream/50 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
          />
        </div>
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
          className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-cream/50 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
        />
      </div>

      <hr className="border-cream-deeper my-2" />

      <div>
        <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-4 text-purple-500">Commission Details (Optional)</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-charcoal mb-1.5">
              Subject / Concept
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="e.g. Portrait, Wildlife, Abstract..."
              className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-cream/50 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
            />
          </div>
          <div>
            <label htmlFor="size" className="block text-sm font-semibold text-charcoal mb-1.5">
              Preferred Size
            </label>
            <input
              id="size"
              name="size"
              type="text"
              placeholder="e.g. A3, 100x100cm..."
              className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-cream/50 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
            />
          </div>
          <div>
            <label htmlFor="budget_range" className="block text-sm font-semibold text-charcoal mb-1.5">
              Budget Range
            </label>
            <input
              id="budget_range"
              name="budget_range"
              type="text"
              placeholder="e.g. $500 - $1000"
              className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-cream/50 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
            />
          </div>
          <div>
            <label htmlFor="deadline" className="block text-sm font-semibold text-charcoal mb-1.5">
              Deadline / Target Date
            </label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-cream/50 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-1.5">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell us about your project, ask a question, or describe what you have in mind..."
          className="w-full px-4 py-3 rounded-xl border border-cream-deeper bg-cream/50 focus:bg-white focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all resize-y"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-200 font-medium">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        id="submit-contact"
        disabled={pending}
        className="btn-ripple w-full bg-charcoal text-white py-4 rounded-xl font-semibold hover:bg-charcoal-light transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg mt-4"
      >
        {pending ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.48C18.25 1.23 15.3 0 12.12 0 5.81 0 .65 5.16.65 11.48c0 2.02.53 4.01 1.54 5.76L.65 23.35l6.35-2.04c1.68.91 3.57 1.39 5.52 1.39 6.31 0 11.48-5.16 11.48-11.48 0-3.06-1.23-5.94-3.47-8.18zm-8.4 17.62c-1.73 0-3.42-.46-4.9-1.32l-.35-.21-3.64 1.17 1.19-3.56-.23-.36c-.95-1.52-1.45-3.27-1.45-5.05 0-5.25 4.27-9.52 9.52-9.52 2.54 0 4.93 1 6.74 2.81 1.81 1.81 2.81 4.2 2.81 6.74 0 5.25-4.27 9.52-9.52 9.52z" />
    </svg>
  )
}
