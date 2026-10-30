import { Link } from "react-router-dom";

interface ArticleBreadcrumbProps {
  category: string;
  title: string;
}
export default function ArticleBreadcrumb({category, title}: ArticleBreadcrumbProps) {
  return (
    <nav className="article-breadcrumb" aria-label="Điều hướng đường dẫn">
      <Link to="/">Trang chủ</Link>
      <span className="article-breadcrumb__separator">/</span>
      <span>{category}</span>
      <span className="article-breadcrumb__separator">/</span>
      <span className="article-breadcrumb__current" aria-current="page" title={title}>
        {title}
      </span>
    </nav>
  );
}