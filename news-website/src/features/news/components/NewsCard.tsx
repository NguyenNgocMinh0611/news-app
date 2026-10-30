import type { Article } from '../types';
import '../../../styles/NewsCard.scss';

export type NewsCardVariant = 'default' | 'featured';

interface NewsCardProps {
  article: Article;
  active?: boolean;
  variant?: NewsCardVariant;
}

const DESCRIPTION_MAX_LENGTH: Record<NewsCardVariant, number> = {
  default: 140,
  featured: 260,
};

const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

function toShortDescription(text: string, maxLength: number) {
  const plain = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (plain.length <= maxLength) return plain;
  const cut = plain.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export function NewsCard({ article, active = false, variant = 'default' }: NewsCardProps) {
  const date = article.pubDate ? new Date(article.pubDate) : null;
  const publishedAt = date && !Number.isNaN(date.getTime()) ? date : null;
  const description = toShortDescription(article.description ?? '', DESCRIPTION_MAX_LENGTH[variant]);

  const className = [
    'news-card',
    `news-card--${variant}`,
    active && 'news-card--active',
  ].filter(Boolean).join(' ');

  return (
    <article className={className} aria-current={active ? 'true' : undefined}>
      {article.image && (
        <a
          className="news-card__thumb"
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            className="news-card__image"
            src={article.image}
            alt=""
            loading={variant === 'featured' ? 'eager' : 'lazy'}
          />
        </a>
      )}
      <div className="news-card__body">
        {article.category && <p className="news-card__category">{article.category}</p>}
        <h3 className="news-card__title">
          <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
        </h3>
        {publishedAt && (
          <time className="news-card__date" dateTime={publishedAt.toISOString()}>
            {dateFormatter.format(publishedAt)}
          </time>
        )}
        {description && <p className="news-card__description">{description}</p>}
      </div>
    </article>
  );
}
