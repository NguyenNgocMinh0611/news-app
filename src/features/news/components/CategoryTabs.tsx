import '@/styles/CategoryTabs.scss';

interface CategoryTabsProps {
  categories: readonly string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="category-tabs" role="group" aria-label="Lọc theo chuyên mục">
      {['', ...categories].map((category) => (
        <button
          key={category}
          type="button"
          className={`category-tabs__item${selectedCategory === category ? ' category-tabs__item--active' : ''}`}
          aria-pressed={selectedCategory === category}
          onClick={() => onCategoryChange(category)}
        >
          {category || 'Tất cả'}
        </button>
      ))}
    </div>
  );
}
