import type { FeaturedNewsData } from "@/types/featured-news";
import FeaturedNewsCarousel from "./FeaturedNewsCarousel";

interface FeaturedNewsSectionProps {
  articles: FeaturedNewsData[];
  title?: string;
}
const FeaturedNewsSection = ({articles, title = "TIN NỔI BẬT" }: FeaturedNewsSectionProps) => {
  return (
    <section className="featured-news-section">
      <div className="featured-news-section__decoration">
        <div className="featured-news-section__title">
          <span>{title}</span>
        </div>
      </div>
      <FeaturedNewsCarousel articles={articles} />
    </section>
  );
};

export default FeaturedNewsSection;