import { useEffect, useMemo, useState } from 'react';
import { RSS_FEEDS, toRssCategorySlug } from '@/features/news/data/rssFeeds';
import type { Article } from '@/features/news/types';
import { fetchRss } from '@/services/rss';

export interface PopularTopic {
  label: string;
  count: number;
  href: string;
}
interface PopularTopicsProps {
  articles?: Article[];
  loading?: boolean;
}
export default function PopularTopics({
  articles: providedArticles,
  loading: providedLoading,
}: PopularTopicsProps) {
  const [rssArticles, setRssArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(providedArticles === undefined);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (providedArticles !== undefined) return;
    const controller = new AbortController();
    const uniqueFeeds = Array.from(
      new Map(RSS_FEEDS.map((feed) => [feed.file, feed])).values(),
    );
    setLoading(true);
    setError(null);
    Promise.all(
      uniqueFeeds.map((feed) =>
        fetchRss(feed.file, feed.category, controller.signal).catch(() => []),
      ),
    )
      .then((feedArticles) => {
        if (!controller.signal.aborted) {
          setRssArticles(feedArticles.flat());
          setLoading(false);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError('Không thể thống kê chủ đề từ RSS.');
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [providedArticles]);
  const topics = useMemo<PopularTopic[]>(() => {
    const sourceArticles = providedArticles ?? rssArticles;
    const counts = new Map<string, number>();

    sourceArticles.forEach((article) => {
      const category = article.category?.replace(/\s+/g, ' ').trim();
      if (!category) return;

      const normalizedCategory = category.normalize('NFC');
      const key = normalizedCategory.toLocaleLowerCase('vi-VN');
      const existingCount = counts.get(key) ?? 0;
      counts.set(key, existingCount + 1);
    });

    const displayLabels = new Map<string, string>();
    sourceArticles.forEach((article) => {
      const category = article.category?.replace(/\s+/g, ' ').trim();
      if (!category) return;
      const key = category.normalize('NFC').toLocaleLowerCase('vi-VN');
      if (!displayLabels.has(key)) displayLabels.set(key, category);
    });

    return Array.from(counts.entries())
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10)
      .map(([key, count]) => ({
        label: displayLabels.get(key) ?? key,
        count,
        href: `/category/${toRssCategorySlug(displayLabels.get(key) ?? key)}`,
      }));
  }, [providedArticles, rssArticles]);

  return (
    <section className="popular-topics" aria-labelledby="popular-topics-heading">
      <h2 className="popular-topics__header" id="popular-topics-heading">
        CHỦ ĐỀ NỔI BẬT
      </h2>
      {(providedLoading ?? loading) ? (
        <p className="popular-topics__status" role="status">Đang thống kê chủ đề…</p>
      ) : error ? (
        <p className="popular-topics__status" role="alert">{error}</p>
      ) : topics.length > 0 ? (
        <ul className="popular-topics__list">
          {topics.map((topic) => (
            <li className="popular-topics__item" key={topic.label}>
              <a className="popular-topics__link" href={topic.href}>
                <span className="popular-topics__label">{topic.label.toLocaleUpperCase('vi-VN')}</span>
                <span className="popular-topics__count" aria-label={`${topic.count} bài viết`}>
                  {topic.count.toLocaleString('vi-VN')}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="popular-topics__status">Không có dữ liệu chủ đề.</p>
      )}
    </section>
  );
}
