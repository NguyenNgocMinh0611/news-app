import type { Article } from "@/types/article";
import { BookmarkButton } from "@/features/bookmarks/components/BookmarkButton";
import { ShareButton } from "@/features/social-share/components/ShareButton";
import { toArticleId } from "@/features/news/components/NewsCard";

interface ArticleHeaderProps {
  article: Article;
}
export default function ArticleHeader({ article }: ArticleHeaderProps) {
  const articleLink = article.originalUrl || `/article/${article.slug}`;
  const articleId = toArticleId(articleLink);

  return (
    <header className="article-header">
      <div className="article-header__top">
        <h1 className="article-header__title">{article.title}</h1>
        <div className="article-header__actions">
          <ShareButton
            url={articleLink}
            title={article.title}
            variant="button"
          />
          <BookmarkButton
            articleId={articleId}
            title={article.title}
            link={articleLink}
            description={article.description ?? undefined}
            image={article.image ?? undefined}
            category={article.category}
            pubDate={article.publishedAt ?? undefined}
            variant="button"
          />
        </div>
      </div>
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
