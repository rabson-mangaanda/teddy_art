'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-cream px-4 py-24">
        <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl text-center max-w-lg w-full border border-cream-deeper">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-display font-bold text-charcoal mb-4">Something went wrong!</h2>
          <p className="text-charcoal-muted mb-8">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="btn-ripple bg-purple-300 text-charcoal px-6 py-3 rounded-xl font-semibold hover:bg-purple-400 transition-all shadow-sm"
            >
              Try again
            </button>
            <Link
              href="/"
              className="btn-ripple border-2 border-charcoal text-charcoal px-6 py-3 rounded-xl font-semibold hover:bg-charcoal hover:text-white transition-all"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
