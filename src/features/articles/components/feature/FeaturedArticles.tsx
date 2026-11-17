import type { FeaturedArticleData } from "@/types/featured-article";
import FeaturedArticle from "./FeaturedArticle";
import FeaturedArticleList from "./FeaturedArticleList";

interface FeaturedArticlesProps {
  featuredArticle: FeaturedArticleData;
  articles: FeaturedArticleData[];
}
const FeaturedArticles = ({ featuredArticle, articles }: FeaturedArticlesProps) => {
  return (
    <section className="featured-articles">
      <div className="featured-articles__header">
        <h2 className="featured-articles__heading">
          TIN TIÊU ĐIỂM
        </h2>
      </div>
      <div className="featured-articles__layout">
        <FeaturedArticle article={featuredArticle} />
        <FeaturedArticleList articles={articles} />
      </div>
    </section>
  );
};

export default FeaturedArticles;