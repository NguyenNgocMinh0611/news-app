import ArticleCategoryNav from "../../components/article/ArticleCategoryNav";
import ArticleHeader from "../../components/article/ArticleHeader";
import "../../styles/article/article-detail.scss";
import type { Article } from "../../types/article";

const mockArticle: Article = {
  id: 1,
  slug: "chuyen-tau-di-san-ket-noi-ha-noi-thai-nguyen",
  title: "Chuyến tàu di sản kết nối Hà Nội - Thái Nguyên",
  description: "GD&TĐ - Ngày 30/10, tỉnh Thái Nguyên khai trương Chuyến tàu di sản, đón tiếp Đoàn Phu nhân các Đại sứ, Trưởng các cơ quan đại diện nước ngoài tại Việt Nam.",
  category: "THỜI SỰ",
  author: "Phạm Vũ",
  source: "Báo Giáo dục và Thời đại",
  publishedAt: "2026-10-30T08:30:00+07:00",
  publishedAtLabel: "2 phút trước",
  image: "https://cdn.giaoducthoidai.vn/images/GpGb4n_FWMkhbxFngtpti49OmQXM4bup279LUWZwbrabmfGD8qC0_hBj3eHrDUkttF5h3dUzdIM153X89datk7oT1UlC1TIrsxpugmQ-SLU/2aobor93fi8or9ljtk2nbbyeaksynh4uuv85lyky.jpg.avif",
  imageAlt: "Chuyến tàu di sản kết nối Hà Nội - Thái Nguyên",
  imageCaption: "Lãnh đạo tỉnh Thái Nguyên đón Đoàn tại ga Hà Nội.",
  content: [],
  relatedSlugs: [],
  popular: false,
  originalUrl: null,
};
export default function ArticleDetailPage() {
  const article = mockArticle;
  return (
    <main className="article-page">
      <div className="article-container">
        <div className="article-layout">
          <article className="article-main">
            <ArticleCategoryNav category={article.category} />
            <ArticleHeader article={article} />
          </article>
          <aside className="article-sidebar" aria-label="Tin tức liên quan"></aside>
        </div>
      </div>
    </main>
  );
}
