import * as fs from "fs";
import * as path from "path";

function main() {
  const today = new Date().toISOString().split("T")[0];
  const displayDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Find a guide to feature (round-robin based on existing news files)
  const guidesDir = path.join(process.cwd(), "content", "guides");
  const newsDir = path.join(process.cwd(), "content", "news");

  const guideFiles = fs.existsSync(guidesDir)
    ? fs.readdirSync(guidesDir).filter((f) => f.endsWith(".mdx"))
    : [];

  const guideSlugs = guideFiles.map((f) => f.replace(".mdx", ""));

  let featuredGuide = guideSlugs[0] || "send-money-canada-to-india";

  if (guideSlugs.length > 1 && fs.existsSync(newsDir)) {
    const newsFiles = fs.readdirSync(newsDir).filter((f) => f.endsWith(".mdx")).sort().reverse();
    // Scan recent news to find last featured guide
    for (const nf of newsFiles.slice(0, guideSlugs.length)) {
      const newsContent = fs.readFileSync(path.join(newsDir, nf), "utf8");
      const match = newsContent.match(/featuredGuide: "([^"]+)"/);
      if (match) {
        const lastIdx = guideSlugs.indexOf(match[1]);
        if (lastIdx !== -1) {
          featuredGuide = guideSlugs[(lastIdx + 1) % guideSlugs.length];
          break;
        }
      }
    }
  }

  const content = `---
title: "News from Home — ${displayDate}"
slug: "${today}"
publishedAt: "${today}"
featuredGuide: "${featuredGuide}"
---

## Headlines

- TODO

## Weather

- TODO

## Markets

- **Sensex:** TODO
- **Nifty:** TODO
- **INR/CAD:** TODO

## Sports

- TODO

## Featured Guide

Check out our guide: [TODO Title](/guides/${featuredGuide}/)
`;

  const filePath = path.join(process.cwd(), "content", "news", `${today}.mdx`);
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${filePath}`);
}

main();
