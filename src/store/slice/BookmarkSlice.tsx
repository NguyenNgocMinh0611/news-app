import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface BookmarkedArticle {
  id: string;  
  title: string;
  link: string;
  description?: string;
  image?: string;
  category?: string;
  pubDate?: string;
  bookmarkedAt: string;  
}

interface BookmarkState {
  bookmarks: BookmarkedArticle[];
}

const STORAGE_KEY = "news_app_bookmarks";

// Load bookmarks từ localStorage
function loadBookmarksFromStorage(): BookmarkedArticle[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load bookmarks from localStorage:", error);
  }
  return [];
}

// Save bookmarks vào localStorage
function saveBookmarksToStorage(bookmarks: BookmarkedArticle[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error("Failed to save bookmarks to localStorage:", error);
  }
}

const initialState: BookmarkState = {
  bookmarks: loadBookmarksFromStorage(),
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<Omit<BookmarkedArticle, "bookmarkedAt">>) => {
      // Kiểm tra xem đã bookmark chưa
      const exists = state.bookmarks.some((b) => b.id === action.payload.id);
      if (!exists) {
        const newBookmark: BookmarkedArticle = {
          ...action.payload,
          bookmarkedAt: new Date().toISOString(),
        };
        state.bookmarks.unshift(newBookmark); // Thêm vào đầu danh sách
        saveBookmarksToStorage(state.bookmarks);
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter((b) => b.id !== action.payload);
      saveBookmarksToStorage(state.bookmarks);
    },
    clearAllBookmarks: (state) => {
      state.bookmarks = [];
      saveBookmarksToStorage([]);
    },
  },
});

export const { addBookmark, removeBookmark, clearAllBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
