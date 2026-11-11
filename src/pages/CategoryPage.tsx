import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getRssFeedBySlug } from '@/features/news/data/rssFeeds';
import { useRssArticles } from '@/hooks/useRssArticles';
import { ArticleList } from '@/features/news/components/ArticleList';
import { NewsPagination } from '@/features/news/components/NewsPagination';
import '@/styles/CategoryPage.scss';

const ARTICLES_PER_PAGE = 10;

export function CategoryPage() {
  const { slug = '' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const feed = getRssFeedBySlug(slug);
  const keyword = searchParams.get('keyword') ?? '';
  const requestedPage = Number(searchParams.get('page') ?? 1);
  const { articles, loading, error, retry } = useRssArticles(
    feed?.file ?? '',
    feed?.category ?? '',
  );

  const filteredArticles = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLocaleLowerCase();
    if (!normalizedKeyword) return articles;

    return articles.filter((article) =>
      `${article.title} ${article.description}`.toLocaleLowerCase().includes(normalizedKeyword),
    );
  }, [articles, keyword]);
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
        <h1>{feed.category}</h1>
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
