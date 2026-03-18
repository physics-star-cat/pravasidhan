import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllSlugs, getContentBySlug, getRelatedGuides } from "@/lib/content";
import { generateArticleMetadata, generateArticleJsonLd } from "@/lib/seo";
import ArticleLayout from "@/components/ArticleLayout";
import AffiliateCTA from "@/components/AffiliateCTA";
import AffiliateLink from "@/components/AffiliateLink";
import Disclaimer from "@/components/Disclaimer";

const mdxComponents = {
  AffiliateCTA,
  AffiliateLink,
  Disclaimer,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);
  if (!post) return {};
  return generateArticleMetadata(post);
}

function extractHeadings(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);

  const { content: mdxContent } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  const relatedGuides = getRelatedGuides(post.relatedGuides ?? []);

  const jsonLd = generateArticleJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <ArticleLayout
        article={post}
        headings={headings}
        relatedArticles={relatedGuides}
      >
        {mdxContent}
      </ArticleLayout>
    </>
  );
}
