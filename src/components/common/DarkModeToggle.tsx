import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/Store';
import { toggleDarkMode } from '@/store/slice/DarkModeSlice';
import '@/styles/DarkModeToggle.scss';

export function DarkModeToggle() {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.darkMode.enabled);

  return (
    <button
      type="button"
      className="dark-mode-toggle"
      onClick={() => dispatch(toggleDarkMode())}
      aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
      aria-pressed={isDark}
      title={isDark ? 'Chế độ tối' : 'Chế độ sáng'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;
