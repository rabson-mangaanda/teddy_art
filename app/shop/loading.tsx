import Navbar from '../components/Navbar'

export default function ShopLoading() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20">
        {/* Header skeleton */}
        <section className="hero-gradient pt-28 md:pt-36 pb-14 px-4 text-center">
          <div className="h-12 bg-cream-dark rounded-xl w-80 mx-auto mb-4 animate-pulse" />
          <div className="h-5 bg-cream-dark rounded-lg w-96 mx-auto animate-pulse" />
        </section>

        <div className="max-w-7xl mx-auto px-4 mt-10">
          {/* Filter tabs skeleton */}
          <div className="flex gap-2 mb-10">
            {[80, 96, 80, 64].map((w, i) => (
              <div
                key={i}
                className="h-9 bg-cream-dark rounded-full animate-pulse"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>

          {/* Grid skeleton */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-deeper">
                <div className="h-60 bg-cream animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-cream-dark rounded-lg w-3/4 animate-pulse" />
                  <div className="h-3 bg-cream-dark rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-cream-dark rounded-lg w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
