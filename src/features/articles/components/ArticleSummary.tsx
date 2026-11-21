import type { Article, ArticleContentBlock } from '@/types/article';

interface ArticleSummaryProps {
  article: Pick<Article, 'title' | 'category' | 'publishedAt' | 'description' | 'content'>;
}
function formatPublishedDate(value?: string | null) {
  if (!value) return 'Chưa cập nhật';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(date);
}

function getArticleText(content: ArticleContentBlock[]) {
  return content
    .filter((block) => block.type === 'paragraph')
    .map((block) => block.text.trim())
    .filter(Boolean);
}

function truncateText(value: string) {
  const text = value.replace(/\s+/g, ' ').trim();
  return text.length > 280 ? `${text.slice(0, 277).trimEnd()}…` : text;
}

function getArticleParagraphs(article: ArticleSummaryProps['article']) {
  const paragraphs = getArticleText(article.content);
  if (paragraphs.length) return paragraphs;
  return article.description?.trim() ? [article.description.trim()] : [];
}

function getHighlights(paragraphs: string[]) {
  const highlight = paragraphs[0];
  return highlight
    ? truncateText(highlight)
    : 'Bài viết chưa có đủ nội dung để trích xuất thông tin nổi bật.';
}

function getAdditionalDetails(paragraphs: string[]) {
  const detail = paragraphs.length > 2 ? paragraphs[1] : '';
  return detail
    ? truncateText(detail)
    : 'Bài viết chưa có thêm chi tiết ngoài thông tin nổi bật.';
}

function getMessage(paragraphs: string[]) {
  const ending = paragraphs[paragraphs.length - 1];
  if (paragraphs.length < 2 || !ending) {
    return 'Chưa có đủ nội dung để xác định thông điệp hoặc kết luận riêng của bài viết.';
  }
  return `Theo phần kết của bài viết: ${truncateText(ending)}`;
}

export default function ArticleSummary({ article }: ArticleSummaryProps) {
  const paragraphs = getArticleParagraphs(article);

  return (
    <section className="article-summary" aria-labelledby="article-summary-heading">
      <div className="article-summary__header">
        <h2 className="article-summary__title" id="article-summary-heading">
          Tóm tắt bài viết
        </h2>
      </div>
      <p className="article-summary__note">
        Tóm lược dựa trên nội dung hiện có của bài viết.
      </p>
      <ul className="article-summary__list">
        <li className="article-summary__item">
          <strong>Ngày đăng</strong>
          <span>{formatPublishedDate(article.publishedAt)}</span>
        </li>
        <li className="article-summary__item">
          <strong>Sự kiện chính</strong>
          <span>{article.title}</span>
        </li>
        <li className="article-summary__item">
          <strong>Thông tin nổi bật</strong>
          <span>{getHighlights(paragraphs)}</span>
        </li>
        <li className="article-summary__item">
          <strong>Diễn biến, chi tiết</strong>
          <span>{getAdditionalDetails(paragraphs)}</span>
        </li>
        <li className="article-summary__item">
          <strong>Ý nghĩa, thông điệp</strong>
          <span>{getMessage(paragraphs)}</span>
        </li>
      </ul>
    </section>
  );
}
