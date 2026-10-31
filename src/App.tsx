import { Route, Routes } from "react-router-dom";
import ArticleDetailPage from "./pages/articles/ArticleDetailPage";
import { Header } from './components/layout/Header';
import { ArticleListDemo } from '@/features/news/components/ArticleListDemo';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <div className="app__container">
          <ArticleListDemo />
        </div>
      </main>
      <Routes>
        <Route path="/bai-viet/:slug" element={<ArticleDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
