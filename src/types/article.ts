export type ArticleContentBlock = | { type: "paragraph"; text: string;}
  | { type: "heading"; text: string; }
  | { type: "image";src: string;alt: string;caption?: string | null;};
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