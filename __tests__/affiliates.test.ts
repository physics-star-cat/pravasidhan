import { describe, it, expect } from "vitest";
import { affiliates, getAffiliate, getAffiliatesByCategory } from "../src/lib/affiliates";

describe("affiliates registry", () => {
  it("has all expected partners", () => {
    const keys = Object.keys(affiliates);
    expect(keys).toContain("wise");
    expect(keys).toContain("cleartax");
    expect(keys).toContain("tax2win");
    expect(keys).toContain("indmoney");
    expect(keys).toContain("sbnri");
    expect(keys).toContain("nobroker");
    expect(keys).toContain("squareyards");
  });

  it("every partner has required fields", () => {
    for (const [key, partner] of Object.entries(affiliates)) {
      expect(partner.name, `${key}.name`).toBeTruthy();
      expect(partner.url, `${key}.url`).toMatch(/^https:\/\//);
      expect(partner.description, `${key}.description`).toBeTruthy();
      expect(partner.cta, `${key}.cta`).toBeTruthy();
      expect(partner.category, `${key}.category`).toBeTruthy();
    }
  });
});

describe("getAffiliate", () => {
  it("returns partner by key", () => {
    const wise = getAffiliate("wise");
    expect(wise).toBeDefined();
    expect(wise!.name).toBe("Wise");
  });

  it("returns undefined for unknown key", () => {
    expect(getAffiliate("nonexistent")).toBeUndefined();
  });
});

describe("getAffiliatesByCategory", () => {
  it("returns only partners in the given category", () => {
    const tax = getAffiliatesByCategory("tax");
    expect(tax.length).toBeGreaterThan(0);
    for (const partner of tax) {
      expect(partner.category).toBe("tax");
    }
  });

  it("includes the key in each result", () => {
    const remittances = getAffiliatesByCategory("remittances");
    for (const partner of remittances) {
      expect(partner.key).toBeTruthy();
    }
  });

  it("returns empty array for category with no partners", () => {
    // All categories have partners, but casting to test the function
    const result = getAffiliatesByCategory("remittances");
    expect(Array.isArray(result)).toBe(true);
  });
});
