import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-cream px-4 py-24">
        <div className="text-center max-w-lg w-full">
          <h1 className="text-9xl font-display font-bold text-purple-200 mb-4">404</h1>
          <h2 className="text-3xl font-display font-bold text-charcoal mb-4">Page Not Found</h2>
          <p className="text-charcoal-muted mb-8 text-lg">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="btn-ripple bg-purple-300 text-charcoal px-8 py-3.5 rounded-xl font-semibold hover:bg-purple-400 transition-all shadow-sm"
            >
              Browse Artworks
            </Link>
            <Link
              href="/"
              className="btn-ripple border-2 border-charcoal text-charcoal px-8 py-3.5 rounded-xl font-semibold hover:bg-charcoal hover:text-white transition-all"
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
