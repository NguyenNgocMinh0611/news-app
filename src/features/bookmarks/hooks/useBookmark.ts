import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/Store";
import { addBookmark, removeBookmark } from "@/store/slice/BookmarkSlice";
import type { BookmarkedArticle } from "@/store/slice/BookmarkSlice";

interface UseBookmarkReturn {
  bookmarks: BookmarkedArticle[];
  isBookmarked: (articleId: string) => boolean;
  toggleBookmark: (article: Omit<BookmarkedArticle, "bookmarkedAt">) => void;
  bookmarkCount: number;
}

export function useBookmark(): UseBookmarkReturn {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);

  const isBookmarked = (articleId: string): boolean => {
    return bookmarks.some((b) => b.id === articleId);
  };

  const toggleBookmark = (article: Omit<BookmarkedArticle, "bookmarkedAt">): void => {
    if (isBookmarked(article.id)) {
      dispatch(removeBookmark(article.id));
    } else {
      dispatch(addBookmark(article));
    }
  };

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    bookmarkCount: bookmarks.length,
  };
}
