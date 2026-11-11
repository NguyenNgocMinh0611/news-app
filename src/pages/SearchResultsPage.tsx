import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArticleList } from '@/features/news/components/ArticleList';
import { NewsPagination } from '@/features/news/components/NewsPagination';
import { useRssArticles } from '@/hooks/useRssArticles';
import '@/styles/SearchResultsPage.scss';

const ARTICLES_PER_PAGE = 10;

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const { articles, loading, error, retry } = useRssArticles('home.rss', '');

  const results = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase();
    if (!normalizedQuery) return [];

    return articles.filter((article) =>
      `${article.title} ${article.description}`.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [articles, query]);

  const totalPages = Math.max(1, Math.ceil(results.length / ARTICLES_PER_PAGE));
  const requestedPage = Number(searchParams.get('page') ?? 1);
  const currentPage = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages)
    : 1;
  const pageArticles = results.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );

  const setCurrentPage = (page: number) => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (page === 1) next.delete('page');
      else next.set('page', String(page));
      return next;
    });
  };

  return (
    <main className="search-results">
      <header className="search-results__header">
        <h1>Kết quả tìm kiếm</h1>
        {query && (
          <p>
            Từ khóa: <strong>“{query}”</strong>
            {!loading && !error && <> · {results.length} kết quả</>}
          </p>
        )}
      </header>

      {!query && <p role="status">Vui lòng nhập từ khóa để tìm kiếm bài viết.</p>}
      {loading && <p role="status">Đang tải tin RSS…</p>}
      {error && (
        <div className="search-results__error">
          <p role="alert">{error}</p>
          <button type="button" onClick={retry}>Thử lại</button>
        </div>
      )}
      {!loading && !error && query && results.length === 0 && (
        <p role="status">Không tìm thấy bài viết  .</p>
      )}
      {!loading && !error && pageArticles.length > 0 && (
        <ArticleList articles={pageArticles} featuredFirst />
      )}
      {!loading && !error && results.length > 0 && (
        <NewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
}

