import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRss } from '@/services/rss';
import type { Article } from '@/features/news/types';
import { fromArticleId } from '@/features/news/components/NewsCard';

interface ArticleDetailState {
  article: Article | null;
  loading: boolean;
  error: string | null;
}

// bài viết chi tiết khi nhấn vào thì là vẫn ở trang mình chứ không nhảy qua trang của ngta
export function useArticleDetail(): ArticleDetailState & { retry: () => void } {
  const { articleId } = useParams<{ articleId: string }>();
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<ArticleDetailState>({
    article: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!articleId) {
      setState({ article: null, loading: false, error: 'Không tìm thấy bài viết.' });
      return;
    }

    const link = fromArticleId(articleId);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    let active = true;

    setState({ article: null, loading: true, error: null });

    (async () => {
      try {
        const { RSS_FEEDS } = await import('@/features/news/data/rssFeeds');

        for (const feed of RSS_FEEDS) {
          try {
            const articles = await fetchRss(feed.file, feed.category, controller.signal);
            const found = articles.find((a) => a.link === link);
            if (found && active) {
              setState({ article: found, loading: false, error: null });
              return;
            }
          } catch {
            // Bỏ qua feed lỗi, thử feed tiếp theo
          }
        }

        if (active) {
          setState({
            article: null,
            loading: false,
            error: 'Không tìm thấy bài viết.',
          });
        }
      } catch {
        if (active) {
          setState({
            article: null,
            loading: false,
            error: 'Không tải được bài viết. Vui lòng thử lại.',
          });
        }
      } finally {
        window.clearTimeout(timeout);
      }
    })();

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [articleId, attempt]);

  return { ...state, retry: () => setAttempt((v) => v + 1) };
}
