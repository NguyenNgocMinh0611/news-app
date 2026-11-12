import type { ArticleContentBlock } from '@/types/article';

export interface Article {
  id: string;
  title: string;
  link: string;
  description: string;
  content?: ArticleContentBlock[];
  contentError?: string;
  pubDate?: string;
  image?: string;
  category?: string;
}
