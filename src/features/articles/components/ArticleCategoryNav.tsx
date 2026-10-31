interface ArticleCategoryNavProps {
  category: string;
}

const categoryItems = [
  "Xã hội",
  "Giáo dục Đô thị",
  "Chính trị",
  "Kinh tế",
  "Góp ý sửa đổi Hiến pháp",
];

export default function ArticleCategoryNav({ category }: ArticleCategoryNavProps) {
  return (
    <nav className="article-category-nav" aria-label="Chuyên mục bài viết">
      <a href="/" className="article-category-nav__main">
        {category}
      </a>
      <div className="article-category-nav__items">
        {categoryItems.map((item) => (
          <a key={item} href="#"className="article-category-nav__link"
            onClick={(event) => event.preventDefault()}>
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}
