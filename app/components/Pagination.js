export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return pageNumbers;
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = currentPage - halfVisible;
    let end = currentPage + halfVisible;

    if (start < 1) {
      start = 1;
      end = Math.min(maxVisiblePages, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    return pageNumbers.slice(start - 1, end);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex flex-wrap justify-center items-center space-x-2">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Previous
            </button>
          </li>
        )}
        {visiblePages[0] > 1 && (
          <>
            <li>
              <button
                onClick={() => onPageChange(1)}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                1
              </button>
            </li>
            {visiblePages[0] > 2 && <li className="px-2">...</li>}
          </>
        )}
        {visiblePages.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <li className="px-2">...</li>
            )}
            <li>
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
