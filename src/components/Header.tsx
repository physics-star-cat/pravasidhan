"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_NAME, NAV_COUNTRIES, NAV_TOPICS } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);

  return (
    <header className="bg-navy text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-gold transition-colors"
          >
            {SITE_NAME}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_COUNTRIES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-gold transition-colors rounded-md hover:bg-white/5"
              >
                {item.label}
                {item.comingSoon && (
                  <span className="ml-1 text-[10px] text-gold-light opacity-60">
                    soon
                  </span>
                )}
              </Link>
            ))}

            {/* Topics Dropdown */}
            <div className="relative">
              <button
                onClick={() => setTopicsOpen(!topicsOpen)}
                onBlur={() => setTimeout(() => setTopicsOpen(false), 200)}
                className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-gold transition-colors rounded-md hover:bg-white/5 flex items-center gap-1"
              >
                Topics
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${topicsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {topicsOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                  {NAV_TOPICS.map((topic) => (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      className="block px-4 py-2 text-sm text-navy hover:bg-gold-light hover:text-navy-dark transition-colors"
                    >
                      {topic.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about/"
              className="px-3 py-2 text-sm font-medium text-gray-200 hover:text-gold transition-colors rounded-md hover:bg-white/5"
            >
              About
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-200 hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-dark border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            <p className="text-xs font-semibold text-gold uppercase tracking-wider px-3 py-2">
              Countries
            </p>
            {NAV_COUNTRIES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-gray-200 hover:text-gold hover:bg-white/5 rounded-md transition-colors"
              >
                {item.label}
                {item.comingSoon && (
                  <span className="ml-2 text-[10px] text-gold-light opacity-60">
                    Coming Soon
                  </span>
                )}
              </Link>
            ))}

            <p className="text-xs font-semibold text-gold uppercase tracking-wider px-3 pt-4 pb-2">
              Topics
            </p>
            {NAV_TOPICS.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-gray-200 hover:text-gold hover:bg-white/5 rounded-md transition-colors"
              >
                {topic.label}
              </Link>
            ))}

            <div className="border-t border-white/10 pt-3 mt-3">
              <Link
                href="/about/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-gray-200 hover:text-gold hover:bg-white/5 rounded-md transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
