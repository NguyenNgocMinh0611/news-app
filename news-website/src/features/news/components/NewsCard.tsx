import type { Article } from '../types';
import '../../../styles/NewsCard.scss';

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const date = article.pubDate ? new Date(article.pubDate) : null;
  const publishedAt = date && !Number.isNaN(date.getTime()) ? date : null;

  return (
    <article className="news-card">
      {article.image && (
        <img className="news-card__image" src={article.image} alt="" loading="lazy" />
      )}
      {article.category && <p className="news-card__category">{article.category}</p>}
      <h3 className="news-card__title">
        <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
      </h3>
      {publishedAt && (
        <time className="news-card__date" dateTime={publishedAt.toISOString()}>
          {publishedAt.toLocaleString('vi-VN')}
        </time>
      )}
      <p className="news-card__description">{article.description}</p>
    </article>
  );
}
