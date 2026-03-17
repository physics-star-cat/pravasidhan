import { SITE_NAME } from "@/lib/constants";

interface ComingSoonProps {
  country: string;
  flag: string;
}

export default function ComingSoon({ country, flag }: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="text-6xl mb-6">{flag}</div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
          {country} Guides Coming Soon
        </h1>
        <p className="text-text-muted text-lg leading-relaxed mb-8">
          We are working on comprehensive NRI finance guides for Indians in{" "}
          {country}. In the meantime, check out our Canada guides — much of the
          India-side information applies to all NRIs.
        </p>

        {/* Email Signup Placeholder */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium text-navy mb-4">
            Get notified when {country} guides launch
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              disabled
            />
            <button
              className="px-5 py-2.5 bg-gold hover:bg-gold-dark text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
              disabled
            >
              Notify Me
            </button>
          </div>
          <p className="text-xs text-text-muted mt-2">
            Email signup coming soon. Bookmark this page to check back.
          </p>
        </div>

        <div className="mt-8">
          <a
            href="/canada/"
            className="inline-flex items-center gap-2 text-gold-dark font-semibold hover:text-gold transition-colors"
          >
            Explore Canada Guides
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
