import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllSlugs, getContentBySlug } from "@/lib/content";
import { generateHubMetadata, generateNewsArticleJsonLd } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("news");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const digest = getContentBySlug("news", slug);
  if (!digest) return {};
  return generateHubMetadata(
    digest.title,
    `Daily news digest for NRIs — ${digest.publishedAt}`,
    `/news/${digest.slug}/`
  );
}

export default async function NewsDigestPage({ params }: PageProps) {
  const { slug } = await params;
  const digest = getContentBySlug("news", slug);

  if (!digest) {
    notFound();
  }

  const { content: mdxContent } = await compileMDX({
    source: digest.content,
    options: {
      parseFrontmatter: false,
    },
  });

  const newsJsonLd = generateNewsArticleJsonLd({
    title: digest.title,
    slug: digest.slug,
    description: `Daily news digest for NRIs — ${digest.publishedAt}`,
    publishedAt: digest.publishedAt,
    updatedAt: digest.updatedAt,
    countries: digest.countries || [],
    topics: digest.topics || [],
    href: `/news/${digest.slug}/`,
  });

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: newsJsonLd }}
      />
      <Breadcrumbs
        items={[
          { label: "News from Home", href: "/news/" },
          { label: digest.title, href: digest.href ?? `/news/${digest.slug}/` },
        ]}
      />

      <header className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-navy mb-2">
          {digest.title}
        </h1>
        <time dateTime={digest.publishedAt} className="text-sm text-text-muted">
          {new Date(digest.publishedAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      <div className="prose">{mdxContent}</div>

      <div className="mt-8 pt-8 border-t border-gray-200 text-center">
        <Link
          href="/news/"
          className="text-gold-dark hover:text-gold font-medium"
        >
          ← All News from Home
        </Link>
      </div>
    </article>
  );
}
