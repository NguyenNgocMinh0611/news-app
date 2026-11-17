import { Link } from 'react-router-dom';
import { NAV_MENU } from '@/constants/navigation';

interface ArticleCategoryNavProps {
  category: string;
}

function matchesCategory(menuCategory: string, category: string) {
  return menuCategory.toLocaleLowerCase() === category.trim().toLocaleLowerCase()
    || (menuCategory === 'Khoa học - Công nghệ' && category === 'Công nghệ');
}

function toCategoryPath(href: string) {
  const slug = href.split('/').filter(Boolean).at(-1);
  return slug ? `/category/${slug}` : '/';
}

export default function ArticleCategoryNav({ category }: ArticleCategoryNavProps) {
  const menuItem = NAV_MENU.find((item) =>
    matchesCategory(item.label, category)
    || item.children?.some((child) => matchesCategory(child.label, category)),
  );

  if (!menuItem) return null;

  return (
    <nav className="article-category-nav" aria-label="Chuyên mục bài viết">
      <Link to={toCategoryPath(menuItem.href)} className="article-category-nav__main">
        {menuItem.label}
      </Link>
      {menuItem.children && menuItem.children.length > 0 && (
        <div className="article-category-nav__items">
          {menuItem.children.map((item) => (
            <Link
              key={item.href}
              to={toCategoryPath(item.href)}
              className="article-category-nav__link"
              aria-current={matchesCategory(item.label, category) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
