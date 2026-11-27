import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArticleList } from '@/features/news/components/ArticleList';
import { NewsPagination } from '@/features/news/components/NewsPagination';
import { ArticleFilterBar } from '@/features/news/components/ArticleFilterBar';
import { filterArticles, type TimePeriod } from '@/features/news/utils/articleFilters';
import { getRssFeed } from '@/features/news/data/rssFeeds';
import { useRssArticles } from '@/hooks/useRssArticles';
import '@/styles/SearchResultsPage.scss';

const ARTICLES_PER_PAGE = 10;

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const category = searchParams.get('filterCategory') ?? '';
  const periodParam = searchParams.get('period') ?? 'all';
  const period: TimePeriod = ['all', 'today', '7days', 'month', 'date', 'range'].includes(periodParam)
    ? periodParam as TimePeriod
    : 'all';
  const date = searchParams.get('date') ?? '';
  const startDate = searchParams.get('from') ?? '';
  const endDate = searchParams.get('to') ?? '';
  const feed = getRssFeed(category);
  const { articles, loading, error, retry } = useRssArticles(feed.file, feed.category);

  const results = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase();
    if (!normalizedQuery) return [];

    const searched = articles.filter((article) =>
      `${article.title} ${article.description}`.toLocaleLowerCase().includes(normalizedQuery),
    );
    return filterArticles(searched, { period, date, startDate, endDate });
  }, [articles, query, period, date, startDate, endDate]);

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

  const updateFilters = (filters: {
    period: TimePeriod;
    category: string;
    date: string;
    startDate: string;
    endDate: string;
  }) => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (filters.period === 'all') next.delete('period');
      else next.set('period', filters.period);
      if (filters.category) next.set('filterCategory', filters.category);
      else next.delete('filterCategory');
      if (filters.date) next.set('date', filters.date);
      else next.delete('date');
      if (filters.startDate) next.set('from', filters.startDate);
      else next.delete('from');
      if (filters.endDate) next.set('to', filters.endDate);
      else next.delete('to');
      next.delete('author');
      next.delete('page');
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
      {!loading && !error && (
        <ArticleFilterBar
          period={period}
          category={category}
          date={date}
          startDate={startDate}
          endDate={endDate}
          onChange={updateFilters}
        />
      )}
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

