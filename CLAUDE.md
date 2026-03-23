# PravasiDhan — NRI Finance Guide

## Quick Reference

- **Stack**: Next.js 16, React 19, Tailwind 4, TypeScript 5, Zod 4, MDX
- **URL**: https://pravasidhan.com
- **Deploy**: Vercel auto-deploys on push to `main`
- **GA4 Property**: 528923230
- **Search Console**: sc-domain:pravasidhan.com

## Commands

```bash
npm run dev          # local dev server
npm run build        # production build (runs validate first)
npm run validate     # check frontmatter, affiliates, related guides, orphans
npm run lint         # eslint
npm run new:guide    # interactive guide creator
npm run new:blog     # interactive blog post creator
npm run new:news     # creates today's news digest
```

## Project Structure

```
content/
  guides/    # evergreen NRI finance guides (MDX)
  blog/      # timely blog posts (MDX)
  news/      # daily news digests (MDX)
src/
  app/       # Next.js app router pages
  components/# React components
  lib/
    affiliates.ts  # affiliate partner registry
    constants.ts   # site config, nav, countries, topics
    content.ts     # MDX content loading
    schemas.ts     # Zod frontmatter schemas
    seo.ts         # metadata & JSON-LD generation
scripts/
  validate.ts      # prebuild content validator
  new-guide.ts     # content scaffolding
  new-blog.ts
  new-news.ts
```

## Content Conventions

- All content is MDX with Zod-validated frontmatter
- Countries: `canada`, `usa`, `uk`
- Topics: `tax`, `remittances`, `investments`, `property`, `banking`
- Affiliate keys must exist in `src/lib/affiliates.ts`
- `draft: true` hides content without deleting files
- Always run `npm run validate` before committing content

## Commit Style

```
content: add/update description of content changes
feat: new feature description
fix: bug fix description
chore: maintenance task description
```

## Testing

```bash
npx vitest run       # run all tests
npx vitest           # watch mode
```

Tests live in `__tests__/` at project root. Uses Vitest.
