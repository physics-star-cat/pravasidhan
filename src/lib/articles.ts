import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { ArticleFrontmatter } from "./seo";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export interface ArticleMeta extends ArticleFrontmatter {
  readingTime: string;
  readingTimeMinutes: number;
}

export interface Article extends ArticleMeta {
  content: string;
}

function parseArticleFile(filePath: string): Article {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    publishedAt: data.publishedAt
      ? new Date(data.publishedAt).toISOString().split("T")[0]
      : "",
    updatedAt: data.updatedAt
      ? new Date(data.updatedAt).toISOString().split("T")[0]
      : undefined,
    countries: data.countries || [],
    topics: data.topics || [],
    affiliates: data.affiliates || [],
    keywords: data.keywords || [],
    featured: data.featured || false,
    readingTime: stats.text,
    readingTimeMinutes: Math.ceil(stats.minutes),
    content,
  };
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));

  const articles = files.map((file) => {
    const article = parseArticleFile(path.join(ARTICLES_DIR, file));
    const { content: _, ...meta } = article;
    return meta;
  });

  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | null {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return null;
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const article = parseArticleFile(path.join(ARTICLES_DIR, file));
    if (article.slug === slug) {
      return article;
    }
  }

  return null;
}

export function getArticlesByCountry(country: string): ArticleMeta[] {
  return getAllArticles().filter((a) =>
    a.countries.map((c) => c.toLowerCase()).includes(country.toLowerCase())
  );
}

export function getArticlesByTopic(topic: string): ArticleMeta[] {
  return getAllArticles().filter((a) =>
    a.topics.map((t) => t.toLowerCase()).includes(topic.toLowerCase())
  );
}

export function getFeaturedArticles(): ArticleMeta[] {
  return getAllArticles().filter((a) => a.featured);
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}
