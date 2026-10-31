import type { Article } from '../types.ts';
import { NewsCard } from './NewsCard.tsx';
import '@/styles/ArticleList.scss';

interface ArticleListProps {
  articles: Article[];
  activeId?: string;
  featuredFirst?: boolean;
}

export function ArticleList({ articles, activeId, featuredFirst = false }: ArticleListProps) {
  if (articles.length === 0) {
    return <p role="status">Chưa có bài viết.</p>;
  }

  return (
    <ul className="article-list" aria-label="Danh sách bài viết">
      {articles.map((article, index) => {
        const isFeatured = featuredFirst && index === 0;
        return (
          <li key={article.id} className={isFeatured ? 'article-list__featured' : undefined}>
            <NewsCard
              article={article}
              active={article.id === activeId}
              variant={isFeatured ? 'featured' : 'default'}
            />
          </li>
        );
      })}
    </ul>
  );
}
