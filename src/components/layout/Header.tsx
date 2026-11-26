import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getRssFeed, getRssFeedBySlug } from '@/features/news/data/rssFeeds';
import { NAV_MENU, SITE_INFO } from '../../constants/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword, addRecentKeyword, removeRecentKeyword, clearRecentKeywords } from '@/store/slice/SearchSlice';
import { login, logout } from '@/store/slice/AuthSlice';
import type { RootState } from '@/store/Store';
import { FontSizeControl } from '@/components/common/FontSizeControl';
import { DarkModeToggle } from '@/components/common/DarkModeToggle';
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
  const recentKeywords = useSelector((state: RootState) => state.search.recentKeywords);
  const bookmarkCount = useSelector((state: RootState) => state.bookmark.bookmarks.length);
  const historyCount = useSelector((state: RootState) => state.readingHistory.history.length);
  const { articles: latestArticles } = useRssArticles('thoi-su-1.rss', 'Thời sự');
  const topicsRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLFormElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null);
  const [hasTopicOverflow, setHasTopicOverflow] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuHovered, setIsUserMenuHovered] = useState(false);
  const [isUserMenuPinned, setIsUserMenuPinned] = useState(false);
  const isUserMenuOpen = isUserMenuHovered || isUserMenuPinned;
  const loggedInEmail = useSelector((state: RootState) => state.auth.loggedInEmail);
  const avatarInitial = loggedInEmail?.trim().charAt(0).toUpperCase() ?? '';
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

  useEffect(() => {
    if (!isSearchFocused) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isSearchFocused]);

  useEffect(() => {
    if (!isUserMenuOpen) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setIsUserMenuHovered(false);
        setIsUserMenuPinned(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsUserMenuHovered(false);
      setIsUserMenuPinned(false);
      userMenuButtonRef.current?.focus();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUserMenuOpen]);

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

    dispatch(addRecentKeyword(query));
    setIsSearchFocused(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleRecentClick = (kw: string) => {
    dispatch(setKeyword(kw));
    setIsSearchFocused(false);
    navigate(`/search?q=${encodeURIComponent(kw)}`);
  };

  const handleSearchBlur = (event: React.FocusEvent<HTMLFormElement>) => {
    if (!searchRef.current?.contains(event.relatedTarget as Node | null)) {
      setIsSearchFocused(false);
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
          <span className="top-info__item top-info__font-size">
            <FontSizeControl />
          </span>
          <div className="top-info__item top-info__auth">
            <DarkModeToggle />
            {loggedInEmail ? (
              <div
                ref={userMenuRef}
                className="top-info__user-menu"
                onMouseEnter={() => setIsUserMenuHovered(true)}
                onMouseLeave={() => setIsUserMenuHovered(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setIsUserMenuHovered(false);
                    setIsUserMenuPinned(false);
                  }
                }}
              >
                <button
                  ref={userMenuButtonRef}
                  type="button"
                  className="top-info__avatar-btn"
                  aria-label="Tài khoản"
                  aria-haspopup="menu"
                  aria-expanded={isUserMenuOpen}
                  aria-controls="user-menu"
                  onClick={() => setIsUserMenuPinned((isOpen) => !isOpen)}
                >
                  <span className="top-info__avatar" aria-hidden="true">{avatarInitial}</span>
                  <svg
                    className="top-info__avatar-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {isUserMenuOpen && (
                  <div id="user-menu" className="top-info__user-dropdown" role="menu">
                    <Link
                      to="/profile"
                      className="top-info__user-menu-item"
                      role="menuitem"
                      onClick={() => {
                        setIsUserMenuHovered(false);
                        setIsUserMenuPinned(false);
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21a8 8 0 0 1 16 0" />
                      </svg>
                      Thông tin cá nhân
                    </Link>
                    <button
                      type="button"
                      className="top-info__user-menu-item top-info__user-menu-item--logout"
                      role="menuitem"
                      onClick={() => {
                        dispatch(logout());
                        setIsUserMenuHovered(false);
                        setIsUserMenuPinned(false);
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <path d="m16 17 5-5-5-5M21 12H9" />
                      </svg>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
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
          </div>
        </div>
      </div>

      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(email) => dispatch(login(email))}
      />

      <div className="container header-primary">
        <h1 className="header-primary__title">
          <a href="/" className="logo">
            Giáo dục &amp; Thời đại
            <small className="logo__sub">Cơ quan của Bộ Giáo dục và Đào tạo</small>
          </a>
        </h1>
        <div className="header-primary__actions">
          <Link to="/history" className="history-link" title="Lịch sử đọc">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="history-link__icon"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {historyCount > 0 && (
              <span className="history-link__badge">{historyCount}</span>
            )}
          </Link>
          <Link to="/bookmarks" className="bookmark-link" title="Bài viết đã lưu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="bookmark-link__icon"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <span className="bookmark-link__text">Đã lưu</span>
            {bookmarkCount > 0 && (
              <span className="bookmark-link__badge">{bookmarkCount}</span>
            )}
          </Link>
          <form
            ref={searchRef}
            className="search-head"
            role="search"
            onSubmit={handleSearch}
            onBlur={handleSearchBlur}
          >
            <input
              type="search"
              className="search-head__input"
              placeholder="Tìm kiếm..."
              aria-label="Tìm kiếm"
              aria-controls="search-suggestions"
              aria-expanded={isSearchFocused && recentKeywords.length > 0}
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
            />
            <button type="submit" className="search-head__btn">
              Tìm
            </button>
            {isSearchFocused && recentKeywords.length > 0 && (
              <ul
                id="search-suggestions"
                className="search-head__suggestions"
                aria-label="Tìm kiếm gần đây"
              >
                <li className="search-head__suggestions-header">
                  <span>Tìm kiếm gần đây</span>
                  <button
                    type="button"
                    className="search-head__suggestions-clear"
                    onClick={() => dispatch(clearRecentKeywords())}
                  >
                    Xóa tất cả
                  </button>
                </li>
                {recentKeywords.map((kw) => (
                  <li key={kw} className="search-head__suggestion-item">
                    <div className="search-head__suggestion-row">
                      <button
                        type="button"
                        className="search-head__suggestion-btn"
                        onClick={() => handleRecentClick(kw)}
                      >
                        <svg
                          className="search-head__suggestion-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <polyline points="12 7 12 12 15 14" />
                        </svg>
                        <span className="search-head__suggestion-text">{kw}</span>
                      </button>
                      <button
                        type="button"
                        className="search-head__suggestion-remove"
                        aria-label={`Xóa từ khóa ${kw}`}
                        onClick={() => dispatch(removeRecentKeyword(kw))}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
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
