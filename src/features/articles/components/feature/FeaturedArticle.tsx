import type { FeaturedArticleData } from "@/types/featured-article";
interface FeaturedArticleProps {
  article: FeaturedArticleData;
}
const FeaturedArticle = ({ article }: FeaturedArticleProps) => {
  return (
    <article className="featured-article">
      <a href={article.link} className="featured-article__link">
        {article.image && (
          <img src={article.image} alt={article.title}
            className="featured-article__image" />
        )}
        <h2 className="featured-article__title">
          {article.title}
        </h2>
      </a>
      <div className="featured-article__meta">
        <span className="featured-article__category">
          {article.category}
        </span>
        <time>{article.publishedAt}</time>
      </div>
      <p className="featured-article__description"> GD&TĐ - {article.description} </p>
    </article>
  );
};
export default FeaturedArticle;