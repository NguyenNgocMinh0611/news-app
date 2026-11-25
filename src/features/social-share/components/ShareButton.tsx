import { useState } from "react";
import { ShareModal } from "./ShareModal";
import { Toast } from "@/components/common/Toast";
import { getFullArticleUrl } from "../utils/shareUrls";
import "@/styles/ShareButton.scss";

interface ShareButtonProps {
  url: string;
  title: string;
  variant?: "icon" | "button";
  className?: string;
}

export function ShareButton({
  url,
  title,
  variant = "icon",
  className = "",
}: ShareButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCopySuccess = () => {
    setShowToast(true);
  };

  // Đảm bảo URL là full URL
  const fullUrl = getFullArticleUrl(url);

  const buttonClass = [
    "share-button",
    `share-button--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button
        type="button"
        className={buttonClass}
        onClick={handleClick}
        aria-label="Chia sẻ bài viết"
        title="Chia sẻ bài viết"
      >
        <svg
          className="share-button__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        {variant === "button" && (
          <span className="share-button__text">Chia sẻ</span>
        )}
      </button>

      <ShareModal
        isOpen={isModalOpen}
        onClose={handleClose}
        url={fullUrl}
        title={title}
        onCopySuccess={handleCopySuccess}
      />

      {showToast && (
        <Toast
          message="Đã sao chép link bài viết"
          type="success"
          duration={2000}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
