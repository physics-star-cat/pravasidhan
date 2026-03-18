import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getContentByTopic } from "@/lib/content";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "NRI Tax Guides — Filing, DTAA, TDS & More",
  "Complete guides to NRI tax filing, DTAA benefits, TDS refunds, and cross-border tax planning between India and your country of residence.",
  "/tax/"
);

export default function TaxHub() {
  const guides = getContentByTopic("guides", "tax");
  const posts = getContentByTopic("blog", "tax");
  const allContent = [...guides, ...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Tax", href: "/tax/" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
          NRI Tax Guides
        </h1>
        <p className="text-lg text-text-muted max-w-3xl leading-relaxed">
          Navigate the complexities of NRI taxation. From ITR filing and DTAA
          benefits to TDS refund claims and capital gains tax on Indian assets.
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
            NRI tax guides are being written and will appear here soon.
          </p>
          <p className="text-sm text-text-muted">
            We are preparing comprehensive guides on NRI tax filing and
            planning.
          </p>
        </div>
      )}
    </div>
  );
}
