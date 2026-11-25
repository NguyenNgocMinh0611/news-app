import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/Store";
import { addBookmark, removeBookmark } from "@/store/slice/BookmarkSlice";
import "@/styles/BookmarkButton.scss";

interface BookmarkButtonProps {
  articleId: string;  
  title: string;
  link: string;
  description?: string;
  image?: string;
  category?: string;
  pubDate?: string;
  variant?: "icon" | "button";  
  className?: string;
}

export function BookmarkButton({
  articleId,
  title,
  link,
  description,
  image,
  category,
  pubDate,
  variant = "icon",
  className = "",
}: BookmarkButtonProps) {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);
  const isBookmarked = bookmarks.some((b) => b.id === articleId);

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn chặn navigation khi click
    e.stopPropagation();

    if (isBookmarked) {
      dispatch(removeBookmark(articleId));
    } else {
      dispatch(
        addBookmark({
          id: articleId,
          title,
          link,
          description,
          image,
          category,
          pubDate,
        })
      );
    }
  };

  const buttonClass = [
    "bookmark-button",
    `bookmark-button--${variant}`,
    isBookmarked && "bookmark-button--active",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={handleToggleBookmark}
      aria-label={isBookmarked ? "Bỏ lưu bài viết" : "Lưu bài viết"}
      title={isBookmarked ? "Bỏ lưu bài viết" : "Lưu bài viết"}
    >
      <svg
        className="bookmark-button__icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isBookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {variant === "button" && (
        <span className="bookmark-button__text">
          {isBookmarked ? "Đã lưu" : "Lưu bài viết"}
        </span>
      )}
    </button>
  );
}
