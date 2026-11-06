import { useMemo, useState } from 'react';
import { mockArticles } from '../data/mockArticles.ts';
import { ArticleList } from './ArticleList.tsx';
import { NewsPagination } from './NewsPagination.tsx';
import '@/styles/ArticleListDemo.scss';

const ARTICLES_PER_PAGE = 2;

export function ArticleListDemo() {
  const [showEmpty, setShowEmpty] = useState(false);
  const [category, setCategory] = useState('Tất cả');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(
    () => ['Tất cả', ...new Set(mockArticles.map((article) => article.category).filter(Boolean))],
    [],
  );
  const filteredArticles = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLocaleLowerCase();

    return mockArticles.filter((article) => {
      const matchesCategory = category === 'Tất cả' || article.category === category;
      const matchesKeyword =
        !normalizedKeyword ||
        `${article.title} ${article.description}`.toLocaleLowerCase().includes(normalizedKeyword);
      return matchesCategory && matchesKeyword;
    });
  }, [category, keyword]);
  const articles = showEmpty ? [] : filteredArticles;
  const totalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));
  const pageArticles = articles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );

  return (
    <section className="article-demo" aria-labelledby="article-demo-heading">
      <h2 id="article-demo-heading">Danh sách bài viết — dữ liệu mẫu</h2>
     
      <div className="article-demo__toolbar">
        <button
          type="button"
          aria-pressed={showEmpty}
          onClick={() => {
            setShowEmpty((value) => !value);
            setCurrentPage(1);
          }}
        >
          {showEmpty ? 'Hiển thị dữ liệu mẫu' : 'Kiểm tra danh sách rỗng'}
        </button>
        <label>
          Chuyên mục
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setCurrentPage(1);
            }}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          Từ khóa
          <input
            type="search"
            value={keyword}
            onChange={(event) => {
              setKeyword(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Tìm trong tiêu đề, mô tả"
          />
        </label>
        <span role="status">{articles.length} bài viết</span>
      </div>
      <ArticleList articles={pageArticles} featuredFirst activeId={pageArticles[1]?.id} />
      {!showEmpty && articles.length > 0 && (
        <NewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}
