
export function getFacebookShareUrl(url: string): string {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
}


export function getTwitterShareUrl(url: string, title: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
}


export function getLinkedInShareUrl(url: string): string {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      document.body.removeChild(textArea);
      console.error("Fallback: Could not copy text", err);
      return false;
    }
  } catch (err) {
    console.error("Failed to copy text to clipboard", err);
    return false;
  }
}


export function getFullArticleUrl(articlePath: string): string {
  if (typeof window === "undefined") {
    return articlePath;
  }
  
  if (articlePath.startsWith("http://") || articlePath.startsWith("https://")) {
    return articlePath;
  }
  
  const origin = window.location.origin;
  const path = articlePath.startsWith("/") ? articlePath : `/${articlePath}`;
  return `${origin}${path}`;
}
