import "../../../styles/article/article-detail.scss";

export interface RecommendedArticle {
  id: number | string;
  title: string;
  source: string;
  image: string;
  link: string;
}
interface RecommendedArticlesProps {
  articles: RecommendedArticle[];
}
const RecommendedArticles = ({ articles }: RecommendedArticlesProps) => {
  if (!articles.length) return null;

  return (
    <section className="recommended-articles">
      <div className="recommended-articles__header">
        <h2 className="recommended-articles__heading">DÀNH CHO BẠN</h2>
        <div className="recommended-articles__line" />
      </div>
      <div className="recommended-articles__grid">
        {articles.map((article) => (
          <a key={article.id} href={article.link} className="recommended-articles__card">
            <div className="recommended-articles__image-wrapper">
              <img src={article.image}alt={article.title}
                className="recommended-articles__image"
                loading="lazy" />
            </div>
            <span className="recommended-articles__source">
              {article.source}
            </span>
            <h3 className="recommended-articles__title">{article.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
};

export default RecommendedArticles;