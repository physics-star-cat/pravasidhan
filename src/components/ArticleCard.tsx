import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

interface ArticleCardProps {
  article: ArticleMeta;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/${article.slug}/`} className="group block">
      <article className="bg-white border border-gray-200 rounded-lg p-6 h-full shadow-sm transition-all duration-200 hover:shadow-md hover:border-l-4 hover:border-l-gold hover:pl-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {article.countries.map((country) => (
            <span
              key={country}
              className="inline-block px-2 py-0.5 text-xs font-medium bg-navy/10 text-navy rounded"
            >
              {country.charAt(0).toUpperCase() + country.slice(1)}
            </span>
          ))}
          {article.topics.map((topic) => (
            <span
              key={topic}
              className="inline-block px-2 py-0.5 text-xs font-medium bg-gold-light text-gold-dark rounded"
            >
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-navy mb-2 group-hover:text-gold-dark transition-colors leading-snug">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-muted mb-4 line-clamp-2 leading-relaxed">
          {article.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{article.readingTime}</span>
        </div>
      </article>
    </Link>
  );
}
