import { describe, it, expect } from "vitest";
import {
  guideFrontmatterSchema,
  blogFrontmatterSchema,
  newsFrontmatterSchema,
} from "../src/lib/schemas";

describe("guideFrontmatterSchema", () => {
  const validGuide = {
    title: "Send Money from Canada to India",
    slug: "send-money-canada-to-india",
    description: "Compare the best ways to send money from Canada to India.",
    publishedAt: "2026-03-20",
    countries: ["canada"],
    topics: ["remittances"],
  };

  it("accepts valid frontmatter", () => {
    const result = guideFrontmatterSchema.safeParse(validGuide);
    expect(result.success).toBe(true);
  });

  it("defaults optional fields", () => {
    const result = guideFrontmatterSchema.parse(validGuide);
    expect(result.affiliates).toEqual([]);
    expect(result.keywords).toEqual([]);
    expect(result.featured).toBe(false);
    expect(result.draft).toBe(false);
  });

  it("rejects missing title", () => {
    const { title, ...noTitle } = validGuide;
    const result = guideFrontmatterSchema.safeParse(noTitle);
    expect(result.success).toBe(false);
  });

  it("rejects missing slug", () => {
    const { slug, ...noSlug } = validGuide;
    const result = guideFrontmatterSchema.safeParse(noSlug);
    expect(result.success).toBe(false);
  });

  it("rejects missing countries", () => {
    const { countries, ...noCountries } = validGuide;
    const result = guideFrontmatterSchema.safeParse(noCountries);
    expect(result.success).toBe(false);
  });
});

describe("blogFrontmatterSchema", () => {
  const validBlog = {
    title: "IPL 2026 NRI Survival Guide",
    slug: "ipl-2026-nri-survival-guide",
    description: "How to watch IPL 2026 from abroad.",
    publishedAt: "2026-03-20",
    countries: ["canada", "usa", "uk"],
    topics: ["lifestyle"],
  };

  it("accepts valid frontmatter", () => {
    const result = blogFrontmatterSchema.safeParse(validBlog);
    expect(result.success).toBe(true);
  });

  it("defaults relatedGuides to empty array", () => {
    const result = blogFrontmatterSchema.parse(validBlog);
    expect(result.relatedGuides).toEqual([]);
  });

  it("rejects missing description", () => {
    const { description, ...noDesc } = validBlog;
    const result = blogFrontmatterSchema.safeParse(noDesc);
    expect(result.success).toBe(false);
  });
});

describe("newsFrontmatterSchema", () => {
  const validNews = {
    title: "News from Home — March 21, 2026",
    slug: "2026-03-21",
    publishedAt: "2026-03-21",
  };

  it("accepts valid frontmatter", () => {
    const result = newsFrontmatterSchema.safeParse(validNews);
    expect(result.success).toBe(true);
  });

  it("accepts optional featuredGuide", () => {
    const result = newsFrontmatterSchema.safeParse({
      ...validNews,
      featuredGuide: "send-money-canada-to-india",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing title", () => {
    const { title, ...noTitle } = validNews;
    const result = newsFrontmatterSchema.safeParse(noTitle);
    expect(result.success).toBe(false);
  });
});
