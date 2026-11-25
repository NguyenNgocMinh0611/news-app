import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/Store";
import { addToHistory, removeFromHistory, clearHistory } from "@/store/slice/ReadingHistorySlice";
import type { ReadingHistoryItem } from "@/store/slice/ReadingHistorySlice";

interface UseReadingHistoryReturn {
  history: ReadingHistoryItem[];
  addArticle: (article: Omit<ReadingHistoryItem, "readAt" | "readCount">) => void;
  removeArticle: (articleId: string) => void;
  clearAll: () => void;
  isInHistory: (articleId: string) => boolean;
  getReadCount: (articleId: string) => number;
  historyCount: number;
}

export function useReadingHistory(): UseReadingHistoryReturn {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.readingHistory.history);

  const addArticle = useCallback((article: Omit<ReadingHistoryItem, "readAt" | "readCount">): void => {
    dispatch(addToHistory(article));
  }, [dispatch]);

  const removeArticle = useCallback((articleId: string): void => {
    dispatch(removeFromHistory(articleId));
  }, [dispatch]);

  const clearAll = useCallback((): void => {
    dispatch(clearHistory());
  }, [dispatch]);

  const isInHistory = (articleId: string): boolean => {
    return history.some((item) => item.id === articleId);
  };

  const getReadCount = (articleId: string): number => {
    const item = history.find((item) => item.id === articleId);
    return item?.readCount ?? 0;
  };

  return {
    history,
    addArticle,
    removeArticle,
    clearAll,
    isInHistory,
    getReadCount,
    historyCount: history.length,
  };
}
