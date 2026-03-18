import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getContentByCountry } from "@/lib/content";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "NRI Finance Guides for UK — Coming Soon",
  "Comprehensive guides on taxes, remittances, investments, and banking for Indians living in the United Kingdom. Coming soon.",
  "/uk/"
);

export default function UKHub() {
  const guides = getContentByCountry("guides", "uk");
  const posts = getContentByCountry("blog", "uk");
  const allContent = [...guides, ...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "UK", href: "/uk/" }]} />

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">&#x1F1EC;&#x1F1E7;</span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
            UK NRI Finance Guides
          </h1>
        </div>
        <p className="text-lg text-text-muted max-w-3xl leading-relaxed">
          Everything you need to know about managing your Indian finances as a
          UK-based NRI. Guides on taxes, remittances, investments, and banking
          coming soon.
        </p>
      </header>

      {allContent.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allContent.map((item) => (
            <ArticleCard key={item.slug} article={item} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-text-muted text-lg mb-4">
            UK guides are being written and will be published here soon.
          </p>
          <p className="text-sm text-text-muted">
            Check back shortly for comprehensive guides on NRI finance for
            UK-based Indians.
          </p>
        </div>
      )}
    </div>
  );
}
