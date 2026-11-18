import { useState } from "react";

import FeaturedNewsCard from "./FeaturedNewsCard";
import type { FeaturedNewsData } from "@/types/featured-news";


interface FeaturedNewsCarouselProps {
  articles: FeaturedNewsData[];
  visibleCount?: number;
}
const FeaturedNewsCarousel = ({ articles, visibleCount = 3 }: FeaturedNewsCarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(articles.length / visibleCount);
  const startIndex = currentPage * visibleCount;
  const visibleArticles = articles.slice(
    startIndex,
    startIndex + visibleCount
  );
  const handlePrevious = () => {
    setCurrentPage((prev) =>
      prev === 0 ? totalPages - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setCurrentPage((prev) =>
      prev === totalPages - 1 ? 0 : prev + 1
    );
  };
  const handleGoToPage = (index: number) => {
    setCurrentPage(index);
  };
  if (articles.length === 0) {
    return null;
  }
  return (
    <div className="featured-news-carousel">
      <button
        type="button"
        className="featured-news-carousel__arrow featured-news-carousel__arrow--prev"
        onClick={handlePrevious}
        aria-label="Bài viết trước"
        disabled={totalPages <= 1} >
        <span aria-hidden="true">‹</span>
      </button>
      <div className="featured-news-carousel__viewport">
        <div className="featured-news-carousel__track">
          {visibleArticles.map((article) => (
            <FeaturedNewsCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        className="featured-news-carousel__arrow featured-news-carousel__arrow--next"
        onClick={handleNext}
        aria-label="Bài viết tiếp theo"
        disabled={totalPages <= 1} >
        <span aria-hidden="true">›</span>
      </button>
      <div className="featured-news-carousel__dots">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`featured-news-carousel__dot ${
              currentPage === index
                ? "featured-news-carousel__dot--active"
                : ""
            }`}
            onClick={() => handleGoToPage(index)}
            aria-label={`Chuyển đến trang ${index + 1}`}
            aria-current={currentPage === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedNewsCarousel;