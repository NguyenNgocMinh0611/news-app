import { useState, useEffect, useRef } from 'react';
import { NAV_MENU, HOT_TOPICS, REGIONS, SITE_INFO } from '@news/constants/navigation';
import { SearchBar } from '@news/features/search/components/SearchBar';
import logoGdtd from '@news/assets/images/logo-gdtd.svg';
import bannerGdtd from '@news/assets/images/banner-gdtd.svg';
import './Header.scss';

export function Header() {
  const [currentDate, setCurrentDate] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hotTopicIndex, setHotTopicIndex] = useState(0);
  const navRef = useRef<HTMLElement>(null);

  // Format date in Vietnamese
  useEffect(() => {
    const days = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const now = new Date();
    const dayName = days[now.getDay()];
    setCurrentDate(`${dayName}, ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`);
  }, []);

  // Rotate hot topics
  useEffect(() => {
    const timer = setInterval(() => {
      setHotTopicIndex((prev) => (prev + 1) % HOT_TOPICS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  // Menu bỏ "Trang chủ" vì đã có icon home riêng ở đầu nav
  const menuItems = NAV_MENU.filter((item) => item.label !== 'Trang chủ');

  return (
    <header className="header">
      {/* === Top Utility Bar (nền trắng) === */}
      <div className="header__topbar">
        <div className="header__container header__topbar-inner">
          <span className="header__date">
            {currentDate} - <span className="header__time">18:14</span>
          </span>
          <div className="header__topbar-right">
            <a href={`tel:${SITE_INFO.hotline}`} className="header__topbar-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Đường dây nóng: <strong>{SITE_INFO.hotline}</strong></span>
            </a>
            <a href={`mailto:${SITE_INFO.email}`} className="header__topbar-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Email: <strong>{SITE_INFO.email}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* === Logo / Banner / Search === */}
      <div className="header__logo-area">
        <div className="header__container header__logo-inner">
          <button
            className="header__mobile-toggle"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo bên trái */}
          <a href="/" className="header__logo">
            <img src={logoGdtd} alt={SITE_INFO.name} className="header__logo-img" />
          </a>

          {/* Banner quảng cáo ở giữa */}
          <a href="/" className="header__banner" aria-label="Quảng cáo">
            <img src={bannerGdtd} alt="" className="header__banner-img" />
          </a>

          {/* Tìm kiếm + logo nhỏ bên phải */}
          <div className="header__logo-right">
            <SearchBar onSearch={handleSearch} />
            <a href="/" className="header__logo-mini">
              <img src={logoGdtd} alt={SITE_INFO.name} className="header__logo-mini-img" />
            </a>
          </div>
        </div>
      </div>

      {/* === Main Navigation (đỏ, 1 dòng) === */}
      <nav className="header__nav" ref={navRef}>
        <div className="header__container">
          <ul className={`header__nav-list ${mobileMenuOpen ? 'header__nav-list--open' : ''}`}>
            {/* Icon trang chủ */}
            <li className="header__nav-item header__nav-item--home">
              <a href="/" className="header__nav-link header__nav-link--icon" aria-label="Trang chủ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8z" />
                </svg>
              </a>
            </li>

            {menuItems.map((item, index) => (
              <li
                key={item.href}
                className={`header__nav-item ${item.children ? 'header__nav-item--has-children' : ''}`}
                onMouseEnter={() => item.children && setActiveDropdown(index)}
                onMouseLeave={() => item.children && setActiveDropdown(null)}
              >
                <a href={item.href} className="header__nav-link">
                  {item.label}
                  {item.children && (
                    <svg className="header__nav-arrow" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </a>

                {item.children && activeDropdown === index && (
                  <ul className="header__dropdown">
                    {item.children.map((child) => (
                      <li key={child.href} className="header__dropdown-item">
                        <a href={child.href} className="header__dropdown-link">
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* === Hot Topics Ticker + Regions === */}
      <div className="header__ticker-bar">
        <div className="header__container header__ticker-inner">
          <div className="header__ticker">
            <span className="header__ticker-label">Sự kiện:</span>
            <span className="header__ticker-text">{HOT_TOPICS[hotTopicIndex]}</span>
          </div>
          <div className="header__regions">
            <span className="header__regions-label">Chuyển động:</span>
            <ul className="header__regions-list">
              {REGIONS.map((region) => (
                <li key={region.href} className="header__regions-item">
                  <a href={region.href}>{region.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
