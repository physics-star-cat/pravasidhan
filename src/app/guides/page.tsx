import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllContent } from "@/lib/content";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "NRI Finance Guides — PravasiDhan",
  "In-depth guides on taxes, remittances, investments, property, and banking for Non-Resident Indians.",
  "/guides/"
);

export default function GuidesListing() {
  const guides = getAllContent("guides");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Guides", href: "/guides/" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
          NRI Finance Guides
        </h1>
        <p className="text-lg text-text-muted max-w-3xl leading-relaxed">
          In-depth, practical guides on every aspect of managing your finances
          as an Indian living abroad.
        </p>
        <div className="flex gap-4 mt-4 text-sm">
          <Link href="/blog/" className="text-gold-dark hover:text-gold font-medium">
            Latest Blog Posts →
          </Link>
          <Link href="/news/" className="text-gold-dark hover:text-gold font-medium">
            News from Home →
          </Link>
        </div>
      </header>

      {guides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <ArticleCard key={guide.slug} article={guide} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-text-muted text-lg">
            Guides are being written and will be published here soon.
          </p>
        </div>
      )}
    </div>
  );
}
