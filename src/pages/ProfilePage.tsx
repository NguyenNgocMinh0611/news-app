import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/Store';
import '@/styles/ProfilePage.scss';

export function ProfilePage() {
  const loggedInEmail = useSelector((state: RootState) => state.auth.loggedInEmail);
  const avatarInitial = loggedInEmail?.trim().charAt(0).toUpperCase() ?? '';

  return (
    <main className="container profile-page">
      <header className="profile-page__header">
        <h1>Thông tin cá nhân</h1>
      </header>

      {loggedInEmail ? (
        <section className="profile-page__card" aria-label="Thông tin tài khoản">
          <div className="profile-page__avatar" aria-hidden="true">{avatarInitial}</div>
          <div className="profile-page__details">
            <h2>Tài khoản</h2>
            <dl>
              <div className="profile-page__detail">
                <dt>Email</dt>
                <dd>{loggedInEmail}</dd>
              </div>
            </dl>
          </div>
        </section>
      ) : (
        <section className="profile-page__card profile-page__card--empty">
          <h2>Bạn chưa đăng nhập</h2>
          <p>Đăng nhập để xem thông tin tài khoản.</p>
          <Link to="/" className="profile-page__link">Về trang chủ</Link>
        </section>
      )}
    </main>
  );
}
