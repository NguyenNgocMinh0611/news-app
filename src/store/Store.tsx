import { configureStore } from "@reduxjs/toolkit";
import articleListReducer from "@/store/slice/ArticleListSlice";

export const store = configureStore({
  reducer: {
    articleList: articleListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
