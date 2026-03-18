import { z } from "zod";

export const guideFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  countries: z.array(z.string()),
  topics: z.array(z.string()),
  affiliates: z.array(z.string()).optional().default([]),
  keywords: z.array(z.string()).optional().default([]),
  featured: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),
});

export const blogFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  countries: z.array(z.string()),
  topics: z.array(z.string()),
  relatedGuides: z.array(z.string()).optional().default([]),
  keywords: z.array(z.string()).optional().default([]),
  draft: z.boolean().optional().default(false),
});

export const newsFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  publishedAt: z.string(),
  featuredGuide: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

export type GuideFrontmatter = z.infer<typeof guideFrontmatterSchema>;
export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
export type NewsFrontmatter = z.infer<typeof newsFrontmatterSchema>;

export type ContentType = "guides" | "blog" | "news";
export type TaggableContent = "guides" | "blog";
