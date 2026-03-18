import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string): Promise<string> => new Promise((r) => rl.question(q, r));

async function main() {
  const title = await ask("Title: ");
  const slug = await ask("Slug: ");
  const countries = (await ask("Countries (comma-separated): ")).split(",").map((s) => s.trim()).filter(Boolean);
  const topics = (await ask("Topics (comma-separated): ")).split(",").map((s) => s.trim()).filter(Boolean);
  const relatedGuides = (await ask("Related guide slugs (comma-separated): ")).split(",").map((s) => s.trim()).filter(Boolean);

  const today = new Date().toISOString().split("T")[0];

  const content = `---
title: "${title}"
slug: ${slug}
description: ""
publishedAt: "${today}"
countries: [${countries.map((c) => `"${c}"`).join(", ")}]
topics: [${topics.map((t) => `"${t}"`).join(", ")}]
relatedGuides: [${relatedGuides.map((g) => `"${g}"`).join(", ")}]
keywords: []
draft: true
---

## Introduction

TODO: Write introduction.

## Analysis

TODO: Add analysis.

## What This Means for You

TODO: Practical implications for NRIs.
`;

  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${filePath}`);
  rl.close();
}

main();
