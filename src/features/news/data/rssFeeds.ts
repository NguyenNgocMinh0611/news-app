export const RSS_FEEDS = [
  { category: '', file: 'home.rss' },
  { category: 'Giáo dục', file: 'giao-duc-17.rss' },
  { category: 'Thời sự', file: 'thoi-su-1.rss' },
  { category: 'Giáo dục pháp luật', file: 'phap-luat-phap-luat-8.rss' },
  { category: 'Kết nối', file: 'ket-noi-2.rss' },
  { category: 'Trao đổi', file: 'trao-doi-3.rss' },
  { category: 'Học đường', file: 'hoc-duong-5.rss' },
  { category: 'Nhân ái', file: 'nhan-ai-13.rss' },
  { category: 'Thế giới', file: 'the-gioi-10.rss' },
  { category: 'Sức khoẻ', file: 'suc-khoe-9.rss' },
  { category: 'Media', file: 'video-media-14.rss' },
  { category: 'Văn hóa', file: 'van-hoa-6.rss' },
  { category: 'Thể thao', file: 'the-thao-20.rss' },
  { category: 'Công nghệ', file: 'khoa-hoc-36.rss' },
  { category: 'Chính sách', file: 'chinh-sach-27.rss' },
  { category: 'Địa phương', file: 'dia-phuong-78.rss' },
  { category: 'Đào tạo - Tuyển sinh', file: 'tuyen-sinh-du-hoc-26.rss' },
  { category: 'Bốn phương', file: 'giao-duc-bon-phuong-49.rss' },
  { category: 'Giáo dục 24h', file: 'giao-duc-24h-87.rss' },
  { category: 'Giáo dục Đô thị', file: 'giao-duc-do-thi-98.rss' },
  { category: 'Xã hội', file: 'thoi-su-xa-hoi-97.rss' },
  { category: 'Chính trị', file: 'chinh-tri-34.rss' },
  { category: 'Kinh tế', file: 'kinh-te-38.rss' },
  { category: 'An ninh', file: 'an-ninh-25.rss' },
  { category: 'Pháp đình', file: 'phap-dinh-83.rss' },
  { category: 'Bạn đọc - Điều tra', file: 'goc-nhin-53.rss' },
  { category: 'Công đoàn', file: 'cong-doan-74.rss' },
  { category: 'Đồng hành', file: 'dong-hanh-88.rss' },
  { category: 'Khoa học - Công nghệ', file: 'khoa-hoc-36.rss' },
  { category: 'Phương pháp', file: 'phuong-phap-31.rss' },
  { category: 'Góc chuyên gia', file: 'goc-chuyen-gia-63.rss' },
  { category: 'Kỹ năng', file: 'ky-nang-song-39.rss' },
  { category: 'Du học', file: 'du-hoc-72.rss' },
  { category: 'Gương mặt', file: 'guong-mat-86.rss' },
  { category: 'Thể chất', file: 'the-chat-84.rss' },
  { category: 'Giáo dục Quốc phòng', file: 'giao-duc-quoc-phong-50.rss' },
  { category: 'Thế giới đó đây', file: 'the-gioi-do-day-93.rss' },
  { category: 'Chuyện lạ', file: 'chuyen-la-52.rss' },
  { category: 'Khoẻ đẹp', file: 'khoe-dep-89.rss' },
  { category: 'Gia đình', file: 'gia-dinh-7.rss' },
  { category: 'Đẩy lùi Covid-19', file: 'day-lui-covid-91.rss' },
  { category: 'Infographic', file: 'infographic-media-105.rss' },
  { category: 'Video', file: 'video-79.rss' },
  { category: 'Nóng 247', file: '247-nong-85.rss' },
  { category: 'Tiêu điểm', file: 'tieu-diem-81.rss' },
  { category: 'Sáng tác', file: 'sang-tac-82.rss' },
  { category: 'Đời sống văn hoá', file: 'doi-song-van-hoa-90.rss' },
  { category: 'Sao', file: 'the-gioi-sao-43.rss' },
  { category: 'Thể thao học đường', file: 'the-thao-hoc-duong-75.rss' },
] as const;

export function getRssFeed(category: string) {
  return RSS_FEEDS.find((feed) => feed.category === category) ?? RSS_FEEDS[0];
}

function toSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getRssFeedBySlug(slug: string) {
  return RSS_FEEDS.find((feed) => toSlug(feed.category) === slug);
}
