import { configureStore } from "@reduxjs/toolkit";
import articleListReducer from "@/store/slice/ArticleListSlice";
import searchReducer from "@/store/slice/SearchSlice";
import fontSizeReducer from "@/store/slice/FontSizeSlice";
import darkModeReducer from "@/store/slice/DarkModeSlice";
import authReducer from "@/store/slice/AuthSlice";
import bookmarkReducer from "@/store/slice/BookmarkSlice";

export const store = configureStore({
  reducer: {
    articleList: articleListReducer,
    search: searchReducer,
    fontSize: fontSizeReducer,
    darkMode: darkModeReducer,
    auth: authReducer,
    bookmark: bookmarkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
