import { SITE_INFO } from '../../constants/navigation';
import '../../styles/Footer.scss';

const FOOTER_SECTIONS = [
  {
    title: 'BÁO GIÁO DỤC & THỜI ĐẠI',
    body: 'Cơ quan của Bộ Giáo dục và Đào tạo - Diễn đàn toàn xã hội vì sự nghiệp giáo dục',
  },
  {
    title: '',
    items: [
      'Cơ quan chủ quản: Bộ Giáo dục và Đào tạo',
      'Số giấy phép 479/GP-BTTTT, cấp ngày 29/10/2020, ISSN 1859-2945.',
      'Tổng Biên tập: Triệu Ngọc Lâm',
      'Phó Tổng Biên tập: Dương Thanh Hương - Nguyễn Đức Tuân',
    ],
  },
  {
    title: 'TRỤ SỞ CHÍNH',
    items: [
      { text: 'Tòa soạn: 15 Hai Bà Trưng, P. Cửa Nam, Hà Nội' },
      { text: 'Điện thoại: 024 3936 9800 · Hotline: 0967 335 089', tel: '02439369800' },
      { text: 'Email: gdtddientu@gmail.com', mail: SITE_INFO.email },
    ],
  },
];

export function Footer() {
  return (
    <footer className="page-footer">
      <div className="container">
        {FOOTER_SECTIONS.map((section, i) => (
          <div key={i} className="page-footer__col">
            {section.title && <h3 className="page-footer__title">{section.title}</h3>}
            {section.body && <p className="page-footer__body">{section.body}</p>}
            {section.items?.map((item, j) => {
              const text = typeof item === 'string' ? item : item.text;
              const tel = typeof item === 'object' && 'tel' in item ? item.tel : undefined;
              const mail = typeof item === 'object' && 'mail' in item ? item.mail : undefined;
              return (
                <p key={j} className="page-footer__item">
                  {tel ? (
                    <>
                      {text.split(tel)[0]}
                      <a href={`tel:+${tel}`}>{tel}</a>
                      {text.split(tel)[1]}
                    </>
                  ) : mail ? (
                    <>
                      {text.split(mail)[0]}
                      <a href={`mailto:${mail}`}>{mail}</a>
                    </>
                  ) : (
                    text
                  )}
                </p>
              );
            })}
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
