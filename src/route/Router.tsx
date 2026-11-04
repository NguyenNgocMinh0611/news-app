import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/Home.tsx";
import ArticleDetailPage from "@/pages/articles/ArticleDetailPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Trang không tồn tại</div>,
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
