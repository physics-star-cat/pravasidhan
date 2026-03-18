import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllContent } from "@/lib/content";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "News from Home — PravasiDhan",
  "Daily news digest for NRIs — headlines, weather, markets, and sports from India.",
  "/news/"
);

export default function NewsListing() {
  const digests = getAllContent("news");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "News from Home", href: "/news/" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
          News from Home
        </h1>
        <p className="text-lg text-text-muted leading-relaxed">
          Your daily digest — headlines, weather, markets, and sports from India.
          Short, pithy, skimmable.
        </p>
        <div className="flex gap-4 mt-4 text-sm">
          <Link href="/guides/" className="text-gold-dark hover:text-gold font-medium">
            Evergreen Guides →
          </Link>
          <Link href="/blog/" className="text-gold-dark hover:text-gold font-medium">
            Blog →
          </Link>
        </div>
      </header>

      {digests.length > 0 ? (
        <div className="space-y-4">
          {digests.map((digest) => (
            <Link
              key={digest.slug}
              href={digest.href ?? `/news/${digest.slug}/`}
              className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-gold/50 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-navy">
                  {digest.title}
                </h2>
                <time dateTime={digest.publishedAt} className="text-xs text-text-muted shrink-0 ml-4">
                  {new Date(digest.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-text-muted text-lg">
            News from Home digests are coming soon. Check back daily.
          </p>
        </div>
      )}
    </div>
  );
}
