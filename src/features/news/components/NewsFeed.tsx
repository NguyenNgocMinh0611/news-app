import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/Store';
import { getRssFeed } from '../data/rssFeeds.ts';
import { useRssArticles } from '@/hooks/useRssArticles';
import { ArticleList } from './ArticleList.tsx';
import { NewsPagination } from './NewsPagination.tsx';
import { RecommendedForYou } from './RecommendedForYou.tsx';
import { ArticleFilterBar } from './ArticleFilterBar';
import { filterArticles, type TimePeriod } from '../utils/articleFilters';
import '@/styles/NewsFeed.scss';

const ARTICLES_PER_PAGE = 10;

export function NewsFeed() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = useSelector((state: RootState) => state.search.keyword);

  const requestedCategory = searchParams.get('category') ?? '';
  const filterCategory = searchParams.get('filterCategory') ?? '';
  const periodParam = searchParams.get('period') ?? 'all';
  const period: TimePeriod = ['all', 'today', '7days', 'month', 'date', 'range'].includes(periodParam)
    ? periodParam as TimePeriod
    : 'all';
  const date = searchParams.get('date') ?? '';
  const startDate = searchParams.get('from') ?? '';
  const endDate = searchParams.get('to') ?? '';
  const feed = getRssFeed(filterCategory || requestedCategory);
  const category = feed.category;
  const { articles: feedArticles, loading, error, retry } = useRssArticles(feed.file, category);

  const setCurrentPage = (page: number) => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (page === 1) next.delete('page');
      else next.set('page', String(page));
      return next;
    });
  };

  const filteredArticles = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLocaleLowerCase();

    const filtered = feedArticles.filter((article) => {
      const matchesKeyword =
        !normalizedKeyword ||
        `${article.title} ${article.description}`.toLocaleLowerCase().includes(normalizedKeyword);
      return matchesKeyword;
    });
    return filterArticles(filtered, { period, date, startDate, endDate });
  }, [feedArticles, keyword, period, date, startDate, endDate]);
  const articles = filteredArticles;
  const totalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));
  const requestedPage = Number(searchParams.get('page') ?? 1);
  const currentPage = Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages)
    : 1;
  const pageArticles = articles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );
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
    <section className="news-feed" aria-labelledby="news-feed-heading">
      {!requestedCategory && <RecommendedForYou />}
      <h2 id="news-feed-heading">{category || 'Tin mới nhất'}</h2>
      {!loading && !error && (
        <ArticleFilterBar
          period={period}
          category={filterCategory}
          date={date}
          startDate={startDate}
          endDate={endDate}
          onChange={updateFilters}
        />
      )}
      {loading && <p role="status">Đang tải tin RSS…</p>}
      {error && (
        <div className="news-feed__toolbar">
          <p role="alert">{error}</p>
          <button type="button" onClick={retry}>Thử lại</button>
        </div>
      )}
      {!loading && !error && articles.length === 0 && (
        <p role="status">Không có bài viết phù hợp với bộ lọc hiện tại.</p>
      )}
      {!loading && !error && articles.length > 0 && (
        <ArticleList articles={pageArticles} featuredFirst />
      )}
      {!loading && !error && articles.length > 0 && (
        <NewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}
