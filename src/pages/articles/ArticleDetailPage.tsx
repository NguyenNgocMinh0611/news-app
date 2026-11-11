import { useArticleDetail } from '@/hooks/useArticleDetail';
import { useRssArticles } from '@/hooks/useRssArticles';
import type { Article as DetailArticle, ArticleContentBlock } from '../../types/article';
import type { Article as RssArticle } from '@/features/news/types';
import ArticleCategoryNav from '@/features/articles/components/ArticleCategoryNav';
import ArticleHeader from '@/features/articles/components/ArticleHeader';
import ArticleImage from '@/features/articles/components/ArticleImage';
import ArticleContent from '@/features/articles/components/ArticleContent';
import TextToSpeech from '@/features/articles/components/TextToSpeech';
import RecommendedArticles from '@/features/articles/components/RecommendedArticles';
import type { RelatedArticle } from '@/features/articles/components/RelatedArticles';
import RelatedArticles from '@/features/articles/components/RelatedArticles';
import CommentForm from '@/features/articles/components/CommentForm';
import CategoryArticles, { type CategoryArticle } from '@/features/articles/components/CategoryArticles';
import '../../styles/article/article-detail.scss';
import type { FeaturedArticleData } from '@/types/featured-article';
import FeaturedArticles from '@/features/articles/components/feature/FeaturedArticles';
import type { FeaturedNewsData } from '@/types/featured-news';
import FeaturedNewsSection from '@/features/articles/components/feature/FeaturedNewsSection';

const relatedArticles: RelatedArticle[] = [
  {
    id: 1,
    title: 'Khi đột phá giáo dục thành nền tảng của đột phá công nghệ',
    link: '#',
  },
  {
    id: 2,
    title: 'Kiến tạo hệ sinh thái thu hút, trọng dụng nhân tài',
    link: '#',
  },
  {
    id: 3,
    title:
      'Từ coi trọng người giỏi đến kiến tạo môi trường để nhân tài tạo ra giá trị',
    link: '#',
    isFeatured: true,
  },
];

const relatedTags = [
  'Kết luận số 105-KL/TW',
  'phát triển nhân tài',
  'giáo dục đại học',
];

const categoryArticles: CategoryArticle[] = [
  {
    id: 1,
    title:
      'Giám sát việc thực hiện các chủ trương phát triển giáo dục tại Gia Lai',
    image:
      'https://cdn.giaoducthoidai.vn/images/YEBXHmKXGq0O1gH9suO7vlulJhZXta-wuTk9v2gwTHQhTTIeMMnUZEqQqywjuvs7/t11.jpg.avif',
    publishedAt: '4 giờ trước',
    link: '#',
  },
  {
    id: 2,
    title:
      'Để dự báo thị trường lao động phát huy hiệu quả tại vùng cao Tây Bắc',
    image:
      'https://cdn.giaoducthoidai.vn/images/kc8JW4239jgRxkq62s-Nd2qKqUlDo6S_cV2f7lSrsjC1gxh_IlhYyD39X3hTOASf/thuc-tap.jpg.avif',
    publishedAt: '6 giờ trước',
    link: '#',
  },
  {
    id: 3,
    title:
      'Để tiếng Anh hiện diện trong môn học từ sự chủ động của giáo viên',
    image:
      'https://cdn.giaoducthoidai.vn/images/rAUKY9Fj56VXBxg7HjhWsG_8XXrkPj9DVmWES7iyukmtw173CEJnBDqic-CyNdf2DF3ge7ww3WQ4Rj0gKfqjWw/diem-chuan-thi-lop-10.jpg.avif',
    publishedAt: '6 giờ trước',
    link: '#',
  },
  {
    id: 4,
    title: 'Đổi mới phương pháp dạy học trong nhà trường',
    image:
      'https://cdn.giaoducthoidai.vn/images/qIbgaloiZNb6_LhfgZLXK39O427tJF7mMVcSQgSmc-UrQN4u63PiSqieHM3Po9TCqJBAQfwxJ0rLT69cCnFGng/gdtd_br_b3a2297.jpg.avif',
    publishedAt: '8 giờ trước',
    link: '#',
  },
];

// chuyển từ rss sang article chi tiết
function toDetailArticle(rss: RssArticle): DetailArticle {
  const content: ArticleContentBlock[] = [
    { type: 'paragraph', text: rss.description ?? '' },
  ];

  return {
    id: 0,
    slug: rss.id,
    title: rss.title,
    description: rss.description ?? null,
    category: rss.category ?? 'THỜI SỰ',
    author: null,
    source: 'Báo Giáo dục và Thời đại',
    publishedAt: rss.pubDate ?? null,
    image: rss.image ?? null,
    imageAlt: rss.title,
    imageCaption: null,
    content,
    relatedSlugs: [],
    popular: false,
    originalUrl: rss.link,
  };
}

export default function ArticleDetailPage() {
  const { article: rssArticle, loading, error, retry } = useArticleDetail();
  const { articles: rssArticles } = useRssArticles('home.rss', '');

  if (loading) {
    return (
      <main className="article-page">
        <div className="article-container">
          <p role="status">Đang tải bài viết…</p>
        </div>
      </main>
    );
  }

  if (error || !rssArticle) {
    return (
      <main className="article-page">
        <div className="article-container">
          <p role="alert">{error ?? 'Không tìm thấy bài viết.'}</p>
          <button type="button" onClick={retry}>Thử lại</button>
        </div>
      </main>
    );
  }

  const article = toDetailArticle(rssArticle);
  const featuredArticle: FeaturedArticleData = {
    id: rssArticle.id,
    title: rssArticle.title,
    image: rssArticle.image,
    category: rssArticle.category ?? article.category,
    publishedAt: rssArticle.pubDate ?? '',
    description: rssArticle.description ?? '',
    link: rssArticle.link,
  };
  const articles: FeaturedArticleData[] = rssArticles
    .filter((rss) => rss.id !== rssArticle.id)
    .map((rss) => ({
      id: rss.id,
      title: rss.title,
      image: rss.image,
      category: rss.category ?? article.category,
      publishedAt: rss.pubDate ?? '',
      description: rss.description ?? '',
      link: rss.link,
    }));
  const featuredNews: FeaturedNewsData[] = rssArticles
    .flatMap((rss, index) => {
      if (rss.id === rssArticle.id || !rss.image) return [];
      return [{
        id: index,
        title: rss.title,
        image: rss.image,
        category: rss.category ?? article.category,
        publishedAt: rss.pubDate ?? '',
        link: rss.link,
      }];
    });

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
              </p>
            )}
            {article.image && (
              <ArticleImage src={article.image} alt={article.imageAlt || article.title}
                caption={article.imageCaption}
                className="article-main-image" />
            )}
            <TextToSpeech title={article.title} content={article.content} />
            <ArticleContent content={article.content} />
            <RecommendedArticles />
            <RelatedArticles articles={relatedArticles} tags={relatedTags} />
            <CommentForm />
            <CategoryArticles articles={categoryArticles} />
            <FeaturedArticles featuredArticle={featuredArticle} articles={articles} />
            <FeaturedNewsSection articles={featuredNews} />
          </article>
          <aside className="article-sidebar" aria-label="Tin tức liên quan"></aside>
        </div>
      </div>
    </main>
  );
}
