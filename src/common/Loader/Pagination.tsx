import React from 'react';

interface PaginationProps {
  totalCount: number; // Total number of items from the API
  itemsPerPage: number; // Number of items per page
  currentPage: number; // Currently active page
  onPageChange: (page: number) => void; // Function to handle page changes
}

const Pagination: React.FC<PaginationProps> = ({ totalCount, itemsPerPage, currentPage, onPageChange }) => {
  // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  
  // Function to create an array of page numbers
  const createPageArray = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = createPageArray();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#000] text-[#D9E821] '}`}
      >
        Previous
      </button>

      <div className="flex items-center gap-2">
        {currentPage > 3 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-[#000] text-[#D9E821]' : 'bg-white text-[#000] '}`}
            >
              1
            </button>
            {currentPage > 4 && <span className="mx-2">...</span>}
          </>
        )}

        {pages
          .slice(
            Math.max(0, currentPage - 3),
            Math.min(currentPage + 2, totalPages)
          )
          .map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-1 rounded-lg ${currentPage === page ? 'bg-[#000] text-[#D9E821]' : 'bg-gray text-[#000] '}`}
            >
              {page}
            </button>
          ))}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="mx-2">...</span>}
            <button
              onClick={() => handlePageClick(totalPages)}
              className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? 'bg-[#000] text-[#D9E821]' : 'bg-white text-[#000] '}`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#000] text-[#D9E821] '}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
