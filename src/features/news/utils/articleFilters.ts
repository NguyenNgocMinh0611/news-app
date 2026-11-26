import { NAV_MENU } from '@/constants/navigation';
import { RSS_FEEDS } from '../data/rssFeeds';
import type { Article } from '../types';

export type TimePeriod = 'all' | 'today' | '7days' | 'month' | 'date' | 'range';

export interface ArticleFilters {
  period: TimePeriod;
  date: string;
  startDate: string;
  endDate: string;
}

export interface CategoryFilterGroup {
  label: string;
  categories: string[];
}

export function getCategoryFilterGroups(): CategoryFilterGroup[] {
  const available = new Set<string>(RSS_FEEDS.map((feed) => feed.category).filter(Boolean));
  const included = new Set<string>();
  const groups = NAV_MENU.flatMap((item) => {
    if (item.label === 'Trang chủ') return [];
    const categories = [item.label, ...(item.children?.map((child) => child.label) ?? [])]
      .filter((category) => available.has(category) && !included.has(category));
    categories.forEach((category) => included.add(category));
    return categories.length ? [{ label: item.label, categories }] : [];
  });
  const otherCategories = RSS_FEEDS
    .map((feed) => feed.category)
    .filter((category) => category && !included.has(category));

  if (otherCategories.length) groups.push({ label: 'Danh mục khác', categories: otherCategories });
  return groups;
}

export function getChildCategoryFilterGroups(parentCategory: string): CategoryFilterGroup[] {
  const parent = NAV_MENU.find((item) => item.label === parentCategory);
  if (!parent?.children?.length) return [];

  const available = new Set<string>(RSS_FEEDS.map((feed) => feed.category).filter(Boolean));
  const categories = parent.children
    .map((child) => child.label)
    .filter((category) => available.has(category));

  return categories.length ? [{ label: parent.label, categories }] : [];
}

export function filterArticles(articles: Article[], filters: ArticleFilters) {
  const now = new Date();

  return articles.filter((article) => {
    if (filters.period === 'all') return true;
    if (!article.pubDate) return false;

    const publishedAt = new Date(article.pubDate);
    if (Number.isNaN(publishedAt.getTime())) return false;
    if (filters.period === 'date') {
      if (!filters.date) return false;
      return publishedAt.getFullYear() === Number(filters.date.slice(0, 4))
        && publishedAt.getMonth() === Number(filters.date.slice(5, 7)) - 1
        && publishedAt.getDate() === Number(filters.date.slice(8, 10));
    }
    if (filters.period === 'range') {
      if (!filters.startDate || !filters.endDate) return false;
      const start = filters.startDate ? new Date(`${filters.startDate}T00:00:00`) : null;
      const end = filters.endDate ? new Date(`${filters.endDate}T23:59:59.999`) : null;
      if (start && end && start > end) return false;
      return (!start || publishedAt >= start) && (!end || publishedAt <= end);
    }
    if (filters.period === 'today') {
      return publishedAt.getFullYear() === now.getFullYear()
        && publishedAt.getMonth() === now.getMonth()
        && publishedAt.getDate() === now.getDate();
    }
    if (filters.period === '7days') {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - 6);
      return publishedAt >= start && publishedAt <= now;
    }
    return publishedAt.getFullYear() === now.getFullYear()
      && publishedAt.getMonth() === now.getMonth();
  });
}
