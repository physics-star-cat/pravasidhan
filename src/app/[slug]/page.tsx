import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllSlugs, getArticleBySlug, getAllArticles } from "@/lib/articles";
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
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return generateArticleMetadata(article);
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

function extractFAQItems(content: string): { question: string; answer: string }[] {
  // Find the "## Frequently Asked Questions" section
  const faqSectionRegex = /^## Frequently Asked Questions\s*$/m;
  const faqMatch = faqSectionRegex.exec(content);
  if (!faqMatch) return [];

  const faqStart = faqMatch.index + faqMatch[0].length;

  // Find the next ## heading (if any) to bound the FAQ section
  const nextH2Regex = /^## (?!#)/m;
  const remainingContent = content.slice(faqStart);
  const nextH2Match = nextH2Regex.exec(remainingContent);
  const faqContent = nextH2Match
    ? remainingContent.slice(0, nextH2Match.index)
    : remainingContent;

  // Extract ### questions and their answer paragraphs
  const items: { question: string; answer: string }[] = [];
  const questionRegex = /^### (.+)$/gm;
  let qMatch;
  const questions: { question: string; index: number }[] = [];

  while ((qMatch = questionRegex.exec(faqContent)) !== null) {
    questions.push({ question: qMatch[1].trim(), index: qMatch.index + qMatch[0].length });
  }

  for (let i = 0; i < questions.length; i++) {
    const start = questions[i].index;
    const end = i + 1 < questions.length ? questions[i + 1].index - questions[i + 1].question.length - 4 : faqContent.length;
    const answerText = faqContent
      .slice(start, end)
      .trim()
      // Remove any MDX component tags that might appear
      .replace(/<[^>]+\/?>/g, "")
      .trim();
    if (answerText) {
      items.push({ question: questions[i].question, answer: answerText });
    }
  }

  return items;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const headings = extractHeadings(article.content);
  const faqItems = extractFAQItems(article.content);

  const { content: mdxContent } = await compileMDX({
    source: article.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  // Get related articles (same topic, different slug)
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.slug !== article.slug &&
        a.topics.some((t) => article.topics.includes(t))
    )
    .slice(0, 3);

  const jsonLd = generateArticleJsonLd(article);

  // Generate FAQ JSON-LD if FAQ items were found
  const faqJsonLd = faqItems.length > 0
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      })
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      )}
      <ArticleLayout
        article={article}
        headings={headings}
        relatedArticles={relatedArticles}
      >
        {mdxContent}
      </ArticleLayout>
    </>
  );
}
