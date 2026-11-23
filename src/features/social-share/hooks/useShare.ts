import { useState, useCallback } from "react";
import {
  getFacebookShareUrl,
  getTwitterShareUrl,
  getLinkedInShareUrl,
  copyToClipboard,
} from "../utils/shareUrls";

interface UseShareReturn {
  shareToFacebook: (url: string, title: string) => void;
  shareToTwitter: (url: string, title: string) => void;
  shareToLinkedIn: (url: string) => void;
  copyLink: (url: string) => Promise<boolean>;
  showCopySuccess: boolean;
}

export function useShare(): UseShareReturn {
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const shareToFacebook = useCallback((url: string, _title: string) => {
    const shareUrl = getFacebookShareUrl(url);
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }, []);

  const shareToTwitter = useCallback((url: string, title: string) => {
    const shareUrl = getTwitterShareUrl(url, title);
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }, []);

  const shareToLinkedIn = useCallback((url: string) => {
    const shareUrl = getLinkedInShareUrl(url);
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }, []);

  const copyLink = useCallback(async (url: string): Promise<boolean> => {
    const success = await copyToClipboard(url);
    
    if (success) {
      setShowCopySuccess(true);
      
      setTimeout(() => {
        setShowCopySuccess(false);
      }, 2000);
    }
    
    return success;
  }, []);

  return {
    shareToFacebook,
    shareToTwitter,
    shareToLinkedIn,
    copyLink,
    showCopySuccess,
  };
}
