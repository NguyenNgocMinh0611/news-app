import type { Article } from '../types';
import { NewsCard } from './NewsCard';
import '../../../styles/ArticleList.scss';

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return <p role="status">Chưa có bài viết.</p>;
  }

  return (
    <ul className="article-list" aria-label="Danh sách bài viết">
      {articles.map((article) => (
        <li key={article.id}>
          <NewsCard article={article} />
        </li>
      ))}
    </ul>
  );
}
