import { useState, useEffect } from 'react';
import { NAV_MENU, HOT_TOPICS, SITE_INFO } from '../../constants/navigation';
import '../../styles/Header.scss';

export function Header() {
  const [currentDate, setCurrentDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    const now = new Date();
    const pad = (x: number) => (x < 10 ? `0${x}` : `${x}`);
    setCurrentDate(
      `${days[now.getDay()]}, ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`,
    );
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery.trim());
    }
  };

  return (
    <header className="header">
      <div className="top-info">
        <div className="container">
          <span className="top-info__date">{currentDate}</span>
          <span className="top-info__item">
            Đường dây nóng: <strong>{SITE_INFO.hotline}</strong>
          </span>
          <span className="top-info__item">
            Email: <a href={`mailto:${SITE_INFO.email}`}>{SITE_INFO.email}</a>
          </span>
        </div>
      </div>

      <div className="container header-primary">
        <h1 className="header-primary__title">
          <a href="/" className="logo">
            Giáo dục &amp; Thời đại
            <small className="logo__sub">Cơ quan của Bộ Giáo dục và Đào tạo</small>
          </a>
        </h1>
        <form className="search-head" onSubmit={handleSearch}>
          <input
            type="search"
            className="search-head__input"
            placeholder="Tìm kiếm..."
            aria-label="Tìm kiếm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-head__btn">
            Tìm
          </button>
        </form>
      </div>

      <nav className="header-secondary">
        <div className="container">
          <ul className="menu">
            {NAV_MENU.map((item, index) => (
              <li key={item.href} className="menu-item">
                <a
                  href={item.href}
                  className={`menu-link ${index === 0 ? 'menu-link--active' : ''}`}
                >
                  {item.label}
                </a>
                {item.children && (
                  <ul className="sub-menu">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a href={child.href}>{child.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="hot-events">
        <div className="container hot-events__inner">
          <a className="hot-events__title" href="#">Sự kiện</a>
          <ul className="hot-events__list">
            {HOT_TOPICS.map((topic) => (
              <li key={topic} className="hot-events__item">
                <a href="#">{topic}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
