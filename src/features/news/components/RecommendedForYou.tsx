import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/Store';
import { useRssArticles } from '@/hooks/useRssArticles';
import { ArticleList } from './ArticleList';
import '@/styles/RecommendedForYou.scss';

const MAX_RECOMMENDATIONS = 6;

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLocaleLowerCase()
    .trim();
}
function categoryMatches(articleCategory: string | undefined, preferredCategory: string) {
  if (!articleCategory || !preferredCategory) return false;
  const article = normalizeText(articleCategory);
  const preferred = normalizeText(preferredCategory);
  return article === preferred || article.includes(preferred) || preferred.includes(article);
}

export function RecommendedForYou() {
  const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);
  const history = useSelector((state: RootState) => state.readingHistory.history);
  const { articles, loading, error, retry } = useRssArticles('home.rss', '');
  const recommendations = useMemo(() => {
    const historyIds = new Set(history.map((item) => item.id));
    const preferredCategories = new Map<string, number>();
    bookmarks.forEach((item) => {
      if (item.category) {
        preferredCategories.set(item.category, (preferredCategories.get(item.category) ?? 0) + 3);
      }
    });
    history.forEach((item) => {
      if (item.category) {
        preferredCategories.set(
          item.category,
          (preferredCategories.get(item.category) ?? 0) + (2 * item.readCount),
        );
      }
    });

    const ranked = articles
      .filter((article) => {
        const articleId = encodeURIComponent(article.link);
        return !historyIds.has(articleId);
      })
      .map((article, index) => {
        let score = 0;
        preferredCategories.forEach((weight, category) => {
          if (categoryMatches(article.category, category)) score += weight;
        });

        const recentBonus = Math.max(0, 20 - index);
        return { article, score: score + recentBonus };
      })
      .sort((a, b) => b.score - a.score);

    const selected = ranked.length > 0
      ? ranked.slice(0, MAX_RECOMMENDATIONS).map(({ article }) => article)
      : articles.slice(0, MAX_RECOMMENDATIONS);

    return selected.filter(
      (article, index, all) => all.findIndex((item) => item.link === article.link) === index,
    );
  }, [articles, bookmarks, history]);

  return (
    <section className="recommended-for-you" aria-labelledby="recommended-for-you-heading">
      <div className="recommended-for-you__heading">
        <div>
          <p className="recommended-for-you__eyebrow">Đề xuất cho bạn</p>
          <h2 id="recommended-for-you-heading">Recommended For You</h2>
        </div>
      </div>
      {loading && <p role="status">Đang tìm bài phù hợp…</p>}
      {error && (
        <div className="recommended-for-you__error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={retry}>Thử lại</button>
        </div>
      )}
      {!loading && !error && recommendations.length > 0 && (
        <ArticleList articles={recommendations} />
      )}
      {!loading && !error && recommendations.length === 0 && (
        <p role="status">Chưa có bài đề xuất phù hợp.</p>
      )}
    </section>
  );
}
