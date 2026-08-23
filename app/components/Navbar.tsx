'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Desktop — floating pill nav */}
      <header className="fixed top-5 inset-x-0 z-50 hidden md:flex justify-center px-4">
        <nav
          className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/85 backdrop-blur-xl shadow-lg shadow-black/8 border border-white/60'
              : 'bg-white/70 backdrop-blur-md shadow-md border border-white/40'
          }`}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-base font-display font-bold text-charcoal hover:text-purple-400 transition-colors px-4 py-2"
          >
            Teddy Mzumara Arts
          </Link>

          {/* Divider */}
          <span className="w-px h-5 bg-cream-deeper" aria-hidden="true" />

          {/* Regular links */}
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                pathname === href
                  ? 'bg-cream-dark text-charcoal'
                  : 'text-charcoal-light hover:bg-cream text-charcoal hover:text-charcoal'
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Shop — primary CTA */}
          <Link
            href="/shop"
            id="nav-shop-cta"
            className={`ml-1 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
              pathname === '/shop' || pathname.startsWith('/shop/')
                ? 'bg-purple-400 text-charcoal shadow-purple-200/60 shadow-md'
                : 'bg-purple-300 text-charcoal hover:bg-purple-400 hover:shadow-purple-200/60 hover:shadow-md'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Shop
          </Link>
        </nav>
      </header>

      {/* Mobile — top bar + drawer */}
      <header className="fixed w-full top-0 z-50 md:hidden">
        <div
          className={`flex justify-between items-center px-4 h-16 transition-all duration-300 ${
            scrolled || open
              ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-cream-deeper'
              : 'bg-transparent'
          }`}
        >
          <Link
            href="/"
            className="text-lg font-display font-bold text-charcoal"
          >
            Teddy Mzumara Arts
          </Link>

          <div className="flex items-center gap-2">
            {/* Shop pill on mobile top bar */}
            <Link
              href="/shop"
              className="flex items-center gap-1.5 px-4 py-2 bg-purple-300 hover:bg-purple-400 text-charcoal rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Shop
            </Link>

            {/* Hamburger */}
            <button
              className="p-2 rounded-full text-charcoal hover:bg-cream-dark transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
            >
              {open ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-cream-deeper ${
            open ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 space-y-1">
            {[{ href: '/', label: 'Home' }, { href: '/contact', label: 'Contact' }].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                  pathname === href
                    ? 'bg-cream-dark text-charcoal'
                    : 'text-charcoal-light hover:bg-cream'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Spacer so page content clears the floating nav */}
      <div className="h-20 md:h-0" aria-hidden="true" />
    </>
  )
}
