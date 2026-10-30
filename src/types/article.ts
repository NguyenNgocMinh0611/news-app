export interface ArticleContentBlock {
  type: "paragraph" | "heading";
  text: string;
}
export interface Article {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  category: string;
  author?: string | null;
  source?: string | null;
  publishedAt?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  imageCaption?: string | null;
  content: ArticleContentBlock[];
  relatedSlugs: string[];
  popular: boolean;
  originalUrl?: string | null;
  publishedAtLabel?: string | null;
}