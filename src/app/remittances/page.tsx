import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getContentByTopic } from "@/lib/content";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "NRI Remittance Guides — Send Money to India",
  "Compare the cheapest and fastest ways to send money to India as an NRI. Wise, bank wires, and other transfer services compared.",
  "/remittances/"
);

export default function RemittancesHub() {
  const guides = getContentByTopic("guides", "remittances");
  const posts = getContentByTopic("blog", "remittances");
  const allContent = [...guides, ...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Remittances", href: "/remittances/" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
          Remittance Guides
        </h1>
        <p className="text-lg text-text-muted max-w-3xl leading-relaxed">
          Find the cheapest and fastest ways to send money to India. We compare
          fees, exchange rates, and transfer times across all major services.
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
            Remittance guides are being written and will appear here soon.
          </p>
          <p className="text-sm text-text-muted">
            We are preparing detailed comparisons of money transfer services for
            NRIs.
          </p>
        </div>
      )}
    </div>
  );
}
