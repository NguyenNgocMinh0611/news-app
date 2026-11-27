import { createBrowserRouter } from "react-router-dom";
import { Home, HomePage } from "@/pages/Home.tsx";
import ArticleDetailPage from "@/pages/articles/ArticleDetailPage.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import { CategoryPage } from "@/pages/CategoryPage.tsx";
import { SearchResultsPage } from "@/pages/SearchResultsPage.tsx";
import { BookmarksPage } from "@/pages/BookmarksPage.tsx";
import { ReadingHistoryPage } from "@/pages/ReadingHistoryPage.tsx";
import { ProfilePage } from "@/pages/ProfilePage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "article/:articleId",
        element: <ArticleDetailPage />,
      },
      {
        path: "category/:slug",
        element: <CategoryPage />,
      },
      {
        path: "search",
        element: <SearchResultsPage />,
      },
      {
        path: "bookmarks",
        element: <BookmarksPage />,
      },
      {
        path: "history",
        element: <ReadingHistoryPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
