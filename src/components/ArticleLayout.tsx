import { type ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import TableOfContents from "./TableOfContents";
import Disclaimer from "./Disclaimer";
import RelatedArticles from "./RelatedArticles";
import type { ContentMeta, Content } from "@/lib/content";

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

interface ArticleLayoutProps {
  article: Content;
  headings: TocHeading[];
  children: ReactNode;
  relatedArticles?: ContentMeta[];
}

export default function ArticleLayout({
  article,
  headings,
  children,
  relatedArticles = [],
}: ArticleLayoutProps) {
  const breadcrumbItems = [];

  if (article.countries.length > 0) {
    const country = article.countries[0];
    breadcrumbItems.push({
      label: country.charAt(0).toUpperCase() + country.slice(1),
      href: `/${country}/`,
    });
  }

  if (article.topics.length > 0) {
    const topic = article.topics[0];
    breadcrumbItems.push({
      label: topic.charAt(0).toUpperCase() + topic.slice(1),
      href: `/${topic}/`,
    });
  }

  breadcrumbItems.push({
    label: article.title,
    href: article.href || `/${article.slug}/`,
  });

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header */}
      <header className="mb-8 max-w-3xl">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-4 leading-tight">
          {article.title}
        </h1>
        {article.description && (
          <p className="text-lg text-text-muted leading-relaxed mb-4">
            {article.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
          <time dateTime={article.publishedAt}>
            Published{" "}
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {article.updatedAt && article.updatedAt !== article.publishedAt && (
            <span>
              Updated{" "}
              {new Date(article.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {article.readingTime}
          </span>
          <div className="flex gap-2">
            {article.countries.map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 text-xs font-medium bg-navy/10 text-navy rounded"
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Content + Sidebar */}
      <div className="flex gap-12">
        {/* Main Content */}
        <div className="flex-1 min-w-0 max-w-3xl">
          {/* Mobile TOC */}
          <div className="lg:hidden">
            <TableOfContents headings={headings} />
          </div>

          <div className="prose">{children}</div>

          <Disclaimer />
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <TableOfContents headings={headings} />
        </aside>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-12 pt-12 border-t border-gray-200">
          <RelatedArticles articles={relatedArticles} />
        </div>
      )}
    </article>
  );
}
