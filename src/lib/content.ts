import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  type ContentType,
  type TaggableContent,
  type GuideFrontmatter,
  type BlogFrontmatter,
  type NewsFrontmatter,
  guideFrontmatterSchema,
  blogFrontmatterSchema,
  newsFrontmatterSchema,
} from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "content");

const SCHEMA_MAP = {
  guides: guideFrontmatterSchema,
  blog: blogFrontmatterSchema,
  news: newsFrontmatterSchema,
} as const;

const PREFIX_MAP: Record<ContentType, string> = {
  guides: "/guides",
  blog: "/blog",
  news: "/news",
};

export interface ContentMeta {
  title: string;
  slug: string;
  description?: string;
  publishedAt: string;
  updatedAt?: string;
  countries: string[];
  topics: string[];
  affiliates: string[];
  keywords: string[];
  featured: boolean;
  draft: boolean;
  relatedGuides: string[];
  readingTime: string;
  readingTimeMinutes: number;
  href: string;
  contentType: ContentType;
  featuredGuide?: string;
}

export interface Content extends ContentMeta {
  content: string;
}

function parseContentFile(filePath: string, type: ContentType): Content {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Validate frontmatter against schema
  const schema = SCHEMA_MAP[type];
  const parsed = schema.parse(data);

  const stats = readingTime(content);
  const slug = (parsed as { slug: string }).slug;

  return {
    title: parsed.title,
    slug,
    description: "description" in parsed ? (parsed as GuideFrontmatter | BlogFrontmatter).description : undefined,
    publishedAt: parsed.publishedAt
      ? new Date(parsed.publishedAt).toISOString().split("T")[0]
      : "",
    updatedAt: "updatedAt" in parsed && (parsed as GuideFrontmatter).updatedAt
      ? new Date((parsed as GuideFrontmatter).updatedAt!).toISOString().split("T")[0]
      : undefined,
    countries: "countries" in parsed ? (parsed as GuideFrontmatter | BlogFrontmatter).countries : [],
    topics: "topics" in parsed ? (parsed as GuideFrontmatter | BlogFrontmatter).topics : [],
    affiliates: "affiliates" in parsed ? ((parsed as GuideFrontmatter).affiliates ?? []) : [],
    keywords: "keywords" in parsed ? ((parsed as GuideFrontmatter | BlogFrontmatter).keywords ?? []) : [],
    featured: "featured" in parsed ? ((parsed as GuideFrontmatter).featured ?? false) : false,
    draft: parsed.draft ?? false,
    relatedGuides: "relatedGuides" in parsed ? ((parsed as BlogFrontmatter).relatedGuides ?? []) : [],
    featuredGuide: "featuredGuide" in parsed ? (parsed as NewsFrontmatter & { featuredGuide?: string }).featuredGuide : undefined,
    readingTime: stats.text,
    readingTimeMinutes: Math.ceil(stats.minutes),
    href: `${PREFIX_MAP[type]}/${slug}/`,
    contentType: type,
    content,
  };
}

function getContentDir(type: ContentType): string {
  return path.join(CONTENT_DIR, type);
}

export function getAllContent(type: ContentType): ContentMeta[] {
  const dir = getContentDir(type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const items = files.map((file) => {
    const item = parseContentFile(path.join(dir, file), type);
    const { content: _, ...meta } = item;
    return meta;
  });

  return items
    .filter((item) => !item.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getContentBySlug(type: ContentType, slug: string): Content | null {
  const dir = getContentDir(type);
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const item = parseContentFile(path.join(dir, file), type);
    if (item.slug === slug) return item;
  }

  return null;
}

export function getContentByCountry(type: TaggableContent, country: string): ContentMeta[] {
  return getAllContent(type).filter((item) =>
    item.countries.map((c) => c.toLowerCase()).includes(country.toLowerCase())
  );
}

export function getContentByTopic(type: TaggableContent, topic: string): ContentMeta[] {
  return getAllContent(type).filter((item) =>
    item.topics.map((t) => t.toLowerCase()).includes(topic.toLowerCase())
  );
}

export function getFeaturedContent(type: TaggableContent): ContentMeta[] {
  return getAllContent(type).filter((item) => item.featured);
}

export function getAllSlugs(type: ContentType): string[] {
  return getAllContent(type).map((item) => item.slug);
}

// Cross-linking helpers

export function getRelatedGuides(slugs: string[]): ContentMeta[] {
  const allGuides = getAllContent("guides");
  return allGuides.filter((g) => slugs.includes(g.slug));
}

export function getBlogPostsForGuide(guideSlug: string): ContentMeta[] {
  return getAllContent("blog").filter((post) =>
    post.relatedGuides.includes(guideSlug)
  );
}

export function getLatestNews(count: number): ContentMeta[] {
  return getAllContent("news").slice(0, count);
}
