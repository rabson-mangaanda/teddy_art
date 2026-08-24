import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ArtworkDetailLoading() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20 bg-white">
        {/* Breadcrumb skeleton */}
        <div className="max-w-7xl mx-auto px-4 pt-28 md:pt-36 mb-6">
          <div className="h-4 bg-cream rounded w-48 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image skeleton */}
            <div className="space-y-4">
              <div className="relative rounded-3xl bg-cream aspect-[4/5] animate-pulse" />
              <div className="flex gap-3 overflow-x-auto pb-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-20 flex-shrink-0 rounded-xl bg-cream animate-pulse" />
                ))}
              </div>
            </div>

            {/* Info skeleton */}
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="h-7 bg-cream rounded-full w-24 animate-pulse" />
              <div className="h-12 bg-cream rounded-xl w-3/4 animate-pulse" />
              <div className="h-10 bg-cream rounded-xl w-32 animate-pulse" />
              
              <div className="flex gap-2">
                <div className="h-8 bg-cream rounded-full w-20 animate-pulse" />
                <div className="h-8 bg-cream rounded-full w-24 animate-pulse" />
              </div>
              
              <div className="space-y-3">
                <div className="h-4 bg-cream rounded w-full animate-pulse" />
                <div className="h-4 bg-cream rounded w-full animate-pulse" />
                <div className="h-4 bg-cream rounded w-2/3 animate-pulse" />
              </div>
              
              <hr className="border-cream-deeper" />
              
              <div className="h-14 bg-cream rounded-xl w-full animate-pulse" />
              
              <div className="space-y-4">
                <div className="h-12 bg-cream rounded-xl w-full animate-pulse" />
                <div className="h-12 bg-cream rounded-xl w-full animate-pulse" />
                <div className="h-24 bg-cream rounded-xl w-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
