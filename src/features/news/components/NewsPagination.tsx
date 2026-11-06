interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function NewsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: NewsPaginationProps) {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className="news-pagination" aria-label="Phân trang danh sách tin">
      <span className="news-pagination__status" aria-live="polite">
        Trang {currentPage} trên {totalPages}
      </span>
      <button
        type="button"
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        aria-label="Trang đầu"
      >
        «
      </button>
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Trang trước"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Trang sau"
      >
        ›
      </button>
      <button
        type="button"
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Trang cuối"
      >
        »
      </button>
    </nav>
  );
}
