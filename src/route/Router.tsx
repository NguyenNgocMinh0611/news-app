import { createBrowserRouter } from "react-router-dom";
import { Home, HomePage } from "@/pages/Home.tsx";
import ArticleDetailPage from "@/pages/articles/ArticleDetailPage.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import { CategoryPage } from "@/pages/CategoryPage.tsx";

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
    ],
  },
]);
