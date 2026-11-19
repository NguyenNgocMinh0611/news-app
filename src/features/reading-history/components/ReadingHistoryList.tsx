import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "@/store/Store";
import { removeFromHistory, clearHistory } from "@/store/slice/ReadingHistorySlice";
import { toArticleId } from "@/features/news/components/NewsCard";
import "@/styles/ReadingHistoryList.scss";

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const relativeTimeFormatter = new Intl.RelativeTimeFormat("vi-VN", { numeric: "auto" });

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Vừa xem";
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return relativeTimeFormatter.format(-minutes, "minute");
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return relativeTimeFormatter.format(-hours, "hour");
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return relativeTimeFormatter.format(-days, "day");
  }
  return dateFormatter.format(date);
}

export function ReadingHistoryList() {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.readingHistory.history);

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Bạn có chắc muốn xóa bài viết này khỏi lịch sử?")) {
      dispatch(removeFromHistory(id));
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Bạn có chắc muốn xóa toàn bộ lịch sử đọc?")) {
      dispatch(clearHistory());
    }
  };

  if (history.length === 0) {
    return (
      <div className="reading-history reading-history--empty">
        <div className="reading-history__empty-state">
          <svg
            className="reading-history__empty-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <h2 className="reading-history__empty-title">Chưa có lịch sử đọc</h2>
          <p className="reading-history__empty-description">
            Các bài viết bạn đã xem sẽ được lưu lại ở đây để bạn dễ dàng tìm lại
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="reading-history">
      <div className="reading-history__header">
        <div>
          <h1 className="reading-history__title">Lịch sử đọc</h1>
          <p className="reading-history__count">{history.length} bài viết</p>
        </div>
        <button
          type="button"
          className="reading-history__clear-btn"
          onClick={handleClearAll}
        >
          Xóa tất cả
        </button>
      </div>

      <div className="reading-history__list">
        {history.map((item) => {
          const articleId = toArticleId(item.link);

          return (
            <article key={item.id} className="history-card">
              <Link to={`/article/${articleId}`} className="history-card__link">
                {item.image && (
                  <div className="history-card__thumb">
                    <img
                      className="history-card__image"
                      src={item.image}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="history-card__body">
                  <div className="history-card__header">
                    {item.category && (
                      <span className="history-card__category">{item.category}</span>
                    )}
                    <span className="history-card__read-count">
                      Đã đọc {item.readCount} lần
                    </span>
                  </div>
                  <h3 className="history-card__title">{item.title}</h3>
                  {item.description && (
                    <p className="history-card__description">{item.description}</p>
                  )}
                  <div className="history-card__footer">
                    <time className="history-card__time" dateTime={item.readAt}>
                      {getRelativeTime(item.readAt)}
                    </time>
                    {item.pubDate && (
                      <span className="history-card__pub-date">
                        Xuất bản: {dateFormatter.format(new Date(item.pubDate))}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              <button
                type="button"
                className="history-card__remove-btn"
                onClick={(e) => handleRemove(item.id, e)}
                aria-label="Xóa khỏi lịch sử"
                title="Xóa khỏi lịch sử"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
