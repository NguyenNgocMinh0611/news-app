import { useArticleDetail } from '@/hooks/useArticleDetail';
import { useRssArticles } from '@/hooks/useRssArticles';
import { getRssFeed } from '@/features/news/data/rssFeeds';
import { toArticleId } from '@/features/news/components/NewsCard';
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
import DontMissArticles from '@/features/articles/components/DontMissArticles';

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
  const {
    articles: rssArticles,
    loading: rssArticlesLoading,
    error: rssArticlesError,
    retry: retryRssArticles,
  } = useRssArticles('home.rss', '');
  const categoryFeed = rssArticle
    ? getRssFeed(rssArticle.category ?? '')
    : null;
  const categoryFeedFile = categoryFeed?.file === 'home.rss'
    ? ''
    : categoryFeed?.file ?? '';
  const {
    articles: categoryFeedArticles,
    loading: categoryFeedLoading,
    error: categoryFeedError,
    retry: retryCategoryFeed,
  } = useRssArticles(categoryFeedFile, categoryFeed?.category ?? '');

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
  const relatedRssArticles = rssArticles.filter((rss) => rss.id !== rssArticle.id);
  const relatedArticles: RelatedArticle[] = relatedRssArticles
    .slice(0, 3)
    .map((rss) => ({
      id: rss.id,
      title: rss.title,
      link: `/article/${toArticleId(rss.link)}`,
    }));
  const recommendedArticles = relatedRssArticles
    .filter((rss): rss is RssArticle & { image: string } => Boolean(rss.image))
    .slice(0, 3)
    .map((rss) => ({
      id: rss.id,
      title: rss.title,
      source: rss.category ?? 'Báo Giáo dục và Thời đại',
      image: rss.image,
      link: `/article/${toArticleId(rss.link)}`,
    }));
  const categoryArticles: CategoryArticle[] = (
    categoryFeedFile ? categoryFeedArticles : rssArticles
  )
    .filter((rss): rss is RssArticle & { image: string } =>
      rss.id !== rssArticle.id && Boolean(rss.image),
    )
    .map((rss) => ({
      id: rss.id,
      title: rss.title,
      image: rss.image,
      publishedAt: rss.pubDate ?? '',
      link: `/article/${toArticleId(rss.link)}`,
    }));
  const featuredArticle: FeaturedArticleData = {
    id: rssArticle.id,
    title: rssArticle.title,
    image: rssArticle.image,
    category: rssArticle.category ?? article.category,
    publishedAt: rssArticle.pubDate ?? '',
    description: rssArticle.description ?? '',
    link: `/article/${toArticleId(rssArticle.link)}`,
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
      link: `/article/${toArticleId(rss.link)}`,
    }));
  const featuredNews: FeaturedNewsData[] = rssArticles
    .flatMap((rss) => {
      if (rss.id === rssArticle.id || !rss.image) return [];
      return [{
        id: rss.id,
        title: rss.title,
        image: rss.image,
        category: rss.category ?? article.category,
        publishedAt: rss.pubDate ?? '',
        link: `/article/${toArticleId(rss.link)}`,
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
            {rssArticlesError && (
              <div role="alert">
                <p>{rssArticlesError}</p>
                <button type="button" onClick={retryRssArticles}>Thử lại</button>
              </div>
            )}
            {rssArticlesLoading && (
              <p role="status">Đang tải các tin RSS liên quan…</p>
            )}
            <RecommendedArticles articles={recommendedArticles} />
            <RelatedArticles articles={relatedArticles} />
            <CommentForm />
            {categoryFeedError && (
              <div role="alert">
                <p>{categoryFeedError}</p>
                <button type="button" onClick={retryCategoryFeed}>Thử lại</button>
              </div>
            )}
            {categoryFeedLoading && categoryFeedFile && (
              <p role="status">Đang tải tin cùng chuyên mục…</p>
            )}
            <CategoryArticles articles={categoryArticles} />
            <FeaturedArticles featuredArticle={featuredArticle} articles={articles} />
            <FeaturedNewsSection articles={featuredNews} />
            <DontMissArticles
              articles={rssArticles.filter((rss) => rss.id !== rssArticle.id)}
            />
          </article>
          <aside className="article-sidebar" aria-label="Tin tức liên quan"></aside>
        </div>
      </div>
    </main>
  );
}
