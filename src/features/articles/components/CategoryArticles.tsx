import { useState } from "react";
import "../../../styles/article/article-detail.scss";

export interface CategoryArticle {
    id: number;
    title: string;
    image: string;
    publishedAt: string;
    link: string;
}
interface CategoryArticlesProps {
    articles: CategoryArticle[];
    title?: string;
    visibleCount?: number;
}
const CategoryArticles = ({ articles, title = "CÙNG CHUYÊN MỤC", visibleCount = 3 }: CategoryArticlesProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    if(!articles.length) return null;

    const maxIndex = Math.max(0, articles.length - visibleCount);
    const visibleArticles = articles.slice(activeIndex, activeIndex + visibleCount);
    return (
        <section className="category-articles">
            <div className="category-articles__header">
                <h2 className="category-articles__heading">{title}</h2>
                <div className="category-articles__line"></div>
                <div className="category-articles__pagination">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button key={index} className={`category-articles__dot ${index === activeIndex ? "active" : ""}`} onClick={() => setActiveIndex(index)}></button>
                    ))}
                </div>
            </div>
            <div className="category-articles__grid">
                {visibleArticles.map((article) => (
                    <a key={article.id} href={article.link} className="category-articles__card">
                        <div className="category-articles__image-wrapper">
                             <img src={article.image} alt={article.title} className="category-articles__image" loading="lazy" />
                        </div>
                        <h3 className="category-articles__title">{article.title}</h3>
                        <span className="category-articles__time">{article.publishedAt}</span>
                    </a>
                ))}
            </div>
        </section>
    )
}
export default CategoryArticles;