import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getRssFeed, getRssFeedBySlug } from '@/features/news/data/rssFeeds';
import { NAV_MENU, SITE_INFO } from '../../constants/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword } from '@/store/slice/SearchSlice';
import type { RootState } from '@/store/Store';
import { FontSizeControl } from '@/components/common/FontSizeControl';
import RegisterModal from '@/features/auth/components/RegisterModal';
import LoginModal from '@/features/auth/components/LoginModal';
import { useRssArticles } from '@/hooks/useRssArticles';
import { toArticleId } from '@/features/news/components/NewsCard';
import '../../styles/Header.scss';

const DAYS = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

function formatDate() {
  const now = new Date();
  const pad = (x: number) => (x < 10 ? `0${x}` : `${x}`);
  return `${DAYS[now.getDay()]}, ${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
}

export function Header() {
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.search.keyword);
  const { articles: latestArticles } = useRssArticles('thoi-su-1.rss', 'Thời sự');
  const topicsRef = useRef<HTMLUListElement>(null);
  const [hasTopicOverflow, setHasTopicOverflow] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);
  const currentDate = formatDate();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchValue = location.pathname === '/search'
    ? searchParams.get('q') ?? ''
    : keyword;
  const currentSlug = location.pathname.startsWith('/category/')
    ? location.pathname.split('/').filter(Boolean).at(-1) ?? ''
    : '';
  const category = currentSlug
    ? getRssFeedBySlug(currentSlug)?.category ?? ''
    : getRssFeed(searchParams.get('category') ?? '').category;

  useEffect(() => {
    const topics = topicsRef.current;
    if (!topics) return undefined;

    const updateOverflow = () => {
      setHasTopicOverflow(topics.scrollWidth > topics.clientWidth);
    };

    updateOverflow();
    window.addEventListener('resize', updateOverflow);
    return () => window.removeEventListener('resize', updateOverflow);
  }, [latestArticles.length]);

  const scrollTopics = (direction: 'left' | 'right') => {
    topicsRef.current?.scrollBy({
      left: direction === 'left' ? -240 : 240,
      behavior: 'smooth',
    });
  };
  const categoryLink = (label: string, href: string) => {
    const next = new URLSearchParams(searchParams);
    next.delete('page');
    if (label === 'Trang chủ') {
      next.delete('category');
      return { pathname: '/', search: next.toString() ? `?${next}` : '' };
    }
    const slug = href.split('/').filter(Boolean).at(-1) ?? '';
    return { pathname: `/category/${slug}`, search: next.toString() ? `?${next}` : '' };
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setKeyword(value));
    if (location.pathname === '/search') {
      const next = new URLSearchParams(searchParams);
      if (value.trim()) next.set('q', value);
      else next.delete('q');
      next.delete('page');
      setSearchParams(next);
      return;
    }
    if (value.trim()) {
      const next = new URLSearchParams(searchParams);
      if (next.has('page')) {
        next.delete('page');
        setSearchParams(next);
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchValue.trim();
    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
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
          <span className="top-info__item top-info__font-size">
            <FontSizeControl />
          </span>
          <span className="top-info__item top-info__auth">
            {loggedInEmail ? (
              <>
                <span className="top-info__user">{loggedInEmail}</span>
                <button
                  type="button"
                  className="top-info__logout-btn"
                  onClick={() => setLoggedInEmail(null)}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="top-info__login-btn"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  className="top-info__register-btn"
                  onClick={() => setIsRegisterOpen(true)}
                >
                  Đăng ký
                </button>
              </>
            )}
          </span>
        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={setLoggedInEmail}
      />

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
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-head__btn">
            Tìm
          </button>
        </form>
      </div>

      <nav className="header-secondary" aria-label="Chuyên mục tin tức">
        <div className="container">
          <ul className="menu">
            {NAV_MENU.map((item) => {
              const isCurrent = item.href === '/' ? !category : item.label === category;
              const isActive = isCurrent || item.children?.some((child) =>
                child.label === category || (child.label === 'Khoa học - Công nghệ' && category === 'Công nghệ'),
              );
              return (
              <li key={item.href} className="menu-item">
                <Link
                  to={categoryLink(item.label, item.href)}
                  className={`menu-link ${isActive ? 'menu-link--active' : ''}`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="sub-menu">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          to={categoryLink(child.label, child.href)}
                          aria-current={child.label === category ? 'page' : undefined}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="hot-events">
        <div className="container hot-events__inner">
          <a className="hot-events__title" href="#">Sự kiện</a>
          <ul ref={topicsRef} className="hot-events__list">
            {latestArticles.map((article) => (
              <li key={article.id} className="hot-events__item">
                <Link to={`/article/${toArticleId(article.link)}`}>#{article.title}</Link>
              </li>
            ))}
          </ul>
          {hasTopicOverflow && (
            <div className="hot-events__controls">
              <button type="button" onClick={() => scrollTopics('left')} aria-label="Xem sự kiện trước">
                ‹
              </button>
              <button type="button" onClick={() => scrollTopics('right')} aria-label="Xem sự kiện tiếp theo">
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
