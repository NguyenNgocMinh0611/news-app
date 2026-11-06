import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/Home.tsx";
import ArticleDetailPage from "@/pages/articles/ArticleDetailPage.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "article/:slug",
        element: <ArticleDetailPage />,
      },
      {
        path: "article/:id",
        element: <ArticleDetailPage />,
      },
    ],
  },
]);
