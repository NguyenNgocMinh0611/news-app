import type { Article } from '../types';
import '../../../styles/ArticleList.scss';

interface ArticleListProps {
  articles: Article[];
}

function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleString('vi-VN');
}

export function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return <p role="status">Chưa có bài viết.</p>;
  }

  return (
    <ul className="article-list" aria-label="Danh sách bài viết">
      {articles.map((article) => {
        const publishedAt = formatDate(article.pubDate);

        return (
          <li key={article.id}>
            <article className="article-card">
              {article.image && (
                <img className="article-card__image" src={article.image} alt="" loading="lazy" />
              )}
              {article.category && <p className="article-card__category">{article.category}</p>}
              <h3 className="article-card__title">
                <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
              </h3>
              {publishedAt && (
                <time className="article-card__date" dateTime={new Date(article.pubDate!).toISOString()}>
                  {publishedAt}
                </time>
              )}
              <p className="article-card__description">{article.description}</p>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
