import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  keyword: string;
  recentKeywords: string[];
}

const STORAGE_KEY = "recentKeywords";
const MAX_RECENT = 10;

function loadRecentFromStorage(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.reduce<string[]>((keywords, item) => {
      if (typeof item !== "string") return keywords;

      const keyword = item.trim();
      if (!keyword || keywords.some((item) => item.toLowerCase() === keyword.toLowerCase())) {
        return keywords;
      }

      return [...keywords, keyword].slice(0, MAX_RECENT);
    }, []);
  } catch {
    return [];
  }
}

function saveRecentToStorage(keywords: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  } catch {}
}

const initialState: SearchState = {
  keyword: "",
  recentKeywords: loadRecentFromStorage(),
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    clearKeyword: (state) => {
      state.keyword = "";
    },
    addRecentKeyword: (state, action: PayloadAction<string>) => {
      const kw = action.payload.trim();
      if (!kw) return;
      const filtered = state.recentKeywords.filter(
        (k) => k.toLowerCase() !== kw.toLowerCase(),
      );
      state.recentKeywords = [kw, ...filtered].slice(0, MAX_RECENT);
      saveRecentToStorage(state.recentKeywords);
    },
    removeRecentKeyword: (state, action: PayloadAction<string>) => {
      const keywordToRemove = action.payload.toLowerCase();
      state.recentKeywords = state.recentKeywords.filter(
        (keyword) => keyword.toLowerCase() !== keywordToRemove,
      );
      saveRecentToStorage(state.recentKeywords);
    },
    clearRecentKeywords: (state) => {
      state.recentKeywords = [];
      saveRecentToStorage(state.recentKeywords);
    },
  },
});

export const {
  setKeyword,
  clearKeyword,
  addRecentKeyword,
  removeRecentKeyword,
  clearRecentKeywords,
} = searchSlice.actions;
export default searchSlice.reducer;
