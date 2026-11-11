import { useState } from 'react';
import '@/styles/auth/login-modal.scss';

const HARDCODED_EMAIL = 'ngminh6112005@gmail.com';
const HARDCODED_PASSWORD = '123456';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email không hợp lệ.';
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (email.trim().toLowerCase() !== HARDCODED_EMAIL || password !== HARDCODED_PASSWORD) {
      setErrors({ general: 'Email hoặc mật khẩu không đúng.' });
      return;
    }

    // Giả lập đăng nhập thành công vì chỉ làm FE
    onLoginSuccess(email.trim().toLowerCase());
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrors({});
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <div className="login-modal__overlay" onClick={handleClose} role="presentation">
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        <button
          type="button"
          className="login-modal__close"
          onClick={handleClose}
          aria-label="Đóng"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="login-modal__success">
            <h2>Đăng nhập thành công!</h2>
            <p>Chào mừng bạn quay trở lại.</p>
            <button
              type="button"
              className="login-modal__submit"
              onClick={handleClose}
            >
              Đóng
            </button>
          </div>
        ) : (
          <>
            <h2 id="login-modal-title" className="login-modal__title">
              Đăng nhập
            </h2>
            <form className="login-modal__form" onSubmit={handleSubmit} noValidate>
              <div className="login-modal__field">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="login-modal__error">{errors.email}</span>
                )}
              </div>

              <div className="login-modal__field">
                <label htmlFor="login-password">Mật khẩu</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <span className="login-modal__error">{errors.password}</span>
                )}
              </div>

              {errors.general && (
                <span className="login-modal__error">{errors.general}</span>
              )}

              <button type="submit" className="login-modal__submit">
                Đăng nhập
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
