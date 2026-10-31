import type { Article } from "@/types/article";

interface ArticleHeaderProps {
  article: Article;
}
export default function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="article-header">
      <h1 className="article-header__title">{article.title}</h1>
      <div className="article-meta">
        {article.author && (
          <span className="article-meta__author">{article.author}</span>
        )}
        {article.publishedAt && (
          <time className="article-meta__time" dateTime={article.publishedAt}>
            {article.publishedAtLabel ?? article.publishedAt}
          </time>
        )}
      </div>
    </header>
  );
}
