import type { Article } from '@/features/news/types';

const SOURCE_URL = 'https://giaoducthoidai.vn';

function articleBlocks(html: string): NonNullable<Article['content']> {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const body = document.querySelector('.article__body');
  if (!body) throw new Error('Không tìm thấy nội dung bài viết trên trang nguồn.');

  body.querySelectorAll('script, style, iframe, object, .ads_middle').forEach((node) => node.remove());
  const blocks: NonNullable<Article['content']> = [];

  body.querySelectorAll('h2, h3, p, figure, img').forEach((node) => {
    if (node.matches('img') && node.closest('figure')) return;

    if (node.matches('figure, img')) {
      const image = node.matches('figure') ? node.querySelector('img') : node;
      if (!image) return;
      const src = safeUrl(
        image.getAttribute('data-large-src')
        || image.getAttribute('data-src')
        || image.getAttribute('src')
        || '',
      );
      if (!src) return;

      const caption = node.matches('figure')
        ? node.querySelector('figcaption')?.textContent?.replace(/\s+/g, ' ').trim() || null
        : null;
      blocks.push({
        type: 'image',
        src,
        alt: image.getAttribute('alt') || image.getAttribute('title') || '',
        caption,
      });
      return;
    }

    const text = node.textContent?.replace(/\s+/g, ' ').trim() ?? '';
    if (!text) return;
    blocks.push({
      type: node.matches('h2, h3') ? 'heading' : 'paragraph',
      text,
    });
  });

  if (!blocks.length) throw new Error('Bài viết không có nội dung để hiển thị.');
  return blocks;
}

function safeUrl(value: string): string | undefined {
  if (!value.trim()) return undefined;
  try {
    const url = new URL(value, SOURCE_URL);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function parseRss(xml: string, category: string): Article[] {
  const document = new DOMParser().parseFromString(xml, 'application/xml');
  if (document.querySelector('parsererror') || !document.querySelector('rss > channel')) {
    throw new Error('Nguồn RSS không hợp lệ.');
  }

  const seen = new Set<string>();
  return Array.from(document.querySelectorAll('item')).flatMap((item) => {
    const text = (name: string) => Array.from(item.children)
      .find((child) => child.tagName === name)?.textContent?.trim() ?? '';
    const title = text('title');
    const link = safeUrl(text('link'));
    if (!title || !link || seen.has(link)) return [];
    seen.add(link);

    const description = new DOMParser().parseFromString(text('description'), 'text/html');
    description.querySelectorAll('script, style, iframe, object').forEach((node) => node.remove());
    const summary = description.querySelector('p')?.textContent ?? description.body.textContent ?? '';
    const image = safeUrl(text('thumb') || text('image') || description.querySelector('img')?.getAttribute('src') || '');

    return [{
      id: link,
      title,
      link,
      description: summary.replace(/\s+/g, ' ').trim(),
      pubDate: text('pubDate') || undefined,
      image,
      category: text('category') || category || undefined,
    }];
  });
}

export async function fetchArticleContent(link: string, signal: AbortSignal) {
  const url = new URL(link);
  if (url.origin !== SOURCE_URL) throw new Error('Đường dẫn bài viết không hợp lệ.');

  const response = await fetch(`/api/article${url.pathname}`, { signal });
  if (!response.ok) throw new Error(`Không thể tải nội dung bài viết (HTTP ${response.status}).`);
  return articleBlocks(await response.text());
}

export async function fetchRss(file: string, category: string, signal: AbortSignal): Promise<Article[]> {
  const response = await fetch(`/api/rss/${encodeURIComponent(file)}`, { signal });
  if (!response.ok) throw new Error(`Không thể tải RSS (HTTP ${response.status}).`);
  const xml = new TextDecoder('utf-8').decode(await response.arrayBuffer());
  return parseRss(xml, category);
}
