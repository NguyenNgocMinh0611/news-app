import "../../../styles/article/article-detail.scss";

export interface RelatedArticle{
    id: number | string;
    title: string;
    link: string;
    isFeatured?: boolean;
}
interface RelatedArticlesProps {
    articles: RelatedArticle[];
    tags?: string[];
}
const RelatedArticles = ({articles, tags = []}: RelatedArticlesProps) => {
    if(!articles.length && !tags.length) return null;
    return (
        <section className="related-articles">
            {articles.length > 0 && (
                <div className="related-articles__box">
                    <h2 className="related-articles__heading">TIN LIÊN QUAN</h2>
                    <ul className="related-articles__list">
                        {articles.map((article) => (
                            <li key={article.id} className="related-articles__item">
                                <a href={article.link} className="related-articles__link">
                                    {article.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {tags.length > 0 && (
                <div className="related-articles__tags">
                    {tags.map((tag, index) => (
                        <a key={`${tag}-${index}`} href="#" className="related-articles__tag">
                            {tag}
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
};

export default RelatedArticles;