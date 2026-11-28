import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getRssFeed, getRssFeedBySlug } from '@/features/news/data/rssFeeds';
import { getChildCategoryFilterGroups } from '@/features/news/utils/articleFilters';
import { useRssArticles } from '@/hooks/useRssArticles';
import { ArticleList } from '@/features/news/components/ArticleList';
import { NewsPagination } from '@/features/news/components/NewsPagination';
import { ArticleFilterBar } from '@/features/news/components/ArticleFilterBar';
import { filterArticles, type TimePeriod } from '@/features/news/utils/articleFilters';
import '@/styles/CategoryPage.scss';

const ARTICLES_PER_PAGE = 10;

export function CategoryPage() {
  const { slug = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const feed = getRssFeedBySlug(slug);
  const categoryGroups = getChildCategoryFilterGroups(feed?.category ?? '');
  const childCategories = new Set(categoryGroups.flatMap((group) => group.categories));
  const requestedFilterCategory = searchParams.get('filterCategory') ?? '';
  const filterCategory = childCategories.has(requestedFilterCategory) ? requestedFilterCategory : '';
  const periodParam = searchParams.get('period') ?? 'all';
  const period: TimePeriod = ['all', 'today', '7days', 'month', 'date', 'range'].includes(periodParam)
    ? periodParam as TimePeriod
    : 'all';
  const date = searchParams.get('date') ?? '';
  const startDate = searchParams.get('from') ?? '';
  const endDate = searchParams.get('to') ?? '';
  const keyword = searchParams.get('keyword') ?? '';
  const requestedPage = Number(searchParams.get('page') ?? 1);
  const activeFeed = filterCategory ? getRssFeed(filterCategory) : feed;
  const { articles, loading, error, retry } = useRssArticles(
    activeFeed?.file ?? '',
    activeFeed?.category ?? '',
  );

  const filteredArticles = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLocaleLowerCase();
    const searched = normalizedKeyword
      ? articles.filter((article) =>
          `${article.title} ${article.description}`.toLocaleLowerCase().includes(normalizedKeyword),
        )
      : articles;
    return filterArticles(searched, { period, date, startDate, endDate });
  }, [articles, keyword, period, date, startDate, endDate]);
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const currentPage = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages)
    : 1;
  const pageArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );

  const updateParams = (updates: { keyword?: string; page?: number }) => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (updates.keyword !== undefined) {
        if (updates.keyword) next.set('keyword', updates.keyword);
        else next.delete('keyword');
      }
      if (updates.page !== undefined) {
        if (updates.page === 1) next.delete('page');
        else next.set('page', String(updates.page));
      }
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

  if (!feed) {
    return (
      <main className="category-page">
        <h1>Không tìm thấy </h1>
        <p role="status">  không tồn tại.</p>
      </main>
    );
  }

  return (
    <main className="category-page">
      <header className="category-page__header">
        <h1>{activeFeed?.category ?? feed.category}</h1>
        <label>
          Từ khóa
          <input
            type="search"
            value={keyword}
            onChange={(event) => updateParams({ keyword: event.target.value, page: 1 })}
            placeholder="Tìm trong chuyên mục"
          />
        </label>
      </header>
      {!loading && !error && (
        <ArticleFilterBar
          period={period}
          category={filterCategory}
          date={date}
          startDate={startDate}
          endDate={endDate}
          categoryGroups={categoryGroups}
          onChange={updateFilters}
        />
      )}
      {loading && <p role="status">Đang tải tin RSS…</p>}
      {error && (
        <div className="category-page__error">
          <p role="alert">{error}</p>
          <button type="button" onClick={retry}>Thử lại</button>
        </div>
      )}
      {!loading && !error && <ArticleList articles={pageArticles} featuredFirst />}
      {!loading && !error && filteredArticles.length > 0 && (
        <NewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => updateParams({ page })}
        />
      )}
    </main>
  );
}
