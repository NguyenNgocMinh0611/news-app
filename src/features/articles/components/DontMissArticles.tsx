import type { Article } from '@/features/news/types';
import { Link } from 'react-router-dom';
import { toArticleId } from '@/features/news/components/NewsCard';

interface DontMissArticlesProps {
  articles: Article[];
}

function formatPublishedAt(value?: string): string {
  if (!value) return '';

  const publishedAt = new Date(value);
  if (Number.isNaN(publishedAt.getTime())) return '';

  const minutes = Math.floor((Date.now() - publishedAt.getTime()) / 60_000);
  if (minutes < 1) return 'Vừa xong';
  if (minutes < 60) return `${minutes} phút trước`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;

  return publishedAt.toLocaleDateString('vi-VN');
}

function formatDescription(description: string): string {
  const summary = description.trim();
  if (!summary || /^GD&ĐT\s*-/i.test(summary)) return summary;
  return `GD&ĐT - ${summary}`;
}

export default function DontMissArticles({ articles }: DontMissArticlesProps) {
  const articlesWithImages = articles.filter((article) => article.image);
  if (!articlesWithImages.length) return null;

  return (
    <section className="dont-miss" aria-labelledby="dont-miss-heading">
      <div className="dont-miss__header">
        <h2 className="dont-miss__heading" id="dont-miss-heading">
          ĐỪNG BỎ LỠ
        </h2>
        <div className="dont-miss__line" />
      </div>
      <div className="dont-miss__list">
        {articlesWithImages.map((article) => {
          const publishedAt = formatPublishedAt(article.pubDate);

          return (
            <article className="dont-miss__item" key={article.id}>
              <Link className="dont-miss__image-link" to={`/article/${toArticleId(article.link)}`}>
                <img
                  className="dont-miss__image"
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                />
              </Link>
              <div className="dont-miss__content">
                <h3 className="dont-miss__title">
                  <Link to={`/article/${toArticleId(article.link)}`}>{article.title}</Link>
                </h3>
                {publishedAt && (
                  <time className="dont-miss__time" dateTime={article.pubDate}>
                    {publishedAt}
                  </time>
                )}
                {article.description && (
                  <p className="dont-miss__description">
                    {formatDescription(article.description)}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
