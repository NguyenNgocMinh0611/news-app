import type { Article } from '../types';

// Fixed IDs and dates keep presentation tests independent of RSS and API data.
export const mockArticles: Article[] = [
  {
    id: 'demo-article-001',
    title: 'Học sinh khám phá khoa học qua những thí nghiệm gần gũi',
    link: 'https://example.com/articles/kham-pha-khoa-hoc',
    description: 'Dữ liệu mẫu: Hoạt động thực hành giúp học sinh đặt câu hỏi, quan sát và tìm hiểu kiến thức khoa học trong cuộc sống.',
    pubDate: '2026-10-30T09:00:00+07:00',
    image: '/images/mock-news-science.svg',
    category: 'Giáo dục',
  },
  {
    id: 'demo-article-002',
    title: 'Thư viện trường học mở thêm không gian đọc sách',
    link: 'https://example.com/articles/khong-gian-doc-sach',
    description: 'Dữ liệu mẫu: Không gian đọc mới mang đến nhiều lựa chọn sách và góc học tập dành cho học sinh.',
    pubDate: '2026-10-29T15:30:00+07:00',
    image: '/images/mock-news-library.svg',
    category: 'Văn hóa',
  },
  {
    id: 'demo-article-003',
    title: 'Ứng dụng công nghệ trong lớp học: Bắt đầu từ nhu cầu thực tế của giáo viên và học sinh',
    link: 'https://example.com/articles/cong-nghe-lop-hoc',
    description: 'Dữ liệu mẫu để kiểm tra tiêu đề dài và cách xuống dòng của thẻ bài viết trên màn hình nhỏ.',
    pubDate: '2026-10-28T08:15:00+07:00',
    category: 'Công nghệ',
  },
  {
    id: 'demo-article-004',
    title: 'Ngày hội thể thao kết nối học sinh',
    link: 'https://example.com/articles/ngay-hoi-the-thao',
    description: 'Dữ liệu mẫu: Bài viết không có ảnh, chuyên mục và ngày đăng để kiểm tra các trường tùy chọn.',
  },
  {
    id: 'demo-article-005',
    title: 'Câu lạc bộ xanh lan tỏa thói quen bảo vệ môi trường',
    link: 'https://example.com/articles/cau-lac-bo-xanh',
    description: 'Dữ liệu mẫu: Các hoạt động phân loại rác và chăm sóc cây xanh giúp hình thành thói quen tích cực.',
    pubDate: 'invalid-date',
    category: 'Đời sống',
  },
];
