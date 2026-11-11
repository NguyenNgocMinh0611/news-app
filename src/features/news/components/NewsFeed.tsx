import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/Store';
import { getRssFeed } from '../data/rssFeeds.ts';
import { useRssArticles } from '@/hooks/useRssArticles';
import { ArticleList } from './ArticleList.tsx';
import { NewsPagination } from './NewsPagination.tsx';
import '@/styles/NewsFeed.scss';

const ARTICLES_PER_PAGE = 10;

export function NewsFeed() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = useSelector((state: RootState) => state.search.keyword);

  const requestedCategory = searchParams.get('category') ?? '';
  const feed = getRssFeed(requestedCategory);
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

    return feedArticles.filter((article) => {
      const matchesKeyword =
        !normalizedKeyword ||
        `${article.title} ${article.description}`.toLocaleLowerCase().includes(normalizedKeyword);
      return matchesKeyword;
    });
  }, [feedArticles, keyword]);
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

  return (
    <section className="news-feed" aria-labelledby="news-feed-heading">
      <h2 id="news-feed-heading">{category || 'Tin mới nhất'}</h2>
      {loading && <p role="status">Đang tải tin RSS…</p>}
      {error && (
        <div className="news-feed__toolbar">
          <p role="alert">{error}</p>
          <button type="button" onClick={retry}>Thử lại</button>
        </div>
      )}
      {!loading && !error && articles.length === 0 && keyword.trim() && (
        <p role="status">Không tìm thấy bài viết phù hợp.</p>
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
