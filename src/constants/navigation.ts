export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
}

export const NAV_MENU: NavItem[] = [
  {
    label: 'Trang chủ',
    href: '/',
  },
  {
    label: 'Giáo dục',
    href: '/giao-duc',
    children: [
      { label: 'Chính sách', href: '/giao-duc/chinh-sach' },
      { label: 'Địa phương', href: '/giao-duc/dia-phuong' },
      { label: 'Đào tạo - Tuyển sinh', href: '/giao-duc/dao-tao-tuyen-sinh' },
      { label: 'Bốn phương', href: '/giao-duc/bon-phuong' },
      { label: 'Giáo dục 24h', href: '/giao-duc/giao-duc-24h' },
    ],
  },
  {
    label: 'Thời sự',
    href: '/thoi-su',
    children: [
      { label: 'Giáo dục Đô thị', href: '/thoi-su/giao-duc-do-thi' },
      { label: 'Xã hội', href: '/thoi-su/xa-hoi' },
      { label: 'Chính trị', href: '/thoi-su/chinh-tri' },
      { label: 'Kinh tế', href: '/thoi-su/kinh-te' },
    ],
  },
  {
    label: 'Giáo dục pháp luật',
    href: '/giao-duc-phap-luat',
    children: [
      { label: 'An ninh', href: '/giao-duc-phap-luat/an-ninh' },
      { label: 'Pháp đình', href: '/giao-duc-phap-luat/phap-dinh' },
      { label: 'Bạn đọc - Điều tra', href: '/giao-duc-phap-luat/ban-doc-dieu-tra' },
    ],
  },
  {
    label: 'Kết nối',
    href: '/ket-noi',
    children: [
      { label: 'Công đoàn', href: '/ket-noi/cong-doan' },
      { label: 'Đồng hành', href: '/ket-noi/dong-hanh' },
      { label: 'Khoa học - Công nghệ', href: '/ket-noi/khoa-hoc-cong-nghe' },
    ],
  },
  {
    label: 'Trao đổi',
    href: '/trao-doi',
    children: [
      { label: 'Phương pháp', href: '/trao-doi/phuong-phap' },
      { label: 'Góc chuyên gia', href: '/trao-doi/goc-chuyen-gia' },
    ],
  },
  {
    label: 'Học đường',
    href: '/hoc-duong',
    children: [
      { label: 'Kỹ năng', href: '/hoc-duong/ky-nang' },
      { label: 'Du học', href: '/hoc-duong/du-hoc' },
      { label: 'Gương mặt', href: '/hoc-duong/guong-mat' },
      { label: 'Thể chất', href: '/hoc-duong/the-chat' },
    ],
  },
  {
    label: 'Nhân ái',
    href: '/nhan-ai',
  },
  {
    label: 'Thế giới',
    href: '/the-gioi',
    children: [
      { label: 'Giáo dục Quốc phòng', href: '/the-gioi/giao-duc-quoc-phong' },
      { label: 'Thế giới đó đây', href: '/the-gioi/the-gioi-do-day' },
      { label: 'Chuyện lạ', href: '/the-gioi/chuyen-la' },
    ],
  },
  {
    label: 'Sức khoẻ',
    href: '/suc-khoe',
    children: [
      { label: 'Khoẻ đẹp', href: '/suc-khoe/khoe-dep' },
      { label: 'Gia đình', href: '/suc-khoe/gia-dinh' },
      { label: 'Đẩy lùi Covid-19', href: '/suc-khoe/day-lui-covid-19' },
    ],
  },
  {
    label: 'Media',
    href: '/media',
    children: [
      { label: 'Infographic', href: '/media/infographic' },
      { label: 'Video', href: '/media/video' },
      { label: 'Nóng 247', href: '/media/nong-247' },
      { label: 'Tiêu điểm', href: '/media/tieu-diem' },
    ],
  },
  {
    label: 'Văn hóa',
    href: '/van-hoa',
    children: [
      { label: 'Sáng tác', href: '/van-hoa/sang-tac' },
      { label: 'Đời sống văn hoá', href: '/van-hoa/doi-song-van-hoa' },
      { label: 'Sao', href: '/van-hoa/sao' },
    ],
  },
  {
    label: 'Thể thao',
    href: '/the-thao',
    children: [
      { label: 'Thể thao học đường', href: '/the-thao/the-thao-hoc-duong' },
    ],
  },
];

export const HOT_TOPICS: string[] = [
  '#Đưa nghị quyết Đại hội XIV vào cuộc sống',
  '#Nghị quyết 71-NQ/TW về đột phá phát triển giáo dục và đào tạo',
  '#Hiện thực hóa Nghị quyết 57 - NQ/TW',
  '#Kỷ niệm 81 năm Cách mạng Tháng Tám và Quốc khánh 2/9',
  '#Phòng chống tác hại thuốc lá',
  '#Xây dựng Luật Nhà giáo',
];

export const REGIONS: NavSubItem[] = [
  { label: 'TP Hà Nội', href: '/chuyen-dong/tp-ha-noi' },
  { label: 'TP Hồ Chí Minh', href: '/chuyen-dong/tp-ho-chi-minh' },
  { label: 'Đồng bằng sông Cửu Long', href: '/chuyen-dong/dbscl' },
  { label: 'Việt Bắc', href: '/chuyen-dong/viet-bac' },
  { label: 'Tây Bắc', href: '/chuyen-dong/tay-bac' },
  { label: 'Đồng bằng sông Hồng', href: '/chuyen-dong/dbsh' },
  { label: 'Trung du', href: '/chuyen-dong/trung-du' },
  { label: 'Bắc Trung Bộ', href: '/chuyen-dong/bac-trung-bo' },
  { label: 'Miền Trung - Tây Nguyên', href: '/chuyen-dong/mien-trung-tay-nguyen' },
];

export const SITE_INFO = {
  name: 'BÁO GIÁO DỤC VÀ THỜI ĐẠI ONLINE',
  tagline: 'GIÁO DỤC THỦ ĐÔ',
  hotline: '096.733.5089',
  email: 'gdtddientu@gmail.com',
  address: '15 Hai Bà Trưng - P.Cửa Nam - Hà Nội',
};
