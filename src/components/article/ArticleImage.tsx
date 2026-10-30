interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string | null;
  className?: string;
}
export default function ArticleImage({ src, alt, caption, className = ""}: ArticleImageProps) {
  return (
    <figure className={`article-image ${className}`.trim()}>
      <img className="article-image__img" src={src} alt={alt}
        loading="lazy" decoding="async" />
      {caption?.trim() && (
        <figcaption className="article-image__caption">{caption}</figcaption>
      )}
    </figure>
  );
}
