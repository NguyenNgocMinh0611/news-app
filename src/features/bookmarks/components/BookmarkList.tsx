import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "@/store/Store";
import { BookmarkButton } from "./BookmarkButton";
import { toArticleId } from "@/features/news/components/NewsCard";
import "@/styles/BookmarkList.scss";

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function BookmarkList() {
  const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);

  if (bookmarks.length === 0) {
    return (
      <div className="bookmark-list bookmark-list--empty">
        <div className="bookmark-list__empty-state">
          <svg
            className="bookmark-list__empty-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <h2 className="bookmark-list__empty-title">Chưa có bài viết nào được lưu</h2>
          <p className="bookmark-list__empty-description">
            Nhấn vào icon dấu trang trên bài viết để lưu và xem lại sau
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bookmark-list">
      <div className="bookmark-list__header">
        <h1 className="bookmark-list__title">Bài viết đã lưu</h1>
        <p className="bookmark-list__count">{bookmarks.length} bài viết</p>
      </div>
      <div className="bookmark-list__grid">
        {bookmarks.map((bookmark) => {
          const articleId = toArticleId(bookmark.link);
          const bookmarkedDate = new Date(bookmark.bookmarkedAt);

          return (
            <article key={bookmark.id} className="bookmark-card">
              {bookmark.image && (
                <Link
                  className="bookmark-card__thumb"
                  to={`/article/${articleId}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    className="bookmark-card__image"
                    src={bookmark.image}
                    alt=""
                    loading="lazy"
                  />
                </Link>
              )}
              <div className="bookmark-card__body">
                <div className="bookmark-card__header">
                  {bookmark.category && (
                    <span className="bookmark-card__category">{bookmark.category}</span>
                  )}
                  <BookmarkButton
                    articleId={bookmark.id}
                    title={bookmark.title}
                    link={bookmark.link}
                    description={bookmark.description}
                    image={bookmark.image}
                    category={bookmark.category}
                    pubDate={bookmark.pubDate}
                    variant="icon"
                    className="bookmark-card__bookmark-btn"
                  />
                </div>
                <h3 className="bookmark-card__title">
                  <Link to={`/article/${articleId}`}>{bookmark.title}</Link>
                </h3>
                {bookmark.description && (
                  <p className="bookmark-card__description">{bookmark.description}</p>
                )}
                <div className="bookmark-card__footer">
                  {bookmark.pubDate && (
                    <time className="bookmark-card__date" dateTime={bookmark.pubDate}>
                      {dateFormatter.format(new Date(bookmark.pubDate))}
                    </time>
                  )}
                  <span className="bookmark-card__saved-at">
                    Đã lưu: {dateFormatter.format(bookmarkedDate)}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
