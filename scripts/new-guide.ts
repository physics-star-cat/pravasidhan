import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string): Promise<string> => new Promise((r) => rl.question(q, r));

async function main() {
  const title = await ask("Title: ");
  const slug = await ask("Slug: ");
  const countries = (await ask("Countries (comma-separated, e.g. canada,usa): ")).split(",").map((s) => s.trim()).filter(Boolean);
  const topics = (await ask("Topics (comma-separated, e.g. tax,remittances): ")).split(",").map((s) => s.trim()).filter(Boolean);
  const affiliates = (await ask("Affiliates (comma-separated, e.g. wise,cleartax): ")).split(",").map((s) => s.trim()).filter(Boolean);

  const today = new Date().toISOString().split("T")[0];

  const content = `---
title: "${title}"
slug: ${slug}
description: ""
publishedAt: "${today}"
updatedAt: "${today}"
countries: [${countries.map((c) => `"${c}"`).join(", ")}]
topics: [${topics.map((t) => `"${t}"`).join(", ")}]
affiliates: [${affiliates.map((a) => `"${a}"`).join(", ")}]
keywords: []
featured: false
draft: true
---

## Introduction

TODO: Write introduction.

## Section

TODO: Add sections.

${affiliates.map((a) => `<AffiliateCTA partner="${a}" />`).join("\n\n")}

## Frequently Asked Questions

### Question 1?

TODO: Answer.

<Disclaimer />
`;

  const filePath = path.join(process.cwd(), "content", "guides", `${slug}.mdx`);
  fs.writeFileSync(filePath, content);
  console.log(`Created: ${filePath}`);
  rl.close();
}

main();
