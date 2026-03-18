import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description?: string;
  publishedAt: string;
  updatedAt?: string;
  countries: string[];
  topics: string[];
  affiliates?: string[];
  keywords?: string[];
  featured?: boolean;
  href?: string;
}

export function generateArticleMetadata(
  frontmatter: ArticleFrontmatter
): Metadata {
  const canonicalUrl = `${SITE_URL}${frontmatter.href || `/${frontmatter.slug}/`}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt || frontmatter.publishedAt,
      authors: [SITE_NAME],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
    },
  };
}

export function generateArticleJsonLd(frontmatter: ArticleFrontmatter): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt || frontmatter.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${frontmatter.href || `/${frontmatter.slug}/`}`,
    },
  };

  return JSON.stringify(jsonLd);
}

export function generateHubMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
