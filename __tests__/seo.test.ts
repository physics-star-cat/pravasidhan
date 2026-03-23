import { describe, it, expect } from "vitest";
import {
  generateArticleMetadata,
  generateArticleJsonLd,
  generateHubMetadata,
} from "../src/lib/seo";

const sampleArticle = {
  title: "Send Money from Canada to India",
  slug: "send-money-canada-to-india",
  description: "Compare the best ways to send money from Canada to India.",
  publishedAt: "2026-03-20",
  countries: ["canada"],
  topics: ["remittances"],
  href: "/guides/send-money-canada-to-india/",
};

describe("generateArticleMetadata", () => {
  it("returns correct title and description", () => {
    const meta = generateArticleMetadata(sampleArticle);
    expect(meta.title).toBe(sampleArticle.title);
    expect(meta.description).toBe(sampleArticle.description);
  });

  it("sets canonical URL from href", () => {
    const meta = generateArticleMetadata(sampleArticle);
    expect(meta.alternates?.canonical).toBe(
      "https://pravasidhan.com/guides/send-money-canada-to-india/"
    );
  });

  it("falls back to slug for canonical when no href", () => {
    const { href, ...noHref } = sampleArticle;
    const meta = generateArticleMetadata(noHref);
    expect(meta.alternates?.canonical).toBe(
      "https://pravasidhan.com/send-money-canada-to-india/"
    );
  });

  it("sets openGraph type to article", () => {
    const meta = generateArticleMetadata(sampleArticle);
    expect(meta.openGraph).toMatchObject({ type: "article" });
  });

  it("uses publishedAt as modifiedTime when no updatedAt", () => {
    const meta = generateArticleMetadata(sampleArticle);
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.modifiedTime).toBe(sampleArticle.publishedAt);
  });

  it("uses updatedAt as modifiedTime when provided", () => {
    const meta = generateArticleMetadata({
      ...sampleArticle,
      updatedAt: "2026-03-22",
    });
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.modifiedTime).toBe("2026-03-22");
  });

  it("sets twitter card to summary_large_image", () => {
    const meta = generateArticleMetadata(sampleArticle);
    expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
  });
});

describe("generateArticleJsonLd", () => {
  it("returns valid JSON", () => {
    const jsonLd = generateArticleJsonLd(sampleArticle);
    expect(() => JSON.parse(jsonLd)).not.toThrow();
  });

  it("has Article type and schema.org context", () => {
    const parsed = JSON.parse(generateArticleJsonLd(sampleArticle));
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("Article");
  });

  it("includes headline and description", () => {
    const parsed = JSON.parse(generateArticleJsonLd(sampleArticle));
    expect(parsed.headline).toBe(sampleArticle.title);
    expect(parsed.description).toBe(sampleArticle.description);
  });

  it("includes publisher as Organization", () => {
    const parsed = JSON.parse(generateArticleJsonLd(sampleArticle));
    expect(parsed.publisher["@type"]).toBe("Organization");
    expect(parsed.publisher.name).toBe("PravasiDhan");
  });
});

describe("generateHubMetadata", () => {
  it("returns correct title and canonical", () => {
    const meta = generateHubMetadata("Canada NRI Guides", "Guides for Canadian NRIs", "/canada/");
    expect(meta.title).toBe("Canada NRI Guides");
    expect(meta.alternates?.canonical).toBe("https://pravasidhan.com/canada/");
  });

  it("sets openGraph type to website", () => {
    const meta = generateHubMetadata("Canada", "desc", "/canada/");
    expect(meta.openGraph).toMatchObject({ type: "website" });
  });
});
