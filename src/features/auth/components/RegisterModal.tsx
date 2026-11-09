import { useState } from 'react';
import '@/styles/auth/register-modal.scss';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string; password?: string }>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { email?: string; phone?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email không hợp lệ.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại.';
    } else if (!/^[0-9]{10,11}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ.';
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu ít nhất 6 ký tự.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Giả lập đăng ký thành công vì chỉ làm FE
    setIsSuccess(true);
    setEmail('');
    setPhone('');
    setPassword('');
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrors({});
    setEmail('');
    setPhone('');
    setPassword('');
    onClose();
  };

  return (
    <div className="register-modal__overlay" onClick={handleClose} role="presentation">
      <div
        className="register-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-modal-title"
      >
        <button
          type="button"
          className="register-modal__close"
          onClick={handleClose}
          aria-label="Đóng"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="register-modal__success">
            <h2>Đăng ký thành công!</h2>
            <p>Cảm ơn bạn đã đăng ký tài khoản.</p>
            <button
              type="button"
              className="register-modal__submit"
              onClick={handleClose}
            >
              Đóng
            </button>
          </div>
        ) : (
          <>
            <h2 id="register-modal-title" className="register-modal__title">
              Đăng ký tài khoản
            </h2>
            <form className="register-modal__form" onSubmit={handleSubmit} noValidate>
              <div className="register-modal__field">
                <label htmlFor="register-email">Email</label>
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="register-modal__error">{errors.email}</span>
                )}
              </div>

              <div className="register-modal__field">
                <label htmlFor="register-phone">Số điện thoại</label>
                <input
                  id="register-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0123456789"
                  autoComplete="tel"
                />
                {errors.phone && (
                  <span className="register-modal__error">{errors.phone}</span>
                )}
              </div>

              <div className="register-modal__field">
                <label htmlFor="register-password">Mật khẩu</label>
                <input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <span className="register-modal__error">{errors.password}</span>
                )}
              </div>

              <button type="submit" className="register-modal__submit">
                Đăng ký
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
