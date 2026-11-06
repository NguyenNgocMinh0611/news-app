import { Link } from "react-router-dom";
import "@/styles/error.scss";

export default function ErrorPage() {
  return (
    <main className="error-page">
      <div className="error-page__box">
        <h1 className="error-page__code">404</h1>
        <p className="error-page__title">Trang không tồn tại</p>
        <p className="error-page__desc">
          Trang bạn tìm kiếm không thể tìm thấy hoặc đã bị di chuyển.
        </p>
        <Link to="/">
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
