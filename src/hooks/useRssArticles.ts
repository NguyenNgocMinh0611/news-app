import { useEffect, useMemo, useState } from 'react';
import { fetchRss } from '@/services/rss';
import type { Article } from '@/features/news/types';

interface FeedState {
  request: object | null;
  articles: Article[];
  loading: boolean;
  error: string | null;
}

export function useRssArticles(file: string, category: string) {
  const [attempt, setAttempt] = useState(0);
  const request = useMemo(() => ({ file, category, attempt }), [file, category, attempt]);
  const [state, setState] = useState<FeedState>({ request: null, articles: [], loading: true, error: null });

  useEffect(() => {
    if (!file) return undefined;

    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    fetchRss(file, category, controller.signal)
      .then((articles) => {
        if (active) setState({ request, articles, loading: false, error: null });
      })
      .catch(() => {
        if (active) setState({
          request, articles: [], loading: false,
          error: 'Không tải được tin  . Vui lòng thử lại.',
        });
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [file, category, request]);

  const current = state.request === request ? state : { articles: [], loading: true, error: null };
  return { ...current, retry: () => setAttempt((value) => value + 1) };
}
