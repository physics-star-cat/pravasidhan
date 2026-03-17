# PravasiDhan.com — Design Spec

## Overview

Affiliate-first NRI finance site targeting Canadian NRIs (expanding to USA/UK). Built with Next.js, deployed on Vercel, domain on Cloudflare. Professional/traditional Indian bank aesthetic (navy + gold).

## Site Architecture

```
pravasidhan.com/
├── /                        → Homepage (hero + featured articles + country selector)
├── /canada/                 → Canada hub (all Canada articles)
├── /usa/                    → USA hub ("coming soon")
├── /uk/                     → UK hub ("coming soon")
├── /remittances/            → Topic hub across countries
├── /tax/                    → Topic hub
├── /investments/            → Topic hub
├── /property/               → Topic hub
├── /banking/                → Topic hub
├── /[slug]                  → Individual articles (flat URLs)
├── /about                   → E-E-A-T signals
├── /privacy                 → Privacy policy
├── /disclaimer              → Financial disclaimer
├── /affiliate-disclosure    → Affiliate disclosure
└── /go/[partner]            → Affiliate redirect routes (invisible)
```

### URL Strategy
- Flat article URLs: `pravasidhan.com/send-money-canada-to-india` (not nested)
- Trailing slash enforced via Next.js config (`trailingSlash: true`)
- Canonical `<link rel="canonical">` on every page
- No `.html` extensions ever

### Content Model
Articles are MDX files in `/content/articles/` with frontmatter:

```yaml
---
title: "How to Send Money from Canada to India in 2026"
slug: send-money-canada-to-india
description: "Compare the cheapest ways to transfer money..."
publishedAt: 2026-03-20
updatedAt: 2026-03-20
countries: [canada]
topics: [remittances]
affiliates: [wise, remitly]
keywords: ["send money canada to india", "cheapest way to transfer money india"]
featured: true
---
```

Hub pages auto-aggregate articles by `countries` and `topics` tags.

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router, static export) | Fast, free on Vercel, great SEO |
| Language | TypeScript | Type safety for affiliate config |
| Styling | Tailwind CSS | Rapid styling, design system via config |
| Content | MDX files in repo | Zero cost, git-based, no CMS dependency |
| MDX Processing | next-mdx-remote or contentlayer2 | Parse frontmatter + render MDX |
| Deployment | Vercel (free tier) | Auto-deploy on push, edge CDN |
| Domain | Cloudflare Registrar | DNS + SSL + caching |
| Analytics | Vercel Analytics (free) | Basic traffic tracking |
| Affiliate Tracking | Central config + /go/ redirects | Track clicks, swap URLs globally |

## Project Structure

```
pravasidhan/
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── og-default.png
├── src/
│   ├── app/
│   │   ├── layout.tsx              → Root layout (nav, footer, fonts)
│   │   ├── page.tsx                → Homepage
│   │   ├── [slug]/page.tsx         → Article pages (dynamic)
│   │   ├── canada/page.tsx         → Canada hub
│   │   ├── usa/page.tsx            → USA hub
│   │   ├── uk/page.tsx             → UK hub
│   │   ├── remittances/page.tsx    → Topic hub
│   │   ├── tax/page.tsx            → Topic hub
│   │   ├── investments/page.tsx    → Topic hub
│   │   ├── property/page.tsx       → Topic hub
│   │   ├── banking/page.tsx        → Topic hub
│   │   ├── about/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── disclaimer/page.tsx
│   │   ├── affiliate-disclosure/page.tsx
│   │   ├── go/[partner]/route.ts   → Affiliate redirect API route
│   │   ├── sitemap.ts              → Auto-generated sitemap
│   │   └── robots.ts               → robots.txt
│   ├── components/
│   │   ├── Header.tsx              → Nav with country selector
│   │   ├── Footer.tsx              → Links, disclaimer, trust badges
│   │   ├── ArticleCard.tsx         → Card for hub pages
│   │   ├── ArticleLayout.tsx       → Article page wrapper
│   │   ├── ComparisonTable.tsx     → Reusable comparison tables
│   │   ├── AffiliateCTA.tsx        → Styled affiliate call-to-action box
│   │   ├── AffiliateLink.tsx       → Inline link with nofollow/sponsored
│   │   ├── TableOfContents.tsx     → Auto-generated from headings
│   │   ├── FAQSchema.tsx           → FAQ structured data
│   │   ├── Breadcrumbs.tsx         → Breadcrumb nav + schema
│   │   ├── RelatedArticles.tsx     → Related guides at bottom
│   │   ├── Disclaimer.tsx          → Reusable disclaimer box
│   │   ├── ComingSoon.tsx          → For USA/UK hub pages
│   │   └── SEOHead.tsx             → Meta tags, OG, canonical, JSON-LD
│   ├── lib/
│   │   ├── articles.ts            → Load/parse MDX articles
│   │   ├── affiliates.ts          → Central affiliate URL config
│   │   └── constants.ts           → Site metadata, nav items
│   └── styles/
│       └── globals.css            → Tailwind base + custom typography
├── content/
│   └── articles/
│       ├── send-money-canada-to-india.mdx
│       ├── nri-tax-filing-canada-2026.mdx
│       └── ...
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

## Design System

### Colors (Navy + Gold, Bank/Institution Style)

```
Primary Navy:    #1B2A4A (headings, nav, footer)
Dark Navy:       #0F1A2E (footer background)
Gold Accent:     #C8962E (CTAs, highlights, borders)
Light Gold:      #F5E6C8 (subtle backgrounds, hover states)
Cream:           #FAF7F2 (page background)
White:           #FFFFFF (cards, content areas)
Text Dark:       #1A1A1A (body text)
Text Muted:      #6B7280 (secondary text)
Success Green:   #15803D (positive indicators)
Warning Amber:   #D97706 (alerts, disclaimers)
```

### Typography

```
Headings: Merriweather (serif) — traditional, authoritative, bank-like
Body:     Inter (sans-serif) — clean, readable
Mono:     JetBrains Mono — for any code/numbers
```

### Component Styling
- Cards: White background, 1px `#E5E7EB` border, subtle shadow, gold left-border on hover
- CTA boxes: Navy background, gold button, white text
- Tables: Alternating cream/white rows, navy header, gold accent border
- Disclaimer boxes: Amber left-border, light amber background
- Navigation: Navy background, gold active indicator

## Affiliate Link System

### Central Config (`src/lib/affiliates.ts`)

```typescript
export const affiliates = {
  wise: {
    name: "Wise",
    url: "https://wise.com/invite/YOURCODE",
    description: "International money transfers",
    cta: "Try Wise — Save on Transfer Fees",
  },
  cleartax: {
    name: "ClearTax",
    url: "https://cleartax.in/?ref=YOURCODE",
    description: "NRI tax filing service",
    cta: "File Your NRI Taxes with ClearTax",
  },
  // ... more partners
} as const;
```

### Redirect Routes (`/go/[partner]`)
- `/go/wise` → redirects to Wise affiliate URL
- Logs click (optional: Vercel edge function with analytics)
- All affiliate links in articles resolve through this system
- Auto-adds `rel="nofollow sponsored"` to all affiliate links

### MDX Usage
In articles, authors use:
```mdx
<AffiliateCTA partner="wise" />
<AffiliateLink partner="wise">Try Wise</AffiliateLink>
```

## SEO Strategy

### Per-Page SEO
- Unique `<title>` and `<meta description>` from frontmatter
- Canonical URL (absolute, trailing slash)
- Open Graph + Twitter Card meta tags
- JSON-LD: Article schema, FAQ schema, BreadcrumbList schema
- Auto-generated sitemap.xml at `/sitemap.xml`
- robots.txt allowing all crawlers

### Technical SEO
- Static generation = fast TTFB
- Image optimization via Next.js `<Image>`
- Core Web Vitals optimized (no CLS from ads initially)
- Internal linking via RelatedArticles component
- Breadcrumbs on every article

### Content SEO
- H1 = article title (one per page)
- H2/H3 hierarchy for scannable structure
- FAQ section at bottom of every article (doubles as FAQ schema)
- Comparison tables for featured snippets
- Target one primary keyword + 2-3 secondary per article

## Content Calendar (First 15 Articles — Prioritized by Revenue)

### Tier 1: Money Pages (Publish First — Weeks 1-3)

| # | Title | Target Keyword | Monthly Searches (est.) | Affiliate Angle |
|---|-------|---------------|------------------------|----------------|
| 1 | How to Send Money from Canada to India in 2026: Cheapest Methods Compared | send money canada to india | 2,000–4,000 | Wise (£10–£50/referral) |
| 2 | Best NRI Tax Filing Services 2026: ClearTax vs Tax2Win vs Hiring a CA | NRI tax filing service | 1,000–2,000 | ClearTax, Tax2Win |
| 3 | NRE vs NRO Account for Canadian NRIs: Which Should You Open? | NRE vs NRO account | 1,500–3,000 | Bank lead gen, IndMoney |
| 4 | How to Invest in Indian Mutual Funds from Canada as NRI in 2026 | NRI mutual fund investment | 800–1,500 | IndMoney, Vance, SBNRI |
| 5 | Buying Property in India from Canada: Complete Legal & Tax Guide 2026 | NRI buying property India | 1,000–2,000 | NoBroker, Square Yards |
| 6 | Best NRE Fixed Deposit Rates 2026: Compare Top Banks for NRIs | best NRE FD rates | 1,000–2,500 | Bank comparisons |
| 7 | NRI Home Loan in India: Eligibility, Banks & Process for Canadian NRIs | NRI home loan India | 500–1,000 | HDFC, SBI home loan leads |

### Tier 2: SEO Support Pages (Weeks 3-6)

| # | Title | Target Keyword | Monthly Searches (est.) | Internal Links To |
|---|-------|---------------|------------------------|-------------------|
| 8 | DTAA Between India and Canada Explained: Avoid Double Taxation | India Canada DTAA | 800–1,500 | Tax filing (#2), Property (#5) |
| 9 | NRI TDS on Indian Income: Rates, Rules & How to Claim Refund 2026 | NRI TDS rates | 1,000–2,000 | Tax filing (#2), Property (#5) |
| 10 | Capital Gains Tax for NRIs Selling Property in India 2026 | NRI capital gains tax property | 800–1,500 | Property (#5) |
| 11 | Form 15CA and 15CB for NRIs: Complete Guide | Form 15CA 15CB NRI | 500–1,000 | Remittances (#1), Property (#5) |
| 12 | NRI Status Under Income Tax: How 182-Day Rule Works | NRI status income tax India | 500–1,000 | All tax articles |
| 13 | T1135 Foreign Income Verification for Canadian NRIs: What to Report | T1135 NRI Canada | 300–600 | Tax filing (#2), Investments (#4) |

### Tier 3: Seasonal (Publish Timed to Events)

| # | Title | Target Keyword | When to Publish |
|---|-------|---------------|----------------|
| 14 | NRI ITR Filing Deadline 2026: Step-by-Step for Canadian Residents | NRI ITR filing 2026 deadline | Late March (NOW — tax season) |
| 15 | India Budget 2026: Key Changes Affecting NRIs | India budget 2026 NRI | Day of budget announcement |

### Expansion Articles (Month 2-3, After Canada Pillar Ranks)

| # | Title | Target Keyword | Country |
|---|-------|---------------|---------|
| 16 | How to Send Money from USA to India: Cheapest Ways 2026 | send money USA to India | USA |
| 17 | NRI Tax Filing from USA: DTAA, FBAR & ITR Guide 2026 | NRI tax filing USA | USA |
| 18 | How to Send Money from UK to India: Best Transfer Options 2026 | send money UK to India | UK |
| 19 | NRI Tax Filing from UK: DTAA, Self-Assessment & ITR Guide 2026 | NRI tax filing UK | UK |
| 20 | Returning to India from Canada: Complete Financial Checklist 2026 | NRI returning to India checklist | Canada |

## AdSense Strategy (Secondary)

- Apply after 15+ articles and some organic traffic (month 2-3)
- Auto-ads only — no manual placement that hurts UX
- Exclude ad placements from Tier 1 money pages (affiliate CTAs convert better)
- Run ads on Tier 2/3 informational pages where there's no strong affiliate angle

## Launch Plan

1. **Week 1:** Scaffold site, deploy skeleton to Vercel, configure Cloudflare DNS
2. **Week 1-2:** Write and publish articles #1, #2, #3, #14 (highest revenue + tax season timing)
3. **Week 2-3:** Write and publish articles #4–#7 (remaining money pages)
4. **Week 3-5:** Write articles #8–#13 (support pages, internal linking)
5. **Week 2+:** Apply to Wise affiliate program, ClearTax partner program
6. **Month 2-3:** Apply for AdSense, begin USA/UK expansion articles
