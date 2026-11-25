import { useEffect } from "react";
import {
  getFacebookShareUrl,
  getTwitterShareUrl,
  getLinkedInShareUrl,
  copyToClipboard,
} from "../utils/shareUrls";
import "@/styles/ShareModal.scss";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  onCopySuccess?: () => void;
}

export function ShareModal({
  isOpen,
  onClose,
  url,
  title,
  onCopySuccess,
}: ShareModalProps) {
  // Đóng modal khi nhấn ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleShare = (platform: "facebook" | "twitter" | "linkedin") => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = getFacebookShareUrl(url);
        break;
      case "twitter":
        shareUrl = getTwitterShareUrl(url, title);
        break;
      case "linkedin":
        shareUrl = getLinkedInShareUrl(url);
        break;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(url);
    
    if (success) {
      onCopySuccess?.();
      onClose();
    } else {
      alert("Không thể copy link. Vui lòng thử lại.");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="share-modal-overlay" onClick={handleOverlayClick}>
      <div className="share-modal" role="dialog" aria-modal="true" aria-labelledby="share-modal-title">
        <div className="share-modal__header">
          <h2 id="share-modal-title" className="share-modal__title">
            Chia sẻ bài viết
          </h2>
          <button
            type="button"
            className="share-modal__close"
            onClick={onClose}
            aria-label="Đóng"
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
        </div>

        <div className="share-modal__body">
          <p className="share-modal__description">
            Chọn nền tảng để chia sẻ bài viết này
          </p>

          <div className="share-modal__options">
            <button
              type="button"
              className="share-option share-option--facebook"
              onClick={() => handleShare("facebook")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>

            <button
              type="button"
              className="share-option share-option--twitter"
              onClick={() => handleShare("twitter")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              <span>Twitter</span>
            </button>

            <button
              type="button"
              className="share-option share-option--linkedin"
              onClick={() => handleShare("linkedin")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </button>

            <button
              type="button"
              className="share-option share-option--copy"
              onClick={handleCopyLink}
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
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copy link</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
