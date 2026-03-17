import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getArticlesByCountry } from "@/lib/articles";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "NRI Finance Guides for Canada",
  "Comprehensive guides on taxes, remittances, investments, property, and banking for Indians living in Canada.",
  "/canada/"
);

export default function CanadaHub() {
  const articles = getArticlesByCountry("canada");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Canada", href: "/canada/" }]} />

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">&#x1F1E8;&#x1F1E6;</span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
            Canada NRI Finance Guides
          </h1>
        </div>
        <p className="text-lg text-text-muted max-w-3xl leading-relaxed">
          Everything you need to know about managing your Indian finances as a
          Canadian NRI. From sending money home to filing taxes, investing, and
          buying property in India.
        </p>
      </header>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-text-muted text-lg mb-4">
            Articles are being written and will be published here soon.
          </p>
          <p className="text-sm text-text-muted">
            Check back shortly for comprehensive guides on NRI finance for
            Canadians.
          </p>
        </div>
      )}
    </div>
  );
}
