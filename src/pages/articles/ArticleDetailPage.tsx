import ArticleCategoryNav from "@/features/articles/components/ArticleCategoryNav";
import "../../styles/article/article-detail.scss";
import type { Article } from "../../types/article";
import ArticleHeader from "@/features/articles/components/ArticleHeader";
import ArticleImage from "@/features/articles/components/ArticleImage";
import ArticleContent from "@/features/articles/components/ArticleContent";

const mockArticle: Article = {
  id: 1,
  slug: "chuyen-tau-di-san-ket-noi-ha-noi-thai-nguyen",
  title: "Chuyến tàu di sản kết nối Hà Nội - Thái Nguyên",
  description:
    "GD&TĐ - Ngày 30/10, tỉnh Thái Nguyên khai trương Chuyến tàu di sản, đón tiếp Đoàn Phu nhân các Đại sứ, Trưởng các cơ quan đại diện nước ngoài tại Việt Nam.",
  category: "THỜI SỰ",
  author: "Phạm Vũ",
  source: "Báo Giáo dục và Thời đại",
  publishedAt: "2026-10-30T14:36:00+07:00",
  publishedAtLabel: "2 phút trước",
  image:
    "https://cdn.giaoducthoidai.vn/images/LLSw9StHNgddW78hWP53XokGNyJURdb0KWBJCjwcmEw3px_2pUA7VEX3Lg1e_4T1RgubuMUVg7DA7IXORP2UQ89z8tl16P2ZfBHMiAukgMQ/2aobor93cekbi2zm6loodipt8xpnubifbzpo1356.jpg.avif",
  imageAlt: 'Thái Nguyên khai trương "Chuyến tàu di sản"',
  imageCaption: 'Thái Nguyên khai trương "Chuyến tàu di sản".',
  content: [
    {
      type: "paragraph",
      text: "Sự kiện có gần 100 đại biểu tham gia, gồm đại diện các cơ quan ngoại giao nước ngoài tại Việt Nam và các đơn vị thuộc Bộ Ngoại giao.",
    },
    {
      type: "image",
      src: "https://cdn.giaoducthoidai.vn/images/LLSw9StHNgddW78hWP53XgaA3zablIo1mMVd0L_4WfY7ojmRO43tOJgXT_TGAyV0BnlHO4rIh8XGUb2K0kEha89z8tl16P2ZfBHMiAukgMQ/2aobor93fi8or9ljtk2nbbyeaksynh4uuv85lyky.jpg.avif",
      alt: "Lãnh đạo tỉnh Thái Nguyên đón đoàn tại ga Hà Nội",
      caption: "Lãnh đạo tỉnh Thái Nguyên đón Đoàn tại ga Hà Nội.",
    },
    {
      type: "paragraph",
      text: "Tại ga Hà Nội, đoàn được đại diện lãnh đạo tỉnh Thái Nguyên cùng các sở, ban, ngành đón tiếp trước khi bắt đầu hành trình.",
    },
    {
      type: "paragraph",
      text: "Chuyến tàu là hoạt động nổi bật trong khuôn khổ Festival Trà Quốc tế - Thái Nguyên năm 2026, kết hợp trải nghiệm đường sắt với giao lưu văn hóa, nghệ thuật và quảng bá văn hóa trà Việt.",
    },
    {
      type: "image",
      src: "https://cdn.giaoducthoidai.vn/images/LLSw9StHNgddW78hWP53XokGNyJURdb0KWBJCjwcmEy67qESblW7MZRzNgnxTcfmB2zoOQbOAMW_sGYhes_CS89z8tl16P2ZfBHMiAukgMQ/2aobor93cfcfmyazx5xv409kjfzwjyplc00wigcs.jpg.avif",
      alt: "Lãnh đạo tỉnh Thái Nguyên đón đoàn tại ga Lưu Xá",
      caption: "Lãnh đạo tỉnh Thái Nguyên đón Đoàn tại ga Lưu Xá.",
    },
    {
      type: "heading",
      text: "Những trải nghiệm trên Chuyến tàu di sản",
    },
    {
      type: "paragraph",
      text: "Hành trình mang đến cơ hội thưởng thức trà Thái Nguyên, tìm hiểu sản phẩm địa phương, giao lưu nghệ thuật truyền thống và khám phá văn hóa vùng chè Tân Cương.",
    },
    {
      type: "image",
      src: "https://cdn.giaoducthoidai.vn/images/LLSw9StHNgddW78hWP53XgaA3zablIo1mMVd0L_4Wfa1elqXOBD5SsufxqvVZ75aHY35obsvgMltCxUqCKVmrc9z8tl16P2ZfBHMiAukgMQ/2aobor93fiwl960jeehymgbmlfwmu3wtvrvrm2uk.jpg.avif",
      alt: 'Hoạt động văn hóa trên "Chuyến tàu di sản"',
      caption: 'Những hoạt động văn hóa tạo điểm nhấn cho hành trình.',
    },
  ],
  relatedSlugs: [],
  popular: false,
  originalUrl:
    "https://giaoducthoidai.vn/chuyen-tau-di-san-ket-noi-ha-noi-thai-nguyen-post797871.html",
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
            {article.description?.trim() && (
              <p className="article-header__description">
            {article.description}
              </p>)}
            {article.image && (
              <ArticleImage src={article.image} alt={article.imageAlt || article.title}
                caption={article.imageCaption}
                className="article-main-image" />
            )}
            <ArticleContent content={article.content} />
          </article>
          <aside className="article-sidebar" aria-label="Tin tức liên quan"></aside>
        </div>
      </div>
    </main>
  );
}
