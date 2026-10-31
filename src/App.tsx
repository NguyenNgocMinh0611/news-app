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
    </div>
  );
}

export default App;
