import ArticleCard from "./ArticleCard";
import type { ArticleMeta } from "@/lib/articles";

interface RelatedArticlesProps {
  articles: ArticleMeta[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="my-12">
      <h2 className="font-heading text-2xl font-bold text-navy mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
