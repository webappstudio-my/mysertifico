import React from 'react';

const PaginationV2 = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
    if (totalPages <= 1) return null;

    if (pageCount <= 1) {
        return null; // Don't render pagination if there's only one page or no items
    }

    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
        <nav className="flex items-center gap-x-1">
            <button
                type="button"
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <i className="ri-arrow-left-s-line"></i>
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ${currentPage === page
                            ? 'bg-primary text-white'
                            : 'text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10'
                        }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                type="button"
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === pageCount}
            >
                <i className="ri-arrow-right-s-line"></i>
            </button>
        </nav>
    );
};

export default PaginationV2;
