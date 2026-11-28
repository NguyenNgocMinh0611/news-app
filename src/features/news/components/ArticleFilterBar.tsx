import { getCategoryFilterGroups, type CategoryFilterGroup, type TimePeriod } from '../utils/articleFilters';
import '@/styles/ArticleFilters.scss';

interface ArticleFilterBarProps {
  period: TimePeriod;
  category: string;
  date: string;
  startDate: string;
  endDate: string;
  categoryGroups?: CategoryFilterGroup[];
  onChange: (filters: {
    period: TimePeriod;
    category: string;
    date: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export function ArticleFilterBar({
  period,
  category,
  date,
  startDate,
  endDate,
  categoryGroups = getCategoryFilterGroups(),
  onChange,
}: ArticleFilterBarProps) {
  const filters = { period, category, date, startDate, endDate };
  const invalidRange = period === 'range' && startDate && endDate && startDate > endDate;

  return (
    <section className="article-filters" aria-label="Bộ lọc bài viết">
      <label>
        <span>Thời gian</span>
        <select
          value={period}
          onChange={(event) => onChange({ ...filters, period: event.target.value as TimePeriod })}
        >
          <option value="all">Tất cả thời gian</option>
          <option value="today">Tin hôm nay</option>
          <option value="7days">7 ngày gần đây</option>
          <option value="month">Trong tháng này</option>
          <option value="date">Chọn ngày cụ thể</option>
          <option value="range">Khoảng thời gian tùy chọn</option>
        </select>
      </label>
      {categoryGroups.length > 0 && (
        <label>
          <span>Danh mục con</span>
          <select
            value={category}
            onChange={(event) => onChange({ ...filters, category: event.target.value })}
          >
            <option value="">Tất cả danh mục con</option>
            {categoryGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.categories.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      )}
      {period === 'date' && (
        <label>
          <span>Ngày đăng</span>
          <input
            type="date"
            value={date}
            onChange={(event) => onChange({ ...filters, date: event.target.value })}
          />
        </label>
      )}
      {period === 'range' && (
        <>
          <label>
            <span>Từ ngày</span>
            <input
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(event) => onChange({ ...filters, startDate: event.target.value })}
            />
          </label>
          <label>
            <span>Đến ngày</span>
            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => onChange({ ...filters, endDate: event.target.value })}
            />
          </label>
        </>
      )}
      {period === 'date' && !date && (
        <p className="article-filters__error" role="status">Vui lòng chọn ngày cần xem.</p>
      )}
      {period === 'range' && (!startDate || !endDate) && (
        <p className="article-filters__error" role="status">Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.</p>
      )}
      {invalidRange && <p className="article-filters__error" role="alert">Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.</p>}
      {(period !== 'all' || category) && (
        <button
          type="button"
          className="article-filters__clear"
          onClick={() => onChange({ period: 'all', category: '', date: '', startDate: '', endDate: '' })}
        >
          Xóa bộ lọc
        </button>
      )}
    </section>
  );
}
