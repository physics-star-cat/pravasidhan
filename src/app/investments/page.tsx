import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getArticlesByTopic } from "@/lib/articles";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "NRI Investment Guides — Mutual Funds, FDs & Stocks",
  "Learn how to invest in Indian mutual funds, stocks, NRE fixed deposits, and other instruments as an NRI. Know your options and rules.",
  "/investments/"
);

export default function InvestmentsHub() {
  const articles = getArticlesByTopic("investments");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Investments", href: "/investments/" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
          NRI Investment Guides
        </h1>
        <p className="text-lg text-text-muted max-w-3xl leading-relaxed">
          Grow your wealth in India from abroad. Explore mutual funds, fixed
          deposits, stocks, and other investment options available to NRIs.
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
            NRI investment guides are being written and will appear here soon.
          </p>
          <p className="text-sm text-text-muted">
            We are preparing detailed guides on investing in India as an NRI.
          </p>
        </div>
      )}
    </div>
  );
}
