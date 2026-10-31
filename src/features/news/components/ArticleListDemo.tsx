import { useState } from 'react';
import { mockArticles } from '../data/mockArticles.ts';
import { ArticleList } from './ArticleList.tsx';
import '@/styles/ArticleListDemo.scss';

export function ArticleListDemo() {
  const [showEmpty, setShowEmpty] = useState(false);
  const articles = showEmpty ? [] : mockArticles;

  return (
    <section className="article-demo" aria-labelledby="article-demo-heading">
      <h2 id="article-demo-heading">Danh sách bài viết — dữ liệu mẫu</h2>
      <p className="article-demo__note">
        Chỉ dùng để kiểm tra giao diện, không gọi RSS/API. Liên kết bài viết là URL minh họa.
      </p>
      <div className="article-demo__toolbar">
        <button type="button" aria-pressed={showEmpty} onClick={() => setShowEmpty((value) => !value)}>
          {showEmpty ? 'Hiển thị dữ liệu mẫu' : 'Kiểm tra danh sách rỗng'}
        </button>
        <span role="status">{articles.length} bài viết</span>
      </div>
      <ArticleList articles={articles} featuredFirst activeId={articles[1]?.id} />
    </section>
  );
}
