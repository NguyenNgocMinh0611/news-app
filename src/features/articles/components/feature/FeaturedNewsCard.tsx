import type { FeaturedNewsData } from "@/types/featured-news";

interface FeaturedNewsCardProps {
  article: FeaturedNewsData;
}
const FeaturedNewsCard = ({ article }: FeaturedNewsCardProps) => {
  return (
    <article className="featured-news-card">
      <a href={article.link} className="featured-news-card__image-link">
        <img src={article.image} alt={article.title}
          className="featured-news-card__image"
          loading="lazy"
        />
      </a>
      <div className="featured-news-card__content">
        <a href={article.link} className="featured-news-card__title"
          title={article.title}>
          {article.title}
        </a>
        <div className="featured-news-card__meta">
          <span className="featured-news-card__category">
            {article.category}
          </span>
          <time>{article.publishedAt}</time>
        </div>
      </div>
    </article>
  );
};

export default FeaturedNewsCard;