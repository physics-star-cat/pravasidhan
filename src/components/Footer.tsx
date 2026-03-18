import Link from "next/link";
import { SITE_NAME, FOOTER_LINKS, DISCLAIMER_TEXT } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Content Column */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Content
            </h4>
            {FOOTER_LINKS.content.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-400 hover:text-gold transition-colors mb-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-heading text-lg font-bold text-white mb-4">
              {SITE_NAME}
            </h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Your trusted guide to NRI finance. We help Indians abroad navigate
              taxes, remittances, investments, property, and banking in India.
            </p>
            {FOOTER_LINKS.about.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-400 hover:text-gold transition-colors mb-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Topics Column */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Topics
            </h4>
            {FOOTER_LINKS.topics.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-400 hover:text-gold transition-colors mb-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Countries Column */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Countries
            </h4>
            {FOOTER_LINKS.countries.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-400 hover:text-gold transition-colors mb-2"
              >
                {link.label}
                {link.comingSoon && (
                  <span className="ml-1 text-xs opacity-50">
                    (Coming Soon)
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Legal
            </h4>
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-400 hover:text-gold transition-colors mb-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            {DISCLAIMER_TEXT}
          </p>
          <p className="text-xs text-gray-500">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
