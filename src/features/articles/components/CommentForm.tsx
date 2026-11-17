import { useState, type FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/Store';
import { login } from '@/store/slice/AuthSlice';
import LoginModal from '@/features/auth/components/LoginModal';

interface Comment {
  id: string;
  author: string;
  content: string;
  isAnonymous: boolean;
  createdAt: string;
}

interface CommentFormProps {
  articleKey: string;
  placeholder?: string;
}

const storageKey = (articleKey: string) => `article-comments:${articleKey}`;

function isComment(value: unknown): value is Comment {
  if (typeof value !== 'object' || value === null) return false;
  const comment = value as Partial<Comment>;
  return (
    typeof comment.id === 'string' &&
    typeof comment.author === 'string' &&
    typeof comment.content === 'string' &&
    typeof comment.isAnonymous === 'boolean' &&
    typeof comment.createdAt === 'string'
  );
}

function loadComments(articleKey: string): Comment[] {
  try {
    const raw = localStorage.getItem(storageKey(articleKey));
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isComment) : [];
  } catch {
    return [];
  }
}

function saveComments(articleKey: string, comments: Comment[]) {
  try {
    localStorage.setItem(storageKey(articleKey), JSON.stringify(comments));
  } catch {
    // Trình duyệt chặn localStorage (chế độ riêng tư) thì bỏ qua
  }
}

function formatTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

const CommentForm = ({
  articleKey,
  placeholder = 'Ý kiến của bạn sẽ được biên tập trước khi đăng. Xin vui lòng gõ Tiếng Việt có dấu.',
}: CommentFormProps) => {
  const dispatch = useDispatch();
  const loggedInEmail = useSelector(
    (state: RootState) => state.auth.loggedInEmail,
  );
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(!loggedInEmail);
  const [comments, setComments] = useState<Comment[]>(() =>
    loadComments(articleKey),
  );
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [error, setError] = useState('');

  // Chưa đăng nhập thì luôn bình luận ẩn danh, kể cả khi vừa đăng xuất
  const anonymous = isAnonymous || !loggedInEmail;

  const handleSelectNamed = () => {
    if (!loggedInEmail) {
      setIsLoginOpen(true);
      return;
    }
    setIsAnonymous(false);
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Vui lòng nhập nội dung bình luận.');
      return;
    }

    const newComment: Comment = {
      id: crypto.randomUUID(),
      author: anonymous ? 'Ẩn danh' : (loggedInEmail as string),
      content: content.trim(),
      isAnonymous: anonymous,
      createdAt: new Date().toISOString(),
    };
    const nextComments = [newComment, ...comments];
    setComments(nextComments);
    saveComments(articleKey, nextComments);
    setContent('');
    setError('');
  };

  const handleLoginSuccess = (email: string) => {
    dispatch(login(email));
    setIsAnonymous(false);
    setIsLoginOpen(false);
    setError('');
  };

  return (
    <section className="comment-form" aria-labelledby="comment-form-heading">
      <h2 id="comment-form-heading" className="comment-form__heading">
        Bình luận
        <span className="comment-form__count">({comments.length})</span>
      </h2>

      <form className="comment-form__body" onSubmit={handleSubmit} noValidate>
        <div className="comment-form__identity">
          <span className="comment-form__identity-label">
            Bình luận với tên:
          </span>
          <label className="comment-form__option">
            <input
              type="radio"
              name="comment-identity"
              checked={anonymous}
              onChange={() => {
                setIsAnonymous(true);
                setError('');
              }}
            />
            Ẩn danh
          </label>
          <label className="comment-form__option">
            <input
              type="radio"
              name="comment-identity"
              checked={!anonymous}
              onChange={handleSelectNamed}
            />
            {loggedInEmail ?? 'Tên của tôi'}
          </label>
          {!loggedInEmail && (
            <button
              type="button"
              className="comment-form__login-link"
              onClick={() => setIsLoginOpen(true)}
            >
              Đăng nhập để bình luận với tên
            </button>
          )}
        </div>

        <textarea
          className="comment-form__textarea"
          placeholder={placeholder}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError('');
          }}
          rows={4}
          aria-label="Nội dung bình luận"
        />

        {error && (
          <p className="comment-form__error" role="alert">
            {error}
          </p>
        )}

        <div className="comment-form__actions">
          <span className="comment-form__hint">
            {!loggedInEmail
              ? 'Bạn chưa đăng nhập, bình luận sẽ được gửi ẩn danh.'
              : anonymous
                ? 'Bình luận sẽ được gửi ẩn danh.'
                : `Bình luận sẽ hiển thị tên ${loggedInEmail}.`}
          </span>
          <button
            type="submit"
            className="comment-form__submit"
            disabled={!content.trim()}
          >
            Gửi bình luận
          </button>
        </div>
      </form>

      {comments.length > 0 ? (
        <ul className="comment-form__list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-form__item">
              <span
                className={`comment-form__avatar ${
                  comment.isAnonymous ? 'comment-form__avatar--anonymous' : ''
                }`}
                aria-hidden="true"
              >
                {comment.isAnonymous
                  ? '?'
                  : comment.author.trim().charAt(0) || '?'}
              </span>
              <div className="comment-form__item-body">
                <div className="comment-form__item-header">
                  <span className="comment-form__item-author">
                    {comment.author}
                  </span>
                  <time
                    className="comment-form__item-time"
                    dateTime={comment.createdAt}
                  >
                    {formatTime(comment.createdAt)}
                  </time>
                </div>
                <p className="comment-form__item-content">{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="comment-form__empty">
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </p>
      )}

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </section>
  );
};

export default CommentForm;
