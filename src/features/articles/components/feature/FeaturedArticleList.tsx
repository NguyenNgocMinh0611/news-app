import type { FeaturedArticleData } from "@/types/featured-article";

interface FeaturedArticleListProps {
  articles: FeaturedArticleData[];
}
const FeaturedArticleList = ({ articles,}: FeaturedArticleListProps) => {
  return (
    <div className="featured-article-list">
      {articles.map((article) => (
        <article className="featured-article-list__item" key={article.id}>
          <a href={article.link} className="featured-article-list__image-link">
            {article.image && (
              <img src={article.image} alt={article.title}
                className="featured-article-list__image"
                loading="lazy" />
            )}
          </a>
          <div className="featured-article-list__content">
            <a href={article.link} className="featured-article-list__title" >
              {article.title}
            </a>
            <div className="featured-article-list__meta">
              <span>{article.category}</span>
              <time>{article.publishedAt}</time>
            </div>
            <p className="featured-article-list__description">GD&TĐ - {article.description} </p>
          </div>
        </article>
      ))}
    </div>
  );
};
export default FeaturedArticleList;