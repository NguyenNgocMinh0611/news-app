import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockArticles } from '../data/mockArticles.ts';
import { ArticleList } from './ArticleList.tsx';
import { CategoryTabs } from './CategoryTabs.tsx';
import { NewsPagination } from './NewsPagination.tsx';
import '@/styles/ArticleListDemo.scss';

const ARTICLES_PER_PAGE = 2;

export function ArticleListDemo() {
  const [showEmpty, setShowEmpty] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');

  const categories = useMemo(
    () => [...new Set(mockArticles.flatMap((article) => article.category ? [article.category] : []))],
    [],
  );
  const requestedCategory = searchParams.get('category') ?? '';
  const category = categories.includes(requestedCategory) ? requestedCategory : '';

  const setCurrentPage = (page: number) => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (page === 1) next.delete('page');
      else next.set('page', String(page));
      return next;
    });
  };

  const changeCategory = (nextCategory: string) => {
    if (nextCategory === category) return;
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (nextCategory) next.set('category', nextCategory);
      else next.delete('category');
      next.delete('page');
      return next;
    });
  };
  const filteredArticles = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLocaleLowerCase();

    return mockArticles.filter((article) => {
      const matchesCategory = !category || article.category === category;
      const matchesKeyword =
        !normalizedKeyword ||
        `${article.title} ${article.description}`.toLocaleLowerCase().includes(normalizedKeyword);
      return matchesCategory && matchesKeyword;
    });
  }, [category, keyword]);
  const articles = showEmpty ? [] : filteredArticles;
  const totalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));
  const requestedPage = Number(searchParams.get('page') ?? 1);
  const currentPage = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages)
    : 1;
  const pageArticles = articles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );

  return (
    <section className="article-demo" aria-labelledby="article-demo-heading">
      <h2 id="article-demo-heading">Danh sách bài viết — dữ liệu mẫu</h2>
      <CategoryTabs
        categories={categories}
        selectedCategory={category}
        onCategoryChange={changeCategory}
      />
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
