import type { Article } from '@/features/news/types';

const SOURCE_URL = 'https://giaoducthoidai.vn';

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

export async function fetchRss(file: string, category: string, signal: AbortSignal): Promise<Article[]> {
  const response = await fetch(`/api/rss/${encodeURIComponent(file)}`, { signal });
  if (!response.ok) throw new Error(`Không thể tải RSS (HTTP ${response.status}).`);
  const xml = new TextDecoder('utf-8').decode(await response.arrayBuffer());
  return parseRss(xml, category);
}
