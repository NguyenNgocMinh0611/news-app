import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article } from "@/types/article";
import { articles as mockArticles } from "@/data/articles/articles";

interface ArticleListState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticleListState = {
  articles: mockArticles,
  loading: false,
  error: null,
};

const articleListSlice = createSlice({
  name: "articleList",
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
    addArticle: (state, action: PayloadAction<Article>) => {
      state.articles.push(action.payload);
    },
    removeArticle: (state, action: PayloadAction<number>) => {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setArticles,
  addArticle,
  removeArticle,
  setLoading,
  setError,
} = articleListSlice.actions;

export default articleListSlice.reducer;
