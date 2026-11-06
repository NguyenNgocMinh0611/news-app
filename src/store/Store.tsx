import { configureStore } from "@reduxjs/toolkit";
import articleListReducer from "@/store/slice/ArticleListSlice";
import searchReducer from "@/store/slice/SearchSlice";

export const store = configureStore({
  reducer: {
    articleList: articleListReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
