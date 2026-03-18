import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllContent } from "@/lib/content";
import { generateHubMetadata } from "@/lib/seo";

export const metadata: Metadata = generateHubMetadata(
  "NRI Finance Blog — PravasiDhan",
  "Timely analysis and commentary on events affecting Non-Resident Indians — exchange rates, policy changes, travel, and more.",
  "/blog/"
);

export default function BlogListing() {
  const posts = getAllContent("blog");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog/" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4">
          Blog
        </h1>
        <p className="text-lg text-text-muted max-w-3xl leading-relaxed">
          Timely analysis on exchange rates, policy changes, and events
          affecting NRIs.
        </p>
        <div className="flex gap-4 mt-4 text-sm">
          <Link href="/guides/" className="text-gold-dark hover:text-gold font-medium">
            Evergreen Guides →
          </Link>
          <Link href="/news/" className="text-gold-dark hover:text-gold font-medium">
            News from Home →
          </Link>
        </div>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.slug} article={post} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-text-muted text-lg">
            Blog posts are coming soon. Check back for timely NRI finance analysis.
          </p>
        </div>
      )}
    </div>
  );
}
