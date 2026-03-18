import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import {
  guideFrontmatterSchema,
  blogFrontmatterSchema,
  newsFrontmatterSchema,
} from "../src/lib/schemas";
import { affiliates } from "../src/lib/affiliates";

const CONTENT_DIR = path.join(process.cwd(), "content");
let errors = 0;
let warnings = 0;

function log(level: "ERROR" | "WARN", file: string, msg: string) {
  console.log(`${level}: ${file} — ${msg}`);
  if (level === "ERROR") errors++;
  else warnings++;
}

function validateDir(dir: string, type: "guides" | "blog" | "news") {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const schema = { guides: guideFrontmatterSchema, blog: blogFrontmatterSchema, news: newsFrontmatterSchema }[type];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);

    const result = schema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        log("ERROR", file, `Frontmatter: ${issue.path.join(".")} — ${issue.message}`);
      }
      continue;
    }

    const parsed = result.data;

    // Check affiliates exist
    if ("affiliates" in parsed && parsed.affiliates) {
      for (const aff of parsed.affiliates as string[]) {
        if (!affiliates[aff]) {
          log("ERROR", file, `Unknown affiliate: "${aff}"`);
        }
      }
    }

    // Check relatedGuides exist
    if ("relatedGuides" in parsed && parsed.relatedGuides) {
      for (const slug of parsed.relatedGuides as string[]) {
        const guidePath = path.join(CONTENT_DIR, "guides", `${slug}.mdx`);
        if (!fs.existsSync(guidePath)) {
          // Also check by scanning slugs in frontmatter
          const guideFiles = fs.readdirSync(path.join(CONTENT_DIR, "guides")).filter((f) => f.endsWith(".mdx"));
          const found = guideFiles.some((gf) => {
            const gData = matter(fs.readFileSync(path.join(CONTENT_DIR, "guides", gf), "utf8")).data;
            return gData.slug === slug;
          });
          if (!found) {
            log("ERROR", file, `Related guide not found: "${slug}"`);
          }
        }
      }
    }
  }
}

// Orphaned guides check
function checkOrphanedGuides() {
  const guidesDir = path.join(CONTENT_DIR, "guides");
  const blogDir = path.join(CONTENT_DIR, "blog");
  if (!fs.existsSync(guidesDir)) return;

  const guideFiles = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".mdx"));
  const guideSlugs = guideFiles.map((f) => {
    const { data } = matter(fs.readFileSync(path.join(guidesDir, f), "utf8"));
    return data.slug as string;
  });

  if (!fs.existsSync(blogDir)) {
    for (const slug of guideSlugs) {
      log("WARN", `guides/${slug}`, "No blog posts link to this guide");
    }
    return;
  }

  const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  const linkedGuides = new Set<string>();
  for (const bf of blogFiles) {
    const { data } = matter(fs.readFileSync(path.join(blogDir, bf), "utf8"));
    if (data.relatedGuides) {
      for (const slug of data.relatedGuides as string[]) {
        linkedGuides.add(slug);
      }
    }
  }

  for (const slug of guideSlugs) {
    if (!linkedGuides.has(slug)) {
      log("WARN", `guides/${slug}`, "No blog posts link to this guide");
    }
  }
}

console.log("Validating content...\n");
validateDir(path.join(CONTENT_DIR, "guides"), "guides");
validateDir(path.join(CONTENT_DIR, "blog"), "blog");
validateDir(path.join(CONTENT_DIR, "news"), "news");
checkOrphanedGuides();

console.log(`\n${errors} error(s), ${warnings} warning(s)`);
if (errors > 0) process.exit(1);
