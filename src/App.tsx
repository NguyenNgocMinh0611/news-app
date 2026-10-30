import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import ArticleDetailPage from "./pages/articles/ArticleDetailPage";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <div className="app__container"></div>
      </main>
      <Routes>
        <Route path="/bai-viet/:slug" element={<ArticleDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
