import { Header } from '@news/components/layout/Header';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <div className="app__container">
          {/* Page content will go here */}
          <p style={{ padding: '40px 0', textAlign: 'center', color: '#666' }}>
            Nội dung trang sẽ hiển thị tại đây.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
